import { Component } from "solid-js";
import { produce } from "solid-js/store";
import AlertContainer from "~/containers/alert-container";
import { mutateStore } from "~/stores/manage";

interface Props {
  _id: string;
  on_post: string;
  onClose: () => void;
}

const DeleteCommentPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const onSubmitDelete = () => {
    mutate(
      produce((state) => {
        const index = state.findComments.findIndex((d) => d._id === props._id);
        if (index === -1) return;
        state.findComments.splice(index, 1);

        const _index = state.findPosts.findIndex((d) => d._id === props.on_post);
        if (index === -1) return;
        state.findPosts[_index].count_comments--;
      })
    );
  };

  return (
    <AlertContainer type_alert="warning" description="Are you sure to delete this Comment?">
      <button
        class="flex w-full px-2 py-3 justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={props.onClose}
      >
        <span class="text-base">Cancel</span>
      </button>
      <button
        class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={onSubmitDelete}
      >
        <span class="text-base">Delete</span>
      </button>
    </AlertContainer>
  );
};

export default DeleteCommentPopup;
