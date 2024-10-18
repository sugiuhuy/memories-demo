import { Component, createSignal, Match, onMount, Setter, Switch } from "solid-js";
import { MimeTypes } from "~/configurations/file-config";
import { getPostProps } from "~/types/post-interfaces";
import ImageEffect from "../media/image-effect";
import Video from "../media/video";
import Icons from "~/assets/icons";
import { formatNumber } from "~/utilities/formatter";
import { mutateStore } from "~/stores/manage";
import { produce } from "solid-js/store";

interface Props extends getPostProps {
  setView: Setter<"grid" | "flex">;
}

const PostPreviewCard: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [isNavigate, setIsNavigate] = createSignal<boolean>(true);
  const [mediaType, setMediaType] = createSignal<"all" | "picture" | "video">("all");

  const onPriority = () => {
    mutate(
      "findPosts",
      produce((states) => {
        const index = states.findIndex((p) => p._id === props._id);
        if (index === -1) return;

        const _post = states[index];
        states.splice(index, 1);
        states.unshift(_post);
      })
    );

    props.setView!("flex");
  };

  const Media = () => {
    return (
      <>
        <Switch>
          <Match when={MimeTypes.images.includes(props.media[0].file_type)}>
            <ImageEffect
              effect={props.media[0].image_effect!}
              ratio={props.media[0].image_ratio!}
              src={props.media[0].src}
              is_cencored={props.media[0].is_cencored}
              is_preview
            />
          </Match>
          <Match when={MimeTypes.videos.includes(props.media[0].file_type)}>
            <Video src={props.media[0].src} is_cencored={props.media[0].is_cencored} is_preview />
          </Match>
        </Switch>
        <div class="absolute top-1 right-1 flex items-center gap-2 px-2 py-1 bg-[rgba(0,0,0,0.8)] text-neutral-50 rounded-lg pointer-events-none">
          <span class="text-sm">{formatNumber(props.media.length)}</span>
          <Icons name="gallery" type_gallery={mediaType()} class="size-4 aspect-square shrink-0" />
        </div>
      </>
    );
  };

  onMount(() => {
    setIsNavigate(!/Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints === 0);
    const files = { pictures: 0, videos: 0 };
    props.media.map((media) => {
      if (MimeTypes.images.includes(media.file_type)) return files.pictures++;
      if (MimeTypes.videos.includes(media.file_type)) return files.videos++;
    });

    setMediaType(files.pictures > 0 && files.videos === 0 ? "picture" : files.pictures === 0 && files.videos > 0 ? "video" : "all");
  });

  return (
    <Switch>
      <Match when={isNavigate()}>
        <a href={`/post/${props._id}`} class="relative flex w-full aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
          <Media />
        </a>
      </Match>
      <Match when={!isNavigate()}>
        <button class="relative flex w-full aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden" onclick={onPriority}>
          <Media />
        </button>
      </Match>
    </Switch>
  );
};

export default PostPreviewCard;
