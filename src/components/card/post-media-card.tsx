import { Component, For, Match, Show, Switch } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import ImageEffect from "~/components/media/image-effect";
import Video from "~/components/media/video";
import { MimeTypes } from "~/configurations/file-config";
import SwiperContainer from "~/containers/swiper-container";
import { getPostMediaProps } from "~/types/post-interfaces";

interface Props {
  media: getPostMediaProps[];
  class: string;
}

const PostMediaCard: Component<Props> = (props) => {
  return (
    <SwiperContainer total={props.media.length} class={props.class}>
      <For each={props.media}>
        {(media) => (
          <div class="relative flex w-full h-full shrink-0">
            <div class="absolute z-[1] top-1 flex w-full p-2">
              <For each={media.tagged_users}>
                {(user) => (
                  <Tooltip text={user.name} class="relative flex first:ml-0 -ml-2">
                    <Avatar {...user} class="size-8 text-sm outline outline-2 outline-neutral-50" />
                    <Show when={user.is_verified}>
                      <div class="absolute -top-0.5 -right-0.5">
                        <Icons name="verified" class="size-3 aspect-square shrink-0" />
                      </div>
                    </Show>
                  </Tooltip>
                )}
              </For>
            </div>
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
  );
};

export default PostMediaCard;
