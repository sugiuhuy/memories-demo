import { Component, createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import MessageCard from "~/components/card/message-card";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import ScrillToNewMessages from "~/components/common/scroll-to-new-messages";
import { mutateStore, selectStore } from "~/stores/manage";
import { generateChatMessages } from "~/data/chat-data";

interface Props {
  _id: string;
}

const ConversationMessages: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const conversation = selectStore((store) => store.findConversations.find((d) => d._id === props._id)!);
  const messages = selectStore((store) => store.findMessages);
  const mutate = mutateStore();

  const [isWaiting, setIsWaiting] = createSignal<boolean>(true);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  const onGenerateMessages = (count: number) => {
    const data = generateChatMessages({ count, includes: [conversation().user._id, auth()._id] });
    data.map((item) => {
      mutate(
        "findMessages",
        produce((states) => {
          states.unshift(item);
        })
      );
    });
  };

  onMount(() => {
    setTimeout(() => {
      mutate("findMessages", generateChatMessages({ count: 10, includes: [conversation().user._id, auth()._id] }));
      setIsLoading(false);
    }, 1500);

    setTimeout(() => {
      setIsWaiting(false);
    }, 500);
  });

  onCleanup(() => {
    mutate("findMessages", []);
  });

  createEffect(() => {
    if (props._id) {
      setIsLoading(true);
      setIsWaiting(true);
      mutate("findMessages", []);

      setTimeout(() => {
        mutate("findMessages", generateChatMessages({ count: 10, includes: [conversation().user._id, auth()._id] }));
        setIsLoading(false);
      }, 1500);

      setTimeout(() => {
        setIsWaiting(false);
      }, 500);
    }
  });

  return (
    <div class="flex w-full h-full items-end">
      <Switch>
        <Match when={isLoading()}>
          <div class="flex w-full h-full items-center justify-center">
            <Spinner />
          </div>
        </Match>
        <Match when={!isLoading()}>
          <Switch>
            <Match when={messages().length === 0}>
              <div class="flex w-full h-full items-center justify-center">
                <span class="text-sm text-[var(--text-secondary-hover)]">Doesn't have messages yet</span>
              </div>
            </Match>
            <Match when={messages().length !== 0}>
              <div class="flex w-full h-full flex-col-reverse p-2 md:overflow-auto">
                <ScrillToNewMessages when={messages().length} />
                <div class="flex flex-col w-full gap-5">
                  <For each={messages()}>{(message) => <MessageCard {...message} />}</For>
                </div>
                <Show when={messages().length >= 10 && !isWaiting()}>
                  <FetchNextPage count={messages().length} limit={10} max={conversation().count_unread + 10} onGenerate={onGenerateMessages} />
                </Show>
              </div>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </div>
  );
};

export default ConversationMessages;
