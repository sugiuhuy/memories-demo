import { Component, createEffect, createSignal, Show } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  effect: string;
  src: string;
  ratio: string;
  is_cencored?: boolean;
  is_preview?: boolean;
}

const ImageEffect: Component<Props> = (props) => {
  const [isCencored, setIsCencored] = createSignal<boolean>(false);

  createEffect(() => {
    setIsCencored(props.is_cencored!);
  });

  return (
    <div class={`flex w-full h-full shrink-0 ${props.effect}`}>
      <Show when={isCencored()}>
        <div class="absolute z-[2] top-0 left-0 right-0 flex flex-col w-full h-full items-center justify-center backdrop-blur-xl bg-[rgba(0,0,0,0.9)]">
          <Icons name="eye" is_active={false} class="size-full max-w-12 max-h-12 aspect-square text-neutral-50" />
          <Show when={!props.is_preview}>
            <div class="flex text-2xl justify-center text-center text-neutral-50">Sensitive content</div>
            <div class="flex mt-2 text-sm justify-center text-center text-neutral-300">This media may contain graphic or violent content</div>
            <button
              class="flex px-4 py-2 text-neutral-50 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg mt-5"
              onclick={() => setIsCencored(!isCencored())}
            >
              View
            </button>
          </Show>
        </div>
      </Show>
      <img
        src={props.src}
        alt="pictire"
        class={`w-full h-full ${
          props.ratio === "cover"
            ? "object-cover"
            : props.ratio === "fill"
            ? "object-fill"
            : props.ratio === "contain"
            ? "object-contain"
            : "object-none"
        } pointer-events-none select-none`}
        draggable={false}
      />
    </div>
  );
};

export default ImageEffect;
