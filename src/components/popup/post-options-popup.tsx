import { Component, createSignal, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";
import { mutateStore, selectStore } from "~/stores/manage";
import { getPostProps } from "~/types/post-interfaces";

interface Props extends getPostProps {
  onClose: () => void;
  onSwitchPopup: (target: "edit" | "delete" | "report") => void;
}

const PostOptionPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();
  const [disabled, setDisabled] = createSignal<boolean>(false);

  const onCloseModal = () => {
    if (disabled()) return;
    props.onClose();
  };

  const onSubmitSavePost = () => {
    setDisabled(true);
    mutate(
      "findPosts",
      (states) => states._id === props._id,
      produce((state) => {
        state.is_saved = !props.is_saved;
      })
    );

    setTimeout(() => {
      setDisabled(false);
    }, 1500);
  };

  const onCopyPostUrl = () => {
    const url = `${window.location.origin}/post/${props._id}`;
    navigator.clipboard.writeText(url);

    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, status: "success", message: "Link copied to clipboard" });
        states.sort((a, b) => b.id - a.id);
      })
    );

    props.onClose();
  };

  const onSubmitBlock = () => {
    setDisabled(true);
    mutate(
      "findPosts",
      (states) => states._id === props._id,
      "author",
      produce((state) => {
        state.is_block = !props.author.is_block;
      })
    );

    setTimeout(() => {
      setDisabled(false);
    }, 1500);
  };

  const onSubmitFollow = () => {
    setDisabled(true);
    mutate(
      "findPosts",
      (states) => states._id === props._id,
      "author",
      produce((state) => {
        state.is_follow = !props.author.is_follow;
      })
    );

    setTimeout(() => {
      setDisabled(false);
    }, 1500);
  };

  const onSubmitMute = () => {
    setDisabled(true);
    mutate(
      "findPosts",
      (states) => states._id === props._id,
      "author",
      produce((state) => {
        state.is_mute = !props.author.is_mute;
      })
    );

    setTimeout(() => {
      setDisabled(false);
    }, 1500);
  };

  return (
    <ModalContainer class="flex flex-col w-full max-w-72 animate-zoom-in" onClose={onCloseModal}>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed rounded-lg"
          onclick={onSubmitSavePost}
          disabled={disabled()}
        >
          <span>
            <Show when={props.is_saved} fallback={"Save"} children={"Unsave"} />
          </span>
          <Icons name="bookmark" class="size-4 aspect-square" />
        </button>
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={onCopyPostUrl}
          disabled={disabled()}
        >
          <span>Copy link</span>
          <Icons name="link" type_link="url" class="size-4 aspect-square" />
        </button>
      </div>
      <Switch>
        <Match when={props.author._id === auth()._id}>
          <div class="flex flex-col w-full p-2">
            <button
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
              onclick={() => props.onSwitchPopup("edit")}
              disabled={disabled()}
            >
              <span>Edit</span>
              <Icons name="pen" type_pen="box" class="size-4 aspect-square" />
            </button>
            <button
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
              onclick={() => props.onSwitchPopup("delete")}
              disabled={disabled()}
            >
              <span class="text-rose-600">Delete</span>
              <Icons name="trash" class="size-4 aspect-square text-rose-600" />
            </button>
          </div>
        </Match>
        <Match when={props.author._id !== auth()._id}>
          <div class="flex flex-col w-full p-2">
            <button
              onclick={onSubmitFollow}
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg text-blue-600"
              disabled={disabled()}
            >
              <Switch>
                <Match when={!props.author.is_follow}>
                  <span>Follow</span>
                  <Icons name="user" type_user="add" class="size-4 aspect-square text-blue-600" />
                </Match>
                <Match when={props.author.is_follow}>
                  <span>Following</span>
                  <Icons name="user" type_user="following" class="size-4 aspect-square text-blue-600" />
                </Match>
              </Switch>
            </button>
            <button
              onclick={onSubmitMute}
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg text-rose-600"
              disabled={disabled()}
            >
              <span>
                <Show when={props.author.is_mute} fallback={"Mute"} children={"Unmute"} />
              </span>
              <Icons name="user" type_user="mute" class="size-4 aspect-square text-rose-600" />
            </button>
            <button
              onclick={onSubmitBlock}
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg text-rose-600"
              disabled={disabled()}
            >
              <span>
                <Show when={props.author.is_block} fallback={"Block"} children={"Unblock"} />
              </span>
              <Icons name="user" type_user="block" class="size-4 aspect-square text-rose-600" />
            </button>
            <button
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
              onclick={() => props.onSwitchPopup("report")}
              disabled={disabled()}
            >
              <span class="text-rose-600">Report</span>
              <Icons name="report" class="size-4 aspect-square text-rose-600" />
            </button>
          </div>
        </Match>
      </Switch>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={onCloseModal}
          disabled={disabled()}
        >
          <span>Cancel</span>
          <Icons name="cross" class="size-4 rotate-45 aspect-square" />
        </button>
      </div>
    </ModalContainer>
  );
};

export default PostOptionPopup;
