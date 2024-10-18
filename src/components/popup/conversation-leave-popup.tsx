import { useMatch, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { produce } from "solid-js/store";
import AlertContainer from "~/containers/alert-container";
import { mutateStore } from "~/stores/manage";

interface Props {
  _id: string;
  onClose: () => void;
}

const ConversationLeavePopup: Component<Props> = (props) => {
  const match = useMatch(() => `/chat/${props._id}`);
  const navigate = useNavigate();
  const mutate = mutateStore();

  const onSubmitLeaveConversation = () => {
    if (Boolean(match())) {
      navigate("/chat");
    }

    mutate(
      "findConversations",
      produce((states) => {
        const index = states.findIndex((d) => d._id === props._id);
        if (index === -1) return;

        states.splice(index, 1);
      })
    );
  };

  return (
    <AlertContainer type_alert="warning" description="Are you sure to leave on this conversation?">
      <button
        class="flex w-full px-2 py-3 justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={props.onClose}
      >
        <span class="text-base">Cancel</span>
      </button>
      <button
        class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
        onclick={onSubmitLeaveConversation}
      >
        <span class="text-base">Leave</span>
      </button>
    </AlertContainer>
  );
};

export default ConversationLeavePopup;
