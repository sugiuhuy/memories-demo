import { Component, Match, Setter, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ReplyingCommentCard from "~/components/card/replying-comment-card";
import AuthorTooltip from "~/components/common/author-tooltip";
import CommentVoting from "~/components/common/comment-voting";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import CommentOptionsPopup from "~/components/popup/comment-options-popup";
import DeleteCommentPopup from "~/components/popup/delete-comment-popup";
import ReportIssuePopup from "~/components/popup/report-issue-popup";
import PopupContainer from "~/containers/popup-container";
import { commentPropsBase, getCommentProps } from "~/types/post-interfaces";
import { commentMoment } from "~/utilities/date-moment";
import transformContentPattern from "~/utilities/transform-content-pattern";

interface Props extends getCommentProps {
  setReplyingComment: Setter<commentPropsBase | null>;
  on_post: string;
}

const CommentCard: Component<Props> = (props) => {
  const [popup, setPopup] = createStore<{ isOpen: boolean; target: "delete" | "options" | "report" }>({ isOpen: false, target: "options" });

  const onClosePopup = () => setPopup("isOpen", false);
  const onSwitchPopup = (target: "delete" | "options" | "report") => {
    setPopup(
      produce((state) => {
        state.isOpen = true;
        state.target = target;
      })
    );
  };

  return (
    <>
      <div class="flex flex-col w-full gap-1">
        <Show when={props.replying}>
          <ReplyingCommentCard {...props.replying!} />
        </Show>
        <div class="z-[1] flex w-full gap-2">
          <div class="flex flex-col h-full items-center">
            <Avatar {...props.author} class="size-11 aspect-square rounded-lg text-3xl" />
          </div>
          <div class="flex flex-col w-full items-center gap-1">
            <div class="flex w-full">
              <div class="inline-flex w-full overflow-hidden">
                <div class="truncate">
                  <div class="inline-flex items-center p-0 m-0">
                    <AuthorTooltip {...props.author} />
                    <Show when={props.author.is_verified}>
                      <Tooltip text="Account is verified" class="flex items-center justify-center ml-1">
                        <Icons name="verified" class="size-4 aspect-square shrink-0" />
                      </Tooltip>
                    </Show>
                  </div>
                  <div class="inline whitespace-pre-line break-words ml-2" innerHTML={transformContentPattern(props.get_text)}></div>
                </div>
              </div>
            </div>
            <div class="flex w-full gap-4 items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-sm text-[var(--text-secondary-hover)]">{commentMoment(props.createdAt)}</span>
                <CommentVoting {...props} />
                <button class="size-4 shrink-0 text-[var(--text-secondary)] group/icon" onclick={() => props.setReplyingComment(props)}>
                  <Icons name="replying" class="size-4 aspect-square group-active/icon:scale-95" />
                </button>
              </div>
              <button class="size-4 shrink-0 text-[var(--text-secondary)] group/icon" onclick={() => onSwitchPopup("options")}>
                <Icons name="options" type_options="3 dot horizontal" class="size-4 aspect-square group-active/icon:scale-95" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <PopupContainer is_open={popup.isOpen}>
        <Switch>
          <Match when={popup.target === "delete"}>
            <DeleteCommentPopup _id={props._id} on_post={props.on_post} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "options"}>
            <CommentOptionsPopup {...props} onClose={onClosePopup} onSwitchPopup={onSwitchPopup} />
          </Match>
          <Match when={popup.target === "report"}>
            <ReportIssuePopup reporting={{ report_user: props.author._id }} onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default CommentCard;
