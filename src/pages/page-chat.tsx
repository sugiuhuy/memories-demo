import { useLocation, useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ConversationCard from "~/components/card/conversation-card";
import ConversationMessages from "~/components/common/conversation-messages";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import NavbarLinks from "~/components/navigation/navbar-links";
import InviteUserPopup from "~/components/popup/invite-user-popup";
import ConversationMessagesContainer from "~/containers/conversation-messages-container";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import PopupContainer from "~/containers/popup-container";
import { generateChatConversations } from "~/data/chat-data";
import { mutateStore, selectStore } from "~/stores/manage";

const PageChat: Component = () => {
  const params: { conversation: string } = useParams();
  const location = useLocation();

  const conversations = selectStore((store) => store.findConversations);
  const messages = selectStore((store) => store.findMessages);
  const mutate = mutateStore();

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [isLoading, setIsLoading] = createSignal(true);

  const onGenerateConversations = (count: number) => {
    const data = generateChatConversations(count);
    data.map((item) => {
      mutate(
        "findConversations",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onMount(() => {
    document.title = "Chat";

    setTimeout(() => {
      mutate("findConversations", generateChatConversations(10));

      setIsLoading(false);
    }, 1500);
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  createEffect(() => {
    if (location.pathname) {
      setIsOpen(false);
    }
  });

  return (
    <>
      <div class="flex w-full h-full divide-x divide-solid divide-[var(--border-primary)]">
        <div
          class={`max-md:sticky top-0 flex-col w-full lg:max-w-96 h-dvh max-md:h-full divide-y divide-solid divide-[var(--border-primary)] ${
            params.conversation ? "flex max-md:hidden" : "flex"
          }`}
        >
          <HeaderContainer class="flex w-full p-3 gap-3 items-center">
            <button class="flex md:hidden group/navigator" onClick={() => history.back()}>
              <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
            </button>
            <div class="flex w-full max-md:justify-center">Conversations</div>
            <button class="flex group/icon" onclick={() => setIsOpen(true)}>
              <Icons name="addNew" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
            </button>
          </HeaderContainer>
          <div class="flex w-full h-full md:overflow-hidden">
            <Switch>
              <Match when={isLoading()}>
                <div class="flex w-full h-full items-center justify-center">
                  <Spinner />
                </div>
              </Match>
              <Match when={!isLoading()}>
                <Switch>
                  <Match when={conversations().length === 0}>
                    <div class="flex w-full h-full items-center justify-center">
                      <span class="text-sm text-[var(--text-secondary-hover)]">Doesn't have any conversation yet</span>
                    </div>
                  </Match>
                  <Match when={conversations().length !== 0}>
                    <div class="flex flex-col w-full h-full md:overflow-auto">
                      <For each={conversations()}>{(conversation) => <ConversationCard {...conversation} />}</For>
                      <Show when={conversations().length >= 10}>
                        <FetchNextPage count={conversations().length} limit={10} max={25} onGenerate={onGenerateConversations} />
                      </Show>
                    </div>
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </div>
          <NavbarContainer class="flex md:hidden w-full">
            <NavbarLinks />
          </NavbarContainer>
        </div>
        <div
          class={`relative flex flex-col w-full h-dvh max-md:h-full divide-y divide-solid divide-[var(--border-primary)] ${
            params.conversation ? "flex" : "flex max-md:hidden"
          }`}
        >
          <Switch>
            <Match when={!params.conversation}>
              <div class="flex w-full h-full items-center justify-center">
                <Icons name="paperPlane" class="size-full max-w-20 max-h-20 aspect-square text-[var(--text-secondary-hover)]" />
              </div>
            </Match>
            <Match when={params.conversation}>
              <ConversationMessagesContainer _id={params.conversation} count_messages={messages().length}>
                <ConversationMessages _id={params.conversation} />
              </ConversationMessagesContainer>
            </Match>
          </Switch>
        </div>
      </div>
      <PopupContainer is_open={isOpen()}>
        <InviteUserPopup onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default PageChat;
