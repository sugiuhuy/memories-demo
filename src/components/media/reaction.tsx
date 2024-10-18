import { Component, createEffect, createSignal, Show } from "solid-js";
import Spinner from "../common/spinner";

interface Props {
  src: string;
  speed_animation: number;
  unicode?: string;
}

const Reaction: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const [isLoaded, setIsLoaded] = createSignal<boolean>(false);

  createEffect(() => {
    if (isLoaded()) {
      elRef!.style.setProperty("--reaction-speed", `${props.speed_animation}ms`);
      elRef!.style.setProperty("--reaction-frames", `${elRef!.offsetWidth / elRef!.offsetHeight}`);
    }
  });

  return (
    <div class="relative flex size-full max-w-8 max-h-8 items-center justify-center aspect-square overflow-hidden shrink-0">
      <div ref={elRef} class="absolute z-[1] top-0 left-0 flex h-full animate-reaction pointer-events-none select-none">
        <img src={props.src} class="flex w-fit max-w-fit h-full object-fill" alt={props.unicode} onload={() => setIsLoaded(true)} />
      </div>
      <Show when={!isLoaded()}>
        <div class="absolute z-[2] top-0 left-0 flex w-full h-full justify-center items-center">
          <Spinner />
        </div>
      </Show>
    </div>
  );
};

export default Reaction;
