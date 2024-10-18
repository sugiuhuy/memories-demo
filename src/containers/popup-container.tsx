import { createEffect, createUniqueId, onCleanup, ParentComponent, Show } from "solid-js";
import { produce } from "solid-js/store";
import { Portal } from "solid-js/web";
import { mutateStore, selectStore } from "~/stores/manage";

interface Props {
  is_open: boolean;
}

const PopupContainer: ParentComponent<Props> = (props) => {
  const entries = selectStore((store) => store.entries);
  const mutate = mutateStore();
  const id = createUniqueId();

  onCleanup(() => {
    window.onscroll = function () {};
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

  return (
    <Show when={props.is_open}>
      <Portal mount={document.getElementById("portals")!}>
        <div class="fixed z-[9999] top-0 left-0 right-0 flex w-full h-full items-center justify-center backdrop-blur-md p-2 bg-[rgba(0,0,0,0.5)]">
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

export default PopupContainer;
