import { Component } from "solid-js";
import { produce } from "solid-js/store";
import AlertContainer from "~/containers/alert-container";
import { mutateStore } from "~/stores/manage";

interface Props {
  _id: string;
  onClose: () => void;
}

const DeleteCollectionPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const onSubmitDeleteCollection = () => {
    mutate(
      "findCollections",
      produce((states) => {
        const index = states.findIndex((d) => d._id === props._id);
        if (index === -1) return;
        states.splice(index, 1);
      })
    );
  };

  return (
    <AlertContainer type_alert="warning" description="Are you sure to delete this collection?">
      <button
        class="flex w-full px-2 py-3 border-r border-solid border-[var(--border-secondary)] justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={props.onClose}
      >
        <span class="text-base">Cancel</span>
      </button>
      <button
        class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={onSubmitDeleteCollection}
      >
        <span class="text-base">Delete</span>
      </button>
    </AlertContainer>
  );
};

export default DeleteCollectionPopup;
