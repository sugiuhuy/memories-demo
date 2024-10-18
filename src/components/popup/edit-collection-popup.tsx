import { Component, createEffect, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import AlertContainer from "~/containers/alert-container";
import ModalContainer from "~/containers/modal-container";
import PopupContainer from "~/containers/popup-container";
import ManageCollection from "~/modules/manage-collections";
import { mutateStore } from "~/stores/manage";
import { getCollectionProps } from "~/types/user-interfaces";

interface Props extends getCollectionProps {
  onClose: () => void;
}

const EditCollectionPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [isOpenAlert, setIsOpenAlert] = createSignal<boolean>(false);
  const [isMatchValue, setIsMatchValue] = createSignal<boolean>(false);
  const [value, setValue] = createStore<{ unicode: string; speed_animation: number }>({ unicode: "", speed_animation: 0 });
  const [allowUsedBy, setAllowUsedBy] = createStore<{ everyone: boolean; followers: boolean }>({ everyone: false, followers: false });

  const onCloseModal = () => {
    if (isOpenAlert()) return;
    if (isMatchValue() && !isOpenAlert()) return setIsOpenAlert(true);

    props.onClose();
  };

  const onSubmitUpdateCollection = () => {
    mutate(
      "findCollections",
      (states) => states._id === props._id,
      produce((state) => {
        state.allow_used = allowUsedBy;
        state.speed_animation = value.speed_animation;
        state.unicode = value.unicode;
      })
    );
    props.onClose();
  };

  onMount(() => {
    setValue(
      produce((state) => {
        state.speed_animation = props.speed_animation;
        state.unicode = props.unicode;
      })
    );

    setAllowUsedBy(
      produce((state) => {
        state.everyone = props.allow_used.everyone;
        state.followers = props.allow_used.followers;
      })
    );
  });

  createEffect(() => {
    setIsMatchValue(
      value.speed_animation !== props.speed_animation ||
        value.unicode !== props.unicode ||
        allowUsedBy.everyone !== props.allow_used.everyone ||
        allowUsedBy.followers !== props.allow_used.followers
    );
  });

  return (
    <ModalContainer class="flex flex-col w-full max-w-80 animate-zoom-out" onClose={onCloseModal}>
      <div class="flex w-full p-3 items-center">
        <div class="flex w-full">
          <button class="flex group/icon" onclick={onCloseModal}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
        <div class="flex justify-center shrink-0">Edit reaction</div>
        <div class="flex w-full justify-end">
          <button
            class="flex group/submit text-blue-600 active:text-blue-700 disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed justify-end"
            onclick={onSubmitUpdateCollection}
            disabled={!value.unicode.trim().length || !isMatchValue()}
          >
            Save
          </button>
        </div>
      </div>
      <ManageCollection src={props.src} value={value} setValue={setValue} allow_used={allowUsedBy} setAllowUsedBy={setAllowUsedBy} />
      <PopupContainer is_open={isOpenAlert()}>
        <AlertContainer type_alert="warning" description="If you leave, your current progress won't be saved">
          <button
            class="flex w-full px-2 py-3 border-r border-solid border-[var(--border-secondary)] justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={() => setIsOpenAlert(false)}
          >
            <span class="text-base">Cancel</span>
          </button>
          <button
            class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={props.onClose}
          >
            <span class="text-base">Discard</span>
          </button>
        </AlertContainer>
      </PopupContainer>
    </ModalContainer>
  );
};

export default EditCollectionPopup;
