import { Component, createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { contentAuthorProps } from "~/types/post-interfaces";
import Avatar from "../media/avatar";
import Icons from "~/assets/icons";
import { moment } from "~/utilities/date-moment";
import { formatNumber } from "~/utilities/formatter";

const AuthorTooltip: Component<contentAuthorProps> = (props) => {
  let elRef: HTMLAnchorElement | undefined;
  let contRef: HTMLDivElement | undefined;

  const [isShow, setIsShow] = createSignal<boolean>(false);

  const onMouseEnter = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(true);
  };

  const onMouseLeave = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(false);
  };

  const onReposition = () => {
    const inContainerTooltip = elRef!.getBoundingClientRect();
    const tooltipRect = contRef!.getBoundingClientRect();

    let { x, y } = inContainerTooltip!;
    y = y > window.innerHeight - tooltipRect.height ? window.innerHeight - tooltipRect.height : y;
    x = x > window.innerWidth - tooltipRect.width ? window.innerWidth - tooltipRect.width : x;

    contRef!.style.setProperty("--tooltip-top", `${y + inContainerTooltip!.height + 8}px`);
    contRef!.style.setProperty("--tooltip-left", `${x}px`);
  };

  onMount(() => {
    onReposition();
  });

  onCleanup(() => {
    elRef!.removeEventListener("mousemove", onReposition);
  });

  createEffect(() => {
    elRef!.addEventListener("mousemove", onReposition);
  });

  return (
    <a
      ref={elRef}
      href={`/@${props.username}`}
      class="text-blue-600 active:text-blue-700 truncate no-underline"
      onmouseenter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.name}
      <Portal mount={document.getElementById("portals")!}>
        <div
          ref={contRef}
          class={`fixed z-[999999] top-[var(--tooltip-top)] left-[var(--tooltip-left)] flex flex-col w-full max-w-80 items-center bg-[var(--bg-secondary)] p-3 gap-2 rounded-lg pointer-events-none select-none transition-opacity outline outline-1 outline-[var(--border-secondary)] ${
            isShow() ? "opacity-100" : "opacity-0"
          }`}
        >
          <div class="flex w-full gap-2 items-center">
            <Avatar {...props} class="size-12 max-md:size-11 aspect-square rounded-lg text-3xl max-md:text-2xl" />
            <div class="flex w-full flex-col max-w-full overflow-hidden">
              <div class="flex items-center">
                <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                  <span class="truncate">{props.name}</span>
                  <Show when={props.is_verified}>
                    <Icons name="verified" class="flex ml-1 size-4 aspect-square shrink-0" />
                  </Show>
                </div>
              </div>
              <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
                <span class="truncate text-[var(--text-secondary-hover)] text-sm">@{props.username}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full gap-0.5">
            <div class="flex w-full gap-2 text-xs items-center text-[var(--text-secondary-hover)]">
              <span>Joined {moment(props.createdAt)}</span>
              <span>{formatNumber(props.count_posts)} posts</span>
            </div>
            <Show when={props.bio.trim().length > 0}>
              <span class="text-sm">{props.bio}</span>
            </Show>
            <div class="flex w-full gap-2 mt-2">
              <span class="text-xs text-[var(--text-secondary)]">{formatNumber(props.count_followers)} Followers</span>
              <span class="text-xs text-[var(--text-secondary)]">{formatNumber(props.count_following)} Following</span>
            </div>
          </div>
        </div>
      </Portal>
    </a>
  );
};

export default AuthorTooltip;
