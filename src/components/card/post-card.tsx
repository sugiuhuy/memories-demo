import { Component, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import PostContentCard from "~/components/card/post-content-card";
import PostMediaCard from "~/components/card/post-media-card";
import AuthorTooltip from "~/components/common/author-tooltip";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import DeletePostPopup from "~/components/popup/delete-post-popup";
import EditPostPopup from "~/components/popup/edit-post-popup";
import PostOptionPopup from "~/components/popup/post-options-popup";
import ReportIssuePopup from "~/components/popup/report-issue-popup";
import PopupContainer from "~/containers/popup-container";
import { getPostProps } from "~/types/post-interfaces";

const PostCard: Component<getPostProps> = (props) => {
  const [popup, setPopup] = createStore<{ is_open: boolean; target: "delete" | "edit" | "options" | "report" }>({ is_open: false, target: "delete" });

  const onClosePopup = () => setPopup("is_open", false);
  const onSwitchPopup = (target: "delete" | "edit" | "options" | "report") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  return (
    <>
      <div class="flex flex-col w-full max-w-md gap-2 pt-2 first:pt-0">
        <div class="flex w-full gap-2 items-center">
          <Avatar {...props.author} class="size-12 max-md:size-11 aspect-square rounded-lg text-3xl max-md:text-2xl" />
          <div class="flex w-full flex-col max-w-full overflow-hidden">
            <div class="flex items-center">
              <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                <AuthorTooltip {...props.author} />
                <Show when={props.author.is_verified}>
                  <Tooltip text="Account is verified" class="flex ml-1">
                    <Icons name="verified" class="size-4 aspect-square shrink-0" />
                  </Tooltip>
                </Show>
              </div>
            </div>
            <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
              <span class="truncate text-[var(--text-secondary-hover)] text-sm">@{props.author.username}</span>
            </div>
          </div>
          <button class="flex shrink-0 group/icon" onclick={() => onSwitchPopup("options")}>
            <Icons name="options" type_options="3 dot horizontal" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
          </button>
        </div>
        <PostMediaCard media={props.media} class="flex w-full h-[450px] md:h-[525px] justify-center" />
        <PostContentCard {...props} />
      </div>
      <PopupContainer is_open={popup.is_open}>
        <Switch>
          <Match when={popup.target === "delete"}>
            <DeletePostPopup _id={props._id} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "edit"}>
            <EditPostPopup {...props} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "options"}>
            <PostOptionPopup {...props} onSwitchPopup={onSwitchPopup} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "report"}>
            <ReportIssuePopup reporting={{ report_post: props._id }} onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default PostCard;
