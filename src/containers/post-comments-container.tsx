import { Component, createSignal, For, Match, onMount, Setter, Show, splitProps, Switch } from "solid-js";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import { mutateStore, selectStore } from "~/stores/manage";
import { formatNumber } from "~/utilities/formatter";
import DropdownContainer from "./dropdown-container";
import Icons from "~/assets/icons";
import CommentCard from "~/components/card/comment-card";
import { commentPropsBase } from "~/types/post-interfaces";
import { generateComments } from "~/data/post-data";
import { produce } from "solid-js/store";

interface Props {
  post_id: string;
  comment_id: string;
  count_comments: number;
  setReplyingComment: Setter<commentPropsBase | null>;
}

const PostCommentsContainer: Component<Props> = (props) => {
  const [_other, _props] = splitProps(props, ["count_comments"]);

  const comments = selectStore((store) => store.findComments);
  const mutate = mutateStore();

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [isLoading, setIsLoading] = createSignal(true);
  const [order, setOrder] = createSignal<"trending" | "new">("new");

  const onGenerateComments = (count: number) => {
    const data = generateComments(count);
    data.map((item) => {
      mutate(
        "findComments",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  const inputs: { name: "trending" | "new"; placeholder: string }[] = [
    { name: "new", placeholder: "New comments" },
    { name: "trending", placeholder: "Trending comments" },
  ];

  onMount(() => {
    setTimeout(() => {
      mutate("findComments", generateComments(10));
      setIsLoading(false);
    }, 1500);
  });

  return (
    <Switch>
      <Match when={isLoading()}>
        <div class="flex w-full h-full items-center justify-center border-t border-solid border-[var(--border-primary)]">
          <Spinner />
        </div>
      </Match>
      <Match when={!isLoading()}>
        <Switch>
          <Match when={comments().length === 0}>
            <div class="flex w-full h-full items-center justify-center border-t border-solid border-[var(--border-primary)] p-2">
              <span class="text-sm text-[var(--text-secondary-hover)]">No comments</span>
            </div>
          </Match>
          <Match when={comments().length !== 0}>
            <div class="flex w-full pt-2 justify-between items-center border-t border-solid border-[var(--border-primary)]">
              <DropdownContainer is_open={isOpen()} setIsOpen={setIsOpen}>
                <button class="flex items-center shrink-0 gap-2" onclick={() => setIsOpen(!isOpen())}>
                  <Icons name="options" type_options="short" class="size-4 aspect-square shrink-0" />
                  <span class="text-sm">{order() === "new" ? "New comments" : "Trending comments"}</span>
                </button>
                <div
                  class={`absolute z-[2] top-[calc(100%+0.5rem)] left-0 flex flex-col min-w-max p-1.5 gap-2 bg-[var(--bg-secondary)] rounded-lg origin-top-left transition-[transform,opacity] border border-solid border-[var(--border-secondary)] ${
                    isOpen() ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
                  }`}
                >
                  <For each={inputs}>
                    {(input) => (
                      <button
                        class={`flex items-center shrink-0 gap-2 p-2.5 hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg ${
                          order() === input.name ? "bg-[var(--bg-secondary-hover)]" : "bg-transparent"
                        }`}
                        onclick={() => {
                          setOrder(input.name);
                          setIsOpen(false);
                        }}
                      >
                        <span class="text-md">{input.placeholder}</span>
                      </button>
                    )}
                  </For>
                </div>
              </DropdownContainer>
              <span class="text-sm">{formatNumber(_other.count_comments)} comments</span>
            </div>
            <div class="flex flex-col w-full">
              <div class="flex flex-col w-full gap-3">
                <For each={comments()}>
                  {(comment) => <CommentCard {...comment} on_post={props.post_id} setReplyingComment={props.setReplyingComment} />}
                </For>
              </div>
              <Show when={comments().length >= 10}>
                <FetchNextPage count={comments().length} limit={10} max={props.count_comments} onGenerate={onGenerateComments} />
              </Show>
            </div>
          </Match>
        </Switch>
      </Match>
    </Switch>
  );
};

export default PostCommentsContainer;
