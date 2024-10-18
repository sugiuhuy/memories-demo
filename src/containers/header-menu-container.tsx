import { useLocation } from "@solidjs/router";
import { createEffect, createUniqueId, onCleanup, ParentComponent, Show } from "solid-js";
import { produce } from "solid-js/store";
import { Portal } from "solid-js/web";
import { mutateStore, selectStore } from "~/stores/manage";

interface Props {
  is_open: boolean;
  onClose: () => void;
}

const HeaderMenuContainer: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const location = useLocation();
  const id = createUniqueId();

  const toasts = selectStore((store) => store.toasts);
  const entries = selectStore((store) => store.entries);
  const mutate = mutateStore();

  const onClickOutsideModal = (event: MouseEvent) => {
    if (elRef!.contains(event.target as Node)) return;
    if (elRef!.contains(event.relatedTarget as Node)) return;
    if (toasts().length > 0) return;

    props.onClose();
  };

  const onPressEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (elRef!.contains(event.target as Node)) return;
    if (toasts().length > 0) return;

    props.onClose();
  };

  onCleanup(() => {
    window.onscroll = function () {};
    window.removeEventListener("keydown", onPressEscape);
    document.removeEventListener("mousedown", onClickOutsideModal);
    mutate(
      "entries",
      produce((states) => {
        const index = states.findIndex((e) => e === id);
        if (index === -1) return;

        states.splice(index, 1);
      })
    );
  });

  createEffect(() => {
    if (props.is_open) {
      mutate(
        "entries",
        produce((states) => {
          states.push(id);
        })
      );
    } else {
      mutate(
        "entries",
        produce((states) => {
          const index = states.findIndex((e) => e === id);
          if (index === -1) return;

          states.splice(index, 1);
        })
      );
    }
  });

  createEffect(() => {
    if (entries().length > 0) {
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    } else {
      window.onscroll = function () {};
    }
  });

  createEffect(() => {
    if (props.is_open) {
      window.addEventListener("keydown", onPressEscape);
      document.addEventListener("mousedown", onClickOutsideModal);
    }
  });

  createEffect(() => {
    if (location.pathname) {
      props.onClose();
    }
  });

  return (
    <Show when={props.is_open}>
      <Portal mount={document.getElementById("portals")!}>
        <div class="fixed z-[9999] top-0 left-0 right-0 flex w-full h-full backdrop-blur-md bg-[rgba(0,0,0,0.5)]">
          <div ref={elRef} class="flex w-full max-w-[calc(100%-7rem)] h-dvh bg-[var(--bg-secondary)] overflow-hidden">
            <div class="flex flex-col w-full h-full overflow-y-auto">{props.children}</div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default HeaderMenuContainer;
