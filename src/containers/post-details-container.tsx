import { useParams } from "@solidjs/router";
import { Match, onMount, ParentComponent, Setter, Show, splitProps, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import PostContentCard from "~/components/card/post-content-card";
import AuthorTooltip from "~/components/common/author-tooltip";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import DeletePostPopup from "~/components/popup/delete-post-popup";
import EditPostPopup from "~/components/popup/edit-post-popup";
import PostOptionPopup from "~/components/popup/post-options-popup";
import ReportIssuePopup from "~/components/popup/report-issue-popup";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import PopupContainer from "~/containers/popup-container";
import ManageComment from "~/modules/manage-comment";
import { commentPropsBase, getPostProps } from "~/types/post-interfaces";
import { postMoment } from "~/utilities/date-moment";

interface Props extends getPostProps {
  replying_comment: commentPropsBase | null;
  setReplyingComment: Setter<commentPropsBase | null>;
}

const PostDetailsContainer: ParentComponent<Props> = (props) => {
  const [_other, _commentProps, _props] = splitProps(props, ["children"], ["setReplyingComment", "replying_comment"]);
  const params: { post: string } = useParams();

  const [popup, setPopup] = createStore<{ is_open: boolean; target: "delete" | "edit" | "options" | "report" }>({ is_open: false, target: "delete" });
  const [value, setValue] = createStore<{ post_id: string; replying: string | null; get_html: string; get_text: string }>({
    post_id: "",
    replying: null,
    get_html: "",
    get_text: "",
  });

  const onClosePopup = () => setPopup("is_open", false);
  const onSwitchPopup = (target: "delete" | "edit" | "options" | "report") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  onMount(() => {
    setValue("post_id", params.post);
  });

  return (
    <>
      <div class="flex flex-col w-full md:max-w-96 h-full md:overflow-hidden divide-y divide-solid divide-[var(--border-primary)]">
        <HeaderContainer class="flex w-full p-2 gap-3 items-center">
          <button class="flex md:hidden group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
          </button>
          <div class="flex w-full gap-2 items-center">
            <Avatar {..._props.author} class="size-12 max-md:size-11 aspect-square rounded-lg text-3xl max-md:text-2xl" />
            <div class="flex w-full flex-col max-w-full overflow-hidden">
              <div class="flex items-center">
                <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                  <AuthorTooltip {..._props.author} />
                  <Show when={_props.author.is_verified}>
                    <Tooltip text="Account is verified" class="flex ml-1">
                      <Icons name="verified" class="size-4 aspect-square shrink-0" />
                    </Tooltip>
                  </Show>
                </div>
              </div>
              <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
                <span class="truncate text-[var(--text-secondary-hover)] text-sm">
                  @{_props.author.username} · {postMoment(_props.createdAt)}
                </span>
              </div>
            </div>
            <button class="flex shrink-0 group/icon" onclick={() => onSwitchPopup("options")}>
              <Icons name="options" type_options="3 dot horizontal" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
            </button>
          </div>
        </HeaderContainer>
        <div class="flex w-full h-full md:overflow-hidden">
          <div class="flex flex-col w-full h-full p-2 gap-2 md:overflow-y-auto md:overflow-x-hidden">
            <PostContentCard {...props} is_no_truncate />
            {_other.children}
          </div>
        </div>
        <NavbarContainer class="flex flex-col w-full pt-2 max-md:py-2 max-md:px-3 gap-1">
          <ManageComment {..._commentProps} value={value} setValue={setValue} />
        </NavbarContainer>
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

export default PostDetailsContainer;
