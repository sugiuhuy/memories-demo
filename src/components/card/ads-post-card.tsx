import { Component, createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import ImageEffect from "~/components/media/image-effect";
import Video from "~/components/media/video";
import ReportIssuePopup from "~/components/popup/report-issue-popup";
import { MimeTypes } from "~/configurations/file-config";
import PopupContainer from "~/containers/popup-container";
import SwiperContainer from "~/containers/swiper-container";
import { selectStore } from "~/stores/manage";
import { getPostAdsProps } from "~/types/post-interfaces";
import transformContentPattern from "~/utilities/transform-content-pattern";

const AdsPostCard: Component<getPostAdsProps> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const auth = selectStore((store) => store.auth!);
  const is_author = auth()._id === props.author._id;

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [ellipsis, setEllipsis] = createSignal<boolean>(false);

  createEffect(() => {
    setEllipsis(elRef!.offsetHeight >= 150);
  });

  return (
    <>
      <div class="flex flex-col w-full max-w-md gap-2 pt-2 first:pt-0">
        <div class="flex w-full gap-2 items-center">
          <Avatar {...props.author} class="size-12 max-md:size-11 aspect-square rounded-lg text-3xl max-md:text-2xl" />
          <div class="flex w-full flex-col max-w-full overflow-hidden">
            <div class="flex items-center">
              <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                <a href={`/@${props.author.username}`} class="truncate text-blue-600 active:text-blue-700">
                  {props.author.name}
                </a>
                <Show when={props.author.is_verified}>
                  <Tooltip text="Account is verified" class="flex ml-1">
                    <Icons name="verified" class="size-4 aspect-square shrink-0" />
                  </Tooltip>
                </Show>
              </div>
            </div>
            <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full text-[var(--text-secondary-hover)] gap-1">
              <Icons name="advertisement" class="size-4 aspect-square shrink-0" is_active />
              <span class="truncate text-sm capitalize">{props.campaign}</span>
            </div>
          </div>
          <a
            href={props.url}
            target="_blank"
            class="flex shrink-0 px-3 py-1 outline outline-1 outline-offset-2 outline-[var(--border-primary)] bg-[var(--bg-secondary)] active:bg-[var(--bg-secondary-hover)] rounded-lg text-sm"
          >
            <Switch>
              <Match when={props.campaign === "application"}>Download</Match>
              <Match when={props.campaign === "shop"}>Buy</Match>
              <Match when={props.campaign === "trafic"}>Visit</Match>
            </Switch>
          </a>
          <Show when={!is_author}>
            <button class="flex shrink-0 group/icon ml-2" onclick={() => setIsOpen(true)}>
              <Icons name="options" type_options="3 dot horizontal" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
            </button>
          </Show>
        </div>
        <SwiperContainer total={props.media.length} class="flex w-full h-[450px] md:h-[525px] justify-center">
          <For each={props.media}>
            {(media) => (
              <div class="relative flex w-full h-full shrink-0">
                <Switch>
                  <Match when={MimeTypes.images.includes(media.file_type)}>
                    <ImageEffect effect={media.image_effect} ratio={media.image_ratio} src={media.src} is_cencored={media.is_cencored} />
                  </Match>
                  <Match when={MimeTypes.videos.includes(media.file_type)}>
                    <Video src={media.src} is_cencored={media.is_cencored} />
                  </Match>
                </Switch>
              </div>
            )}
          </For>
        </SwiperContainer>
        <div class="flex w-full">
          <div ref={elRef} class="inline-flex w-full overflow-hidden">
            <div class="truncate">
              <div class="inline-flex items-center p-0 m-0">
                <a href={`/@${props.author.username}`} class="text-blue-600 active:text-blue-700 no-underline">
                  {props.author.name}
                </a>
                <Show when={props.author.is_verified}>
                  <Tooltip text="Account is verified" class="flex items-center justify-center ml-1">
                    <Icons name="verified" class="size-4 aspect-square shrink-0" />
                  </Tooltip>
                </Show>
              </div>
              <div
                class={`inline ${ellipsis() ? "whitespace-line" : "whitespace-pre-line break-words"} ml-2`}
                innerHTML={transformContentPattern(props.get_text)}
              ></div>
            </div>
          </div>
          <Show when={ellipsis()}>
            <button
              class="flex min-w-fit text-[var(--text-secondary)] hover:text-[var(--text-primary)] ml-3 hover:dotted"
              onclick={() => setEllipsis(false)}
            >
              more
            </button>
          </Show>
        </div>
      </div>
      <PopupContainer is_open={isOpen()}>
        <ReportIssuePopup reporting={{ report_ads: props._id }} onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default AdsPostCard;
