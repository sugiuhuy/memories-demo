import { Component, createSignal, Show } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import DeleteMessagePopup from "~/components/popup/delete-message-popup";
import PopupContainer from "~/containers/popup-container";
import { selectStore } from "~/stores/manage";
import { getMessageProps } from "~/types/chat-interfaces";
import { moment } from "~/utilities/date-moment";
import transformContentPattern from "~/utilities/transform-content-pattern";

const MessageCard: Component<getMessageProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const isReverse = props.sender._id === auth()._id;

  return (
    <>
      <div class={`flex w-full ${isReverse ? "flex-row-reverse" : "flex-row"}`}>
        <div class={`flex w-full flex-col ${isReverse ? "items-end" : "items-start"}`}>
          <div class={`flex flex-col max-w-[75%] p-2 gap-2 rounded-lg ${isReverse ? "bg-[var(--bg-secondary)]" : "bg-blue-500"}`}>
            <Show when={props.file}>
              <img src={props.file!.src} class="flex h-full max-h-md" />
            </Show>
            <div innerHTML={transformContentPattern(props.get_text)}></div>
          </div>
          <div class="flex gap-2 mt-2">
            <Show when={props.sender._id === auth()._id}>
              <Tooltip text={props.is_read ? "Read" : "Delivered"} class="flex w-fit">
                <Icons
                  name="deliveried"
                  is_deliveried={props.is_read}
                  class={`size-4 aspect-square shrink-0 ${props.is_read ? "text-blue-600" : "text-[var(--text-secondary-hover)]"}`}
                />
              </Tooltip>
            </Show>
            <span class="text-xs text-[var(--text-secondary-hover)]">{moment(props.createdAt)}</span>
            <Show when={props.sender._id === auth()._id}>
              <button class="flex shrink-0 text-rose-600 ml-2 group/icon" onclick={() => setIsOpen(true)}>
                <Icons name="trash" class="size-4 aspect-square shrink-0 group-active/icon:scale-95" />
              </button>
            </Show>
          </div>
        </div>
      </div>
      <PopupContainer is_open={isOpen()}>
        <DeleteMessagePopup _id={props._id} onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default MessageCard;
