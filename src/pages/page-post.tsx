import { useParams } from "@solidjs/router";
import { Component, createSignal, Match, onCleanup, Switch } from "solid-js";
import Icons from "~/assets/icons";
import PostMediaCard from "~/components/card/post-media-card";
import Spinner from "~/components/common/spinner";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import PostCommentsContainer from "~/containers/post-comments-container";
import PostDetailsContainer from "~/containers/post-details-container";
import { selectStore } from "~/stores/manage";
import { commentPropsBase } from "~/types/post-interfaces";

const PagePost: Component = () => {
  const params: { post: string; comment: string } = useParams();

  const post = selectStore((store) => store.findPosts.find((p) => p._id === params.post)!);
  const [replyingComment, setReplyingComment] = createSignal<commentPropsBase | null>(null);

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <Switch>
      <Match when={!post()}>
        <div class="flex flex-col w-full h-full divide-y divide-solid divide-[var(--border-primary)]">
          <HeaderContainer class="flex md:hidden w-full p-2 gap-3 items-center">
            <button class="flex group/navigator" onClick={() => history.back()}>
              <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
            </button>
            <div class="flex w-full gap-3 items-center animate-pulse">
              <div class="flex size-12 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
              <div class="flex flex-col w-full gap-2">
                <div class="flex w-3/4 h-4 bg-[var(--bg-secondary)]"></div>
                <div class="flex w-1/2 h-4 bg-[var(--bg-secondary)]"></div>
              </div>
              <div class="flex size-7 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-full"></div>
            </div>
          </HeaderContainer>
          <div class="flex w-full h-full items-center justify-center p-2">
            <Spinner />
          </div>
          <NavbarContainer class="flex md:hidden w-full p-2 gap-2 animate-pulse">
            <div class="flex size-8 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
            <div class="flex w-full h-8 bg-[var(--bg-secondary)] rounded-lg"></div>
            <div class="flex size-8 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-lg"></div>
          </NavbarContainer>
        </div>
      </Match>
      <Match when={post()}>
        <div class="flex w-full h-full items-center justify-center md:p-2">
          <div class="flex w-full h-[540px] max-md:h-full gap-2 justify-center">
            <PostMediaCard media={post().media} class="flex max-md:hidden w-full max-w-md h-full" />
            <PostDetailsContainer {...post()} replying_comment={replyingComment()} setReplyingComment={setReplyingComment}>
              <PostCommentsContainer
                post_id={params.post}
                comment_id={params.comment}
                count_comments={post().count_comments}
                setReplyingComment={setReplyingComment}
              />
            </PostDetailsContainer>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default PagePost;
