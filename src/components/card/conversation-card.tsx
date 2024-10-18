import { useMatch } from "@solidjs/router";
import { Component, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import ConversationLeavePopup from "~/components/popup/conversation-leave-popup";
import ConversationOptionsPopup from "~/components/popup/conversation-options-popup";
import { MimeTypes } from "~/configurations/file-config";
import PopupContainer from "~/containers/popup-container";
import { selectStore } from "~/stores/manage";
import { getConversationProps } from "~/types/chat-interfaces";
import { moment } from "~/utilities/date-moment";
import { formatNumber } from "~/utilities/formatter";
import transformContentPattern from "~/utilities/transform-content-pattern";

const ConversationCard: Component<getConversationProps> = (props) => {
  const match = useMatch(() => `/chat/${props._id}`);
  const auth = selectStore((store) => store.auth!);
  const [popup, setPopup] = createStore<{ is_open: boolean; target: "menu" | "leave" }>({ is_open: false, target: "menu" });

  const onClosePopup = () => {
    setPopup(
      produce((state) => {
        state.is_open = false;
      })
    );
  };

  const onSwitchPopup = (target: "menu" | "leave") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  const onClick = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    onSwitchPopup("menu");
  };

  return (
    <>
      <a
        href={`/chat/${props._id}`}
        class={`flex w-full p-2 gap-2 items-center hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)] ${
          Boolean(match()) ? "bg-[var(--bg-secondary)]" : "bg-transparent"
        }`}
      >
        <Avatar {...props.user} class="flex size-12 rounded-lg text-3xl" />
        <div class="flex w-full flex-col max-w-full overflow-hidden justify-center">
          <div class="flex items-center justify-between gap-2">
            <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
              <Show when={props.last_message}>
                <div class="truncate text-[var(--text-primary)] text-sm">
                  <Show when={props.user._id !== auth()._id}>
                    <div class="inline-flex items-center p-0 m-0">
                      <span>{props.last_message?.sender.name}</span>
                      <Show when={props.last_message?.sender.is_verified}>
                        <Tooltip text="Account verified" class="flex items-center justify-center ml-1">
                          <Icons name="verified" class="size-4 aspect-square shrink-0" />
                        </Tooltip>
                      </Show>
                    </div>
                  </Show>
                  <div
                    class="inline whitespace-line ml-2 text-[var(--text-primary)]"
                    innerHTML={transformContentPattern(props.last_message!.get_text)}
                  ></div>
                </div>
              </Show>
            </div>
            <div class="inline-flex gap-2 shrink-0">
              <span class="inline-flex text-sm text-[var(--text-secondary)] shrink-0">{moment(props.createdAt)}</span>
              <button class="inline-flex group/icon" onclick={onClick}>
                <Icons name="options" type_options="3 dot horizontal" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between gap-2">
            <div class="inline-flex items-center whitespace-nowrap max-w-full gap-1 overflow-hidden text-[var(--text-secondary-hover)]">
              <Show when={props.last_message}>
                <Show when={props.last_message!.sender._id === auth()._id}>
                  <Icons
                    name="deliveried"
                    is_deliveried={props.last_message!.is_read}
                    class={`size-3 aspect-square shrink-0 ${props.last_message!.is_read ? "text-blue-600" : "text-[var(--text-primary)]"}`}
                  />
                </Show>
                <Show when={props.last_message!.file}>
                  <Switch>
                    <Match when={MimeTypes.images.includes(props.last_message!.file!.file_type)}>
                      <Icons name="gallery" type_gallery="picture" class="size-3 aspect-square shrink-0" />
                      <span class="truncate text-sm">attach image</span>
                    </Match>
                    <Match when={MimeTypes.videos.includes(props.last_message!.file!.file_type)}>
                      <Icons name="gallery" type_gallery="video" class="size-3 aspect-square shrink-0" />
                      <span class="truncate text-sm">attach video</span>
                    </Match>
                  </Switch>
                </Show>
              </Show>
            </div>
            <Show when={props.count_unread > 0}>
              <span class="inline-flex text-sm text-neutral-50 shrink-0 px-1.5 bg-blue-600 rounded-lg aspect-square items-center justify-center">
                {formatNumber(props.count_unread)}
              </span>
            </Show>
          </div>
        </div>
      </a>
      <PopupContainer is_open={popup.is_open}>
        <Switch>
          <Match when={popup.target === "leave"}>
            <ConversationLeavePopup _id={props._id} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "menu"}>
            <ConversationOptionsPopup onSwitchPopup={onSwitchPopup} onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default ConversationCard;
