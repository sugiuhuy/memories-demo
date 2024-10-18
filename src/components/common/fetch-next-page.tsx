import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect, Component, Show, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Spinner from "~/components/common/spinner";

interface Props {
  limit: number;
  max: number;
  count: number;
  onGenerate: (count: number) => void;
}

const FetchNextPage: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  const inViewport = createVisibilityObserver({ threshold: 0.5 })(() => elRef);

  const [paggination, setPaggination] = createStore<{ page: number; pages: number[] }>({ page: 1, pages: [] });
  const [isWaiting, setIsWaiting] = createSignal<boolean>(false);
  const [isLastPage, setIsLastPage] = createSignal<boolean>(false);

  onMount(() => {
    const result = [];
    for (let i = 0; i < Math.floor(props.max / props.limit); i++) {
      result.push(props.limit);
    }

    const remainder = props.max % props.limit;
    if (remainder > 0) {
      result.push(remainder);
    }

    setPaggination("pages", result);
  });

  createEffect(() => {
    if (inViewport() && !isLastPage()) {
      setIsWaiting(true);

      setTimeout(() => {
        props.onGenerate(paggination.pages[paggination.page]);
        setPaggination(produce((state) => state.page++));
        setIsWaiting(false);
      }, 1500);
    }
  });

  createEffect(() => {
    setIsLastPage(paggination.page >= paggination.pages.length - 1);
  });

  return (
    <div ref={elRef} class="flex w-full items-center justify-center select-none text-[var(--text-secondary-hover)]">
      <Show when={isWaiting()} fallback={<span class="text-xl">•</span>}>
        <div class="py-1.5">
          <Spinner class="size-4 aspect-square text-[var(--text-primary)]" />
        </div>
      </Show>
    </div>
  );
};

export default FetchNextPage;
