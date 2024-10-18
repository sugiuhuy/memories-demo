import { Component, Show } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import { getNotificationProps } from "~/types/notification-interfaces";
import { moment } from "~/utilities/date-moment";

const NotificationCard: Component<getNotificationProps> = (props) => {
  return (
    <a href={props.url} class="flex w-full gap-2 p-2 hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary)]">
      <Avatar {...props.sender} class="size-14 aspect-auto rounded-lg text-4xl" />
      <div class="flex w-full items-center">
        <div class="flex flex-col w-full justify-center">
          <div class="flex w-full">
            <div class="inline-flex w-full overflow-hidden">
              <div class="truncate">
                <div class="inline-flex items-center p-0 m-0">
                  <span>{props.sender.name}</span>
                  <Show when={props.sender.is_verified}>
                    <Tooltip text="Account is verified" class="flex items-center justify-center ml-1">
                      <Icons name="verified" class="size-4 aspect-square shrink-0" />
                    </Tooltip>
                  </Show>
                </div>
                <div class="inline whitespace-pre-line break-words ml-2 text-[var(--text-secondary)]">{props.message}</div>
              </div>
            </div>
          </div>
          <span class="text-sm text-[var(--text-secondary-hover)]">{moment(props.createdAt)}</span>
        </div>
        <div class={`flex size-1 aspect-square shrink-0 rounded-full ml-2 ${props.is_read ? "bg-transparent" : "bg-blue-600"}`}></div>
      </div>
    </a>
  );
};

export default NotificationCard;
