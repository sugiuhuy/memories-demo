import { Component, createSignal, For, Match, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import NotificationCard from "~/components/card/notification-card";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import generateNotifications from "~/data/notification-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { getNotificationProps } from "~/types/notification-interfaces";

interface Props {
  limit: number;
  max_notifications: number;
  notifications: getNotificationProps[];
}

const NotificationsSwitcher: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const [isLoading, setIsLoading] = createSignal(true);
  const onGenerateNotifications = (count: number) => {
    const data = generateNotifications({ count, exclude: auth()._id });
    data.map((item) => {
      mutate(
        "findNotifications",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onMount(() => {
    setTimeout(() => {
      mutate("findNotifications", generateNotifications({ count: 10, exclude: auth()._id }));
      setIsLoading(false);
    }, 1500);
  });

  return (
    <Switch>
      <Match when={isLoading()}>
        <div class="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      </Match>
      <Match when={!isLoading()}>
        <Switch>
          <Match when={props.notifications.length === 0}>
            <div class="flex w-full h-full items-center justify-center">
              <span class="text-sm text-[var(--text-secondary-hover)]">No notifications has recieved</span>
            </div>
          </Match>
          <Match when={props.notifications.length !== 0}>
            <For each={props.notifications}>{(notification) => <NotificationCard {...notification} />}</For>
            <Show when={props.notifications.length >= props.limit}>
              <FetchNextPage
                count={props.notifications.length}
                limit={props.limit}
                max={props.max_notifications}
                onGenerate={onGenerateNotifications}
              />
            </Show>
          </Match>
        </Switch>
      </Match>
    </Switch>
  );
};

export default NotificationsSwitcher;
