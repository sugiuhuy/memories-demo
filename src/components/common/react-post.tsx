import { Component } from "solid-js";
import { produce } from "solid-js/store";
import Tooltip from "~/components/common/tooltip";
import Reaction from "~/components/media/reaction";
import { mutateStore } from "~/stores/manage";
import { getAuthorCollectionProps } from "~/types/post-interfaces";
import { formatNumber } from "~/utilities/formatter";

interface Props extends getAuthorCollectionProps {
  post_id: string;
}

const ReactPost: Component<Props> = (props) => {
  const mutation = mutateStore();

  const onSubmitReactPost = () => {
    mutation(
      "findPosts",
      (states) => states._id === props.post_id,
      "collections",
      (states) => states._id === props._id,
      produce((state) => {
        state.is_used = !props.is_used;

        if (state.is_used) return state.count_used++;
        state.count_used--;
      })
    );
  };

  return (
    <button
      class={`flex disabled:cursor-not-allowed rounded-lg border border-solid group/icon ${
        props.is_used ? "border-sky-600 bg-sky-200 dark:bg-sky-950 text-neutral-50" : "border-[var(--border-primary)] bg-[var(--border-secondary)]"
      }`}
      onclick={onSubmitReactPost}
    >
      <Tooltip text={`:${props.unicode}:`} class="flex w-full h-full items-center gap-2.5 py-0.5 px-2">
        <div class="flex size-4 group-active/icon:scale-95">
          <Reaction {...props} />
        </div>
        <span class="font-semibold text-[var(--text-primary)]">{formatNumber(props.count_used)}</span>
      </Tooltip>
    </button>
  );
};

export default ReactPost;
