import { useParams } from "@solidjs/router";
import { Component, createEffect, Match, onCleanup, Switch } from "solid-js";
import SettingContainer from "~/containers/setting-container";
import ManageInteraction from "~/modules/manage-interaction";
import ManagePushNotifications from "~/modules/manage-push-notifications";
import ManageTagsMentions from "~/modules/manage-tags-mentions";
import { selectStore } from "~/stores/manage";

const PageManage: Component = () => {
  const params: { manage: "tags_mentions" | "push_notifications" | "block" | "mute" | "personalize" } = useParams();
  const auth = selectStore((store) => store.auth!);

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  createEffect(() => {
    document.title =
      params.manage === "block"
        ? "Blocked accounts"
        : params.manage === "mute"
        ? "Muted accounts"
        : params.manage === "personalize"
        ? "Personalized accounts"
        : params.manage === "push_notifications"
        ? "Push notifications"
        : "Tags and Mentions";
  });

  return (
    <SettingContainer
      title={
        params.manage === "block"
          ? "Blocked accounts"
          : params.manage === "mute"
          ? "Muted accounts"
          : params.manage === "personalize"
          ? "Personalized accounts"
          : params.manage === "push_notifications"
          ? "Push notifications"
          : "Tags and Mentions"
      }
      class="flex flex-col w-full h-full gap-2"
    >
      <Switch>
        <Match when={params.manage === "block" || params.manage === "mute" || params.manage === "personalize"}>
          <ManageInteraction interaction={params.manage as "block" | "mute" | "personalize"} limit={10} />
        </Match>
        <Match when={params.manage === "push_notifications"}>
          <ManagePushNotifications {...auth().push_notifications} />
        </Match>
        <Match when={params.manage === "tags_mentions"}>
          <ManageTagsMentions allow_mentioned_from={auth().allow_mentioned_from} allow_tagged_from={auth().allow_tagged_from} />
        </Match>
      </Switch>
    </SettingContainer>
  );
};

export default PageManage;
