import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import Icons from "~/assets/icons";
import { selectStore } from "~/stores/manage";
import Spinner from "../common/spinner";

interface Props {
  src: string;
  is_cencored?: boolean;
  is_preview?: boolean;
}

const Video: Component<Props> = (props) => {
  let viRef: HTMLVideoElement | undefined;
  let timeRef: HTMLDivElement | undefined;

  const entries = selectStore((store) => store.entries);
  const inViewport = createVisibilityObserver({ threshold: 0.35 })(() => viRef);

  const [isBuffering, setIsBuffering] = createSignal<boolean>(true);
  const [isPlaying, setIsPlaying] = createSignal<boolean>(false);
  const [isMuted, setIsMuted] = createSignal<boolean>(true);
  const [isCencored, setIsCencored] = createSignal<boolean>(false);

  const onUpdateCurrentTime = () => {
    if (props.is_preview) return;
    timeRef!.style.setProperty("--progress-position", `${viRef!.currentTime / viRef!.duration}`);
  };

  onMount(() => {
    setIsCencored(props.is_cencored!);
  });

  createEffect(() => {
    if (isPlaying() && !props.is_preview) {
      viRef!.play();
    } else {
      viRef!.pause();
    }
  });

  createEffect(() => {
    viRef!.muted = isMuted();
  });

  createEffect(() => {
    if (!props.is_cencored) {
      setIsPlaying(inViewport());
    }
  });

  createEffect(() => {
    if (inViewport() || (!props.is_cencored && !props.is_preview)) {
      setIsPlaying(inViewport() && !entries().length);
    }
  });

  createEffect(() => {
    setIsCencored(props.is_cencored!);
  });

  return (
    <div class={`relative flex w-full h-full shrink-0 overflow-hidden ${props.is_preview ? "pointer-events-none" : "pointer-events-auto"}`}>
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
      <Show when={isBuffering()}>
        <div class="absolute z-[2] top-0 left-0 flex w-full h-full bg-transparent-6 items-center justify-center cursor-not-allowed">
          <Spinner class="size-7 aspect-square text-neutral-50" />
        </div>
      </Show>
      <video
        ref={viRef}
        src={props.src}
        class="w-full h-full cursor-pointer object-cover object-center"
        onclick={() => setIsPlaying(inViewport() ? !isPlaying() : false)}
        ontimeupdate={onUpdateCurrentTime}
        onloadeddata={() => setIsBuffering(false)}
        onwaiting={() => setIsBuffering(true)}
        onplaying={() => setIsBuffering(false)}
        loop
      />
      <Show when={!props.is_preview}>
        <div class="absolute z-[1] bottom-3 right-3 flex gap-3">
          <button class="flex bg-transparent-8 p-2 rounded-full text-neutral-50 active:text-neutral-400" onClick={() => setIsPlaying(!isPlaying())}>
            <Icons name="videoActions" type_video_actions={isPlaying() ? "play" : "pause"} class="size-4 aspect-square" />
          </button>
          <button class="flex bg-transparent-8 p-2 rounded-full text-neutral-50 active:text-neutral-400" onClick={() => setIsMuted(!isMuted())}>
            <Icons name="mute" is_muted={isMuted()} class="size-4 aspect-square" />
          </button>
        </div>
        <div ref={timeRef} class="timeline"></div>
      </Show>
    </div>
  );
};

export default Video;
