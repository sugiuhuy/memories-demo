import { Component } from "solid-js";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";

interface Props {
  onSwitchPopup: (target: "leave") => void;
  onClose: () => void;
}

const ConversationOptionsPopup: Component<Props> = (props) => {
  return (
    <ModalContainer class="flex flex-col w-full max-w-72 animate-zoom-in" onClose={props.onClose}>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center text-rose-600 hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={() => props.onSwitchPopup("leave")}
        >
          <span>Leave</span>
          <Icons name="logout" class="size-4 aspect-square" />
        </button>
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

export default ConversationOptionsPopup;
