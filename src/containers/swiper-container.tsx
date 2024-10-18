import { createSignal, onCleanup, onMount, ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  total: number;
  class: string;
}

const SwiperContainer: ParentComponent<Props> = (props) => {
  let elementRef: HTMLDivElement | undefined;
  let offsetXRef: number = 0;
  let startXRef: number = 0;
  let currentOffsetXRef: number = 0;
  let minOffsetXRef: number = 0;
  let containerWidthRef: number = 0;

  const minSwipeRequired = 40;
  const [offsetX, setOffsetX] = createSignal<number>(0);
  const [isSwiping, setIsSwiping] = createSignal<boolean>(false);
  const [currentIndex, setCurrentIndex] = createSignal<number>(0);

  const onSwipeMove = (event: TouchEvent | MouseEvent) => {
    if (props.total === 1) return;
    const diff = startXRef - ("changedTouches" in event ? event.changedTouches[0].clientX : event.clientX);

    let newOffsetX = currentOffsetXRef - diff;
    const maxOffsetX = 0;
    const minOffsetX = Math.min(minOffsetXRef, 0);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onSwipeEnd = () => {
    const containerWidth = containerWidthRef;
    const currentOffsetX = currentOffsetXRef;
    const minOffsetX = Math.min(minOffsetXRef, 0);

    let newOffsetX = offsetX();
    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > minSwipeRequired) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX < minOffsetX ? minOffsetX : newOffsetX);
    setCurrentIndex(Math.abs(newOffsetX / containerWidth));

    offsetXRef = newOffsetX;

    window.removeEventListener("touchmove", onSwipeMove);
    window.removeEventListener("touchend", onSwipeEnd);
    window.removeEventListener("mousemove", onSwipeMove);
    window.removeEventListener("mouseup", onSwipeEnd);
  };

  const onSwipeStart = (event: TouchEvent | MouseEvent) => {
    setIsSwiping(true);

    currentOffsetXRef = offsetXRef;
    startXRef = "changedTouches" in event ? event.changedTouches[0].clientX : event.clientX;
    containerWidthRef = elementRef!.offsetWidth;
    minOffsetXRef = elementRef!.offsetWidth - elementRef!.scrollWidth;

    window.addEventListener("touchmove", onSwipeMove);
    window.addEventListener("touchend", onSwipeEnd);
    window.addEventListener("mousemove", onSwipeMove);
    window.addEventListener("mouseup", onSwipeEnd);
  };

  const onSwipe = (id: number) => {
    setCurrentIndex(id);
    setOffsetX(-(elementRef!.offsetWidth * id));
    offsetXRef = -(elementRef!.offsetWidth * id);
  };

  const onHandleResizeWindo = () => {
    setOffsetX(-(elementRef!.offsetWidth * currentIndex()));
    offsetXRef = -(elementRef!.offsetWidth * currentIndex());
  };

  onMount(() => {
    window.addEventListener("resize", onHandleResizeWindo);
  });

  onCleanup(() => {
    window.removeEventListener("resize", onHandleResizeWindo);
  });

  return (
    <div class={`relative ${props.class}`} onTouchStart={onSwipeStart} onMouseDown={onSwipeStart}>
      <Show when={currentIndex() > 0}>
        <button
          type="button"
          class="absolute z-[1] top-1/2 left-2 size-8 p-2 aspect-square backdrop-blur-xl bg-[rgba(0,0,0,0.6)] rounded-full text-neutral-50 active:text-neutral-400"
          onclick={() => onSwipe(currentIndex() - 1)}
        >
          <Icons name="arrow" class="rotate-270" />
        </button>
      </Show>
      <div class="flex w-full h-full rounded-lg bg-[var(--bg-secondary)] overflow-hidden touch-pan-y select-none">
        <div
          ref={elementRef}
          class={`flex flex-row min-w-full p-0 m-0 origin-0 ${
            props.total > 1 ? (isSwiping() ? `transition-none cursor-grabbing` : `transition-transform cursor-grab`) : "cursor-auto"
          }`}
          style={{ transform: `translate3d(${offsetX()}px, 0,0)` }}
        >
          {props.children}
        </div>
      </div>
      <Show when={currentIndex() < props.total - 1}>
        <button
          type="button"
          class="absolute z-[1] top-1/2 right-2 size-8 p-2 aspect-square backdrop-blur-xl bg-[rgba(0,0,0,0.6)] rounded-full text-neutral-50 active:text-neutral-400"
          onclick={() => onSwipe(currentIndex() + 1)}
        >
          <Icons name="arrow" class="rotate-90" />
        </button>
      </Show>
    </div>
  );
};

export default SwiperContainer;
