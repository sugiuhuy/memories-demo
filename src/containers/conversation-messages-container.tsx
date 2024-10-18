import { ParentComponent, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import MessageFilePreview from "~/components/common/message-file-preview";
import Spinner from "~/components/common/spinner";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import ConversationLeavePopup from "~/components/popup/conversation-leave-popup";
import ConversationOptionsPopup from "~/components/popup/conversation-options-popup";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import PopupContainer from "~/containers/popup-container";
import ManageMessage from "~/modules/manage-message";
import { selectStore } from "~/stores/manage";

interface Props {
  _id: string;
  count_messages: number;
}

const ConversationMessagesContainer: ParentComponent<Props> = (props) => {
  const conversation = selectStore((store) => store.findConversations.find((c) => c._id === props._id)!);

  const [popup, setPopup] = createStore<{ is_open: boolean; target: "menu" | "upload" | "leave" }>({ is_open: false, target: "menu" });
  const [value, setValue] = createStore<{ in_conversation: string; get_html: string; get_text: string; files: File[] }>({
    in_conversation: "",
    get_html: "",
    get_text: "",
    files: [],
  });

  const onClosePopup = () => setPopup("is_open", false);
  const onSwitchPopup = (target: "menu" | "leave" | "upload") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  return (
    <Switch>
      <Match when={!conversation()}>
        <HeaderContainer class="flex w-full p-2 gap-3 items-center">
          <button class="flex md:hidden group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
          </button>
          <div class="flex w-full gap-3 items-center animate-pulse">
            <div class="flex size-12 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
            <div class="flex flex-col w-full gap-2">
              <div class="flex w-3/4 h-4 bg-[var(--bg-secondary)]"></div>
              <div class="flex w-1/2 h-4 bg-[var(--bg-secondary)]"></div>
            </div>
            <div class="flex size-7 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-full"></div>
          </div>
        </HeaderContainer>
        <div class="flex w-full h-full items-center justify-center p-2">
          <Spinner />
        </div>
        <NavbarContainer class="flex w-full p-2 gap-2 animate-pulse">
          <div class="flex size-8 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
          <div class="flex w-full h-8 bg-[var(--bg-secondary)] rounded-lg"></div>
          <div class="flex size-8 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
        </NavbarContainer>
      </Match>
      <Match when={conversation()}>
        <HeaderContainer class="flex w-full p-2 gap-3 items-center">
          <button class="flex md:hidden group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
          </button>
          <div class="flex items-center w-full gap-2">
            <Avatar {...conversation().user} class="flex size-11 rounded-lg text-3xl" />
            <div class="flex w-full flex-col max-w-full overflow-hidden">
              <div class="flex items-center">
                <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                  <a href={`/@${conversation().user.username}`} class="truncate text-blue-600 active:text-blue-700">
                    {conversation().user.name}
                  </a>
                  <Show when={conversation().user.is_verified}>
                    <Tooltip text="Account is verified" class="flex ml-1">
                      <Icons name="verified" class="size-4 aspect-square shrink-0" />
                    </Tooltip>
                  </Show>
                </div>
              </div>
              <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
                <span class="truncate text-[var(--text-secondary-hover)] text-sm leading-5">@{conversation().user.username}</span>
              </div>
            </div>
            <button class="inline-flex group/icon" onclick={() => onSwitchPopup("menu")}>
              <Icons name="options" type_options="3 dot horizontal" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
            </button>
          </div>
        </HeaderContainer>
        <div class="relative flex w-full h-full items-center justify-center md:overflow-hidden">
          {props.children}
          <Show when={value.files.length > 0}>
            <MessageFilePreview />
          </Show>
        </div>
        <NavbarContainer class="flex flex-col w-full p-3 gap-2 items-center">
          <ManageMessage value={value} setValue={setValue} />
        </NavbarContainer>
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
      </Match>
    </Switch>
  );
};

export default ConversationMessagesContainer;
