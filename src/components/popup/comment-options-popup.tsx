import { Component, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";
import { mutateStore, selectStore } from "~/stores/manage";
import { commentPropsBase } from "~/types/post-interfaces";

interface Props extends commentPropsBase {
  onClose: () => void;
  onSwitchPopup: (target: "delete" | "report") => void;
}

const CommentOptionsPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const onSubmitBlock = () => {
    mutate(
      "findComments",
      (states) => states._id === props._id,
      "author",
      produce((state) => {
        state.is_block = !props.author.is_block;
      })
    );
  };

  return (
    <ModalContainer class="flex flex-col w-full max-w-72 animate-zoom-in" onClose={props.onClose}>
      <div class="flex flex-col w-full p-2">
        <Switch>
          <Match when={props.author._id === auth()._id}>
            <button
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
              onclick={() => props.onSwitchPopup("delete")}
            >
              <span class="text-rose-600">Delete</span>
              <Icons name="trash" class="size-4 aspect-square text-rose-600" />
            </button>
          </Match>
          <Match when={props.author._id !== auth()._id}>
            <button
              onclick={onSubmitBlock}
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
            >
              <span class="text-rose-600">
                <Show when={props.author.is_block} fallback={"Block"} children={"Unblock"} />
              </span>
              <Icons name="user" type_user="block" class="size-4 aspect-square text-rose-600" />
            </button>
            <button
              class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
              onclick={() => props.onSwitchPopup("report")}
            >
              <span class="text-rose-600">Report</span>
              <Icons name="report" class="size-4 aspect-square text-rose-600" />
            </button>
          </Match>
        </Switch>
      </div>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={props.onClose}
        >
          <span>Cancel</span>
          <Icons name="cross" class="size-4 rotate-45 aspect-square" />
        </button>
      </div>
    </ModalContainer>
  );
};

export default CommentOptionsPopup;
