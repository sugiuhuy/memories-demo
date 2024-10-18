import { useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import ReactPost from "~/components/common/react-post";
import Tooltip from "~/components/common/tooltip";
import PostAuthorCollectionsPopup from "~/components/popup/post-author-collections-popup";
import PopupContainer from "~/containers/popup-container";
import { selectStore } from "~/stores/manage";
import { getPostProps } from "~/types/post-interfaces";
import { formatNumber } from "~/utilities/formatter";
import transformContentPattern from "~/utilities/transform-content-pattern";

interface Props extends getPostProps {
  is_no_truncate?: boolean;
}

const PostContentCard: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const params: { post: string } = useParams();
  const auth = selectStore((store) => store.auth!);
  const is_author = auth()._id === props.author._id;

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [ellipsis, setEllipsis] = createSignal<boolean>(false);

  createEffect(() => {
    setEllipsis(elRef!.offsetHeight >= 150);
  });

  return (
    <>
      <div class="flex w-full">
        <div ref={elRef} class="inline-flex w-full overflow-hidden">
          <div class="truncate">
            <div class="inline-flex items-center p-0 m-0">
              <a href={`/@${props.author.username}`} class="text-blue-600 active:text-blue-700 no-underline">
                {props.author.name}
              </a>
              <Show when={props.author.is_verified}>
                <Tooltip text="Account is verified" class="flex items-center justify-center ml-1">
                  <Icons name="verified" class="size-4 aspect-square shrink-0" />
                </Tooltip>
              </Show>
            </div>
            <div
              class={`inline ${!props.is_no_truncate && ellipsis() ? "whitespace-line" : "whitespace-pre-line break-words"} ml-2`}
              innerHTML={transformContentPattern(props.get_text)}
            ></div>
          </div>
        </div>
        <Show when={!props.is_no_truncate && ellipsis()}>
          <button
            class="flex min-w-fit text-[var(--text-secondary)] hover:text-[var(--text-primary)] ml-3 hover:dotted"
            onclick={() => setEllipsis(false)}
          >
            more
          </button>
        </Show>
      </div>
      <div class="flex w-full gap-3 flex-wrap">
        <For each={props.collections}>
          {(reaction) => (
            <Show
              when={
                reaction.count_used > 0 &&
                ((!is_author && reaction.allow_used.followers && props.author.is_follow) || reaction.allow_used.everyone || is_author)
              }
            >
              <ReactPost {...reaction} post_id={props._id} />
            </Show>
          )}
        </For>
        <Show when={props.collections.length > 0}>
          <button class="flex rounded-full items-center gap-1.5 group/icon" onclick={() => setIsOpen(true)}>
            <Icons
              name="gallery"
              type_gallery="addReaction"
              class="size-5 aspect-square shrink-0 group-active/icon:scale-95 group-hover/icon:text-[var(--text-secondary)]"
            />
          </button>
        </Show>
        <Show when={!params.post}>
          <a href={`/post/${props._id}`} class="flex rounded-full items-center gap-1.5 group/icon">
            <Icons name="comment" class="size-5 aspect-square shrink-0 group-active/icon:scale-95 group-hover/icon:text-[var(--text-secondary)]" />
            <span class="group-hover/icon:text-[var(--text-secondary)]">{formatNumber(props.count_comments)}</span>
          </a>
        </Show>
      </div>
      <PopupContainer is_open={isOpen()}>
        <PostAuthorCollectionsPopup {...props} onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default PostContentCard;
