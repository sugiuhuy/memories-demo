import { useLocation } from "@solidjs/router";
import { createEffect, onCleanup, ParentComponent, Setter } from "solid-js";
import { produce } from "solid-js/store";
import { mutateStore } from "~/stores/manage";

interface Props {
  is_open: boolean;
  setIsOpen: Setter<boolean>;
}

const DropdownContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const location = useLocation();
  const mutate = mutateStore();

  const onClose = (e: MouseEvent) => {
    e.stopPropagation();

    const related = e as MouseEvent;
    if (!props.is_open) return;
    if (elRef!.contains(e.target as Node)) return;
    if (elRef!.contains(related.relatedTarget as Node)) return;

    props.setIsOpen(false);
  };

  const onCloseWhenPressEscape = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (!props.is_open) return;
    if (e.key !== "Escape") return;

    props.setIsOpen(false);
  };

  onCleanup(() => {
    window.removeEventListener("keydown", onCloseWhenPressEscape);
    window.removeEventListener("wheel", onClose);
    document.removeEventListener("mousedown", onClose);
  });

  createEffect(() => {
    if (props.is_open) {
      mutate(
        "entries",
        produce((states) => {
          if (states.findIndex((e) => e === "dropdown") !== -1) return;
          states.push("dropdown");
        })
      );
    } else {
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === "dropdown");
          if (index === -1) return;

          states.splice(index, 1);
        })
      );
    }
  });

  createEffect(() => {
    window.addEventListener("keydown", onCloseWhenPressEscape);
    window.addEventListener("wheel", onClose);
    document.addEventListener("mousedown", onClose);
  });

  createEffect(() => {
    if (location.pathname) {
      props.setIsOpen(false);
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === "dropdown");
          if (index === -1) return;

          states.splice(index, 1);
        })
      );
    }
  });

  return (
    <div ref={elRef} class="relative">
      {props.children}
    </div>
  );
};

export default DropdownContainer;
