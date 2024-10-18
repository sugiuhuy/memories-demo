import { Component, createEffect, createUniqueId, onCleanup, onMount } from "solid-js";
import { produce } from "solid-js/store";
import { mutateStore, selectStore } from "~/stores/manage";

const MessageFilePreview: Component = () => {
  const entries = selectStore((store) => store.entries);
  const mutate = mutateStore();
  const id = createUniqueId();

  onMount(() => {
    mutate(
      "entries",
      produce((states) => {
        states.push(id);
      })
    );
  });

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
    if (entries().length > 0) {
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }
  });

  return <div class="absolute z-[5] flex top-0 left-0 w-full h-full items-end justify-center backdrop-blur-md p-2 bg-[rgba(0,0,0,0.5)]"></div>;
};

export default MessageFilePreview;
