import { Component, createEffect, createSignal, Match, onMount, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Spinner from "~/components/common/spinner";
import AlertContainer from "~/containers/alert-container";
import ModalContainer from "~/containers/modal-container";
import PopupContainer from "~/containers/popup-container";
import ManagePost from "~/modules/manage-post";
import { mutateStore } from "~/stores/manage";
import { getPostProps } from "~/types/post-interfaces";

interface Props extends getPostProps {
  onClose: () => void;
}

const EditPostPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [isOpenAlert, setIsOpenAlert] = createSignal<boolean>(false);
  const [isChanges, setIsChanges] = createSignal<boolean>(false);
  const [isIddle, setIsIddle] = createSignal<boolean>(true);

  const [value, setValue] = createStore<{
    post_id: string;
    get_html: string;
    get_text: string;
    is_active_comment: boolean;
    is_active_reaction: boolean;
  }>({
    post_id: "",
    get_html: "",
    get_text: "",
    is_active_comment: true,
    is_active_reaction: true,
  });

  const onSubmitUpdatePost = () => {
    setIsIddle(false);
    mutate(
      "findPosts",
      (states) => states._id === value.post_id,
      produce((state) => {
        state.get_html = value.get_html;
        state.get_text = value.get_text;
        state.is_active_comment = value.is_active_comment;
        state.is_active_reaction = value.is_active_reaction;
      })
    );

    props.onClose();
  };

  const onCloseModal = () => {
    if (!isIddle() || isOpenAlert()) return;
    if (isChanges() && !isOpenAlert()) return setIsOpenAlert(true);
    props.onClose();
  };

  onMount(() => {
    setValue(
      produce((state) => {
        state.get_html = props.get_html;
        state.get_text = props.get_text;
        state.is_active_comment = props.is_active_comment;
        state.is_active_reaction = props.is_active_reaction;
        state.post_id = props._id;
      })
    );
  });

  createEffect(() => {
    const currentValue = {
      post_id: props._id,
      get_html: props.get_html,
      get_text: props.get_text,
      is_active_comment: props.is_active_comment,
      is_active_reaction: props.is_active_reaction,
    };
    setIsChanges(JSON.stringify(currentValue) !== JSON.stringify(value));
  });

  return (
    <>
      <ModalContainer class="flex flex-col w-full h-full max-w-md max-h-[520px] md:max-h-[620px] animate-zoom-out" onClose={onCloseModal}>
        <div class="flex w-full p-3 items-center">
          <div class="flex w-full">
            <Show when={isIddle()}>
              <button class="flex group/icon" onclick={onCloseModal}>
                <Icons
                  name="cross"
                  class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                />
              </button>
            </Show>
          </div>
          <div class="flex justify-center shrink-0">
            <Show when={isIddle()} fallback={"Updating"}>
              Edit post
            </Show>
          </div>
          <div class="flex w-full justify-end">
            <Show when={isIddle()}>
              <button
                class="flex group/submit text-blue-600 active:text-blue-700 disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed justify-end"
                onclick={onSubmitUpdatePost}
                disabled={!value.get_text.trim().length || !isChanges()}
              >
                Update
              </button>
            </Show>
          </div>
        </div>
        <Switch>
          <Match when={isIddle()}>
            <ManagePost value={value} setValue={setValue} />
          </Match>
          <Match when={!isIddle()}>
            <div class="flex flex-col w-full h-full p-2 items-center justify-center">
              <Spinner />
            </div>
          </Match>
        </Switch>
      </ModalContainer>
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
    </>
  );
};

export default EditPostPopup;
