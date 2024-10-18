import { Component, For, Show } from "solid-js";
import Icons from "~/assets/icons";
import ReactPost from "~/components/common/react-post";
import ModalContainer from "~/containers/modal-container";
import { selectStore } from "~/stores/manage";
import { getPostProps } from "~/types/post-interfaces";

interface Props extends getPostProps {
  onClose: () => void;
}

const PostAuthorCollectionsPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const is_author = auth()._id === props.author._id;

  return (
    <ModalContainer class="flex flex-col w-full h-full max-w-80 max-h-sm animate-zoom-out" onClose={props.onClose}>
      <div class="flex w-full p-3 items-center">
        <div class="flex w-full"></div>
        <div class="flex justify-center shrink-0">Reactions</div>
        <div class="flex w-full justify-end">
          <button class="flex group/icon" onclick={props.onClose}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
      </div>
      <div class="flex w-full overflow-hidden p-3">
        <div class="flex flex-wrap w-full overflow-auto">
          <For each={props.collections}>
            {(reaction) => (
              <Show when={(!is_author && reaction.allow_used.followers && props.author.is_follow) || reaction.allow_used.everyone || is_author}>
                <ReactPost {...reaction} post_id={props._id} />
              </Show>
            )}
          </For>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PostAuthorCollectionsPopup;
