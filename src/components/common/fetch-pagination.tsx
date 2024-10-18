import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import paginationItems from "~/utilities/pagination-items";

interface Props {
  disabled: boolean;
  maxLength: number;
  paggination: { current_page: number; pages: number };
  setPaggination: SetStoreFunction<{ current_page: number; pages: number }>;
}

const FetchPagination: Component<Props> = (props) => {
  const [pageNums, setPageNums] = createSignal<number[]>([]);

  createEffect(() => {
    if (props.paggination.current_page) {
      setPageNums(paginationItems({ ...props.paggination, maxLength: props.maxLength }));
    }
  });

  const onJumpToPage = (page: number) => {
    if (props.disabled) return;
    props.setPaggination(produce((state) => (state.current_page = page)));
  };

  const onPreviousPage = () => {
    if (props.disabled || props.paggination.current_page === 1) return;
    props.setPaggination(produce((state) => state.current_page--));
  };

  const onNextPage = () => {
    if (props.disabled || props.paggination.current_page === props.paggination.pages) return;
    props.setPaggination(produce((state) => state.current_page++));
  };

  return (
    <div class="flex w-full items-center justify-end mt-2 gap-2">
      <button
        class="p-2 outline outline-1 outline-[var(--border-primary)] bg-[var(--bg-secondary)] enabled:active:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--bg-secondary-hover)] rounded-lg"
        onclick={onPreviousPage}
        disabled={props.disabled || props.paggination.current_page === 1}
      >
        <Icons name="arrow" class="size-3 aspect-square rotate-270" />
      </button>
      <For each={pageNums()}>
        {(page) => (
          <button
            class="px-2 h-full outline outline-1 outline-[var(--border-primary)] bg-[var(--bg-secondary)] enabled:active:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed disabled:bg-transparent rounded-lg"
            onclick={() => onJumpToPage(page)}
            disabled={props.paggination.current_page === page || isNaN(page) || props.disabled}
          >
            <Show when={isNaN(page)} fallback={page}>
              ...
            </Show>
          </button>
        )}
      </For>
      <button
        class="p-2 outline outline-1 outline-[var(--border-primary)] bg-[var(--bg-secondary)] enabled:active:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--bg-secondary-hover)] rounded-lg"
        onclick={onNextPage}
        disabled={props.disabled || props.paggination.current_page === props.paggination.pages}
      >
        <Icons name="arrow" class="size-3 aspect-square rotate-90" />
      </button>
    </div>
  );
};

export default FetchPagination;
