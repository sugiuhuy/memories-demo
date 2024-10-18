import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";

interface Props {
  when: number;
}

const ScrillToNewMessages: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const [isBottom, setIsBottom] = createSignal<boolean>(false);

  const handleScroll = () => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setIsBottom(isAtBottom);
  };

  onMount(() => {
    elRef!.scrollIntoView({ behavior: "smooth" });
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  createEffect(() => {
    if (props.when && isBottom()) {
      elRef!.scrollIntoView({ behavior: "smooth" });
    }
  });

  return <div ref={elRef} class="flex w-full"></div>;
};

export default ScrillToNewMessages;
