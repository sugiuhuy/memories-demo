import { Component, For, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import AdsPostCard from "~/components/card/ads-post-card";
import PostCard from "~/components/card/post-card";
import FetchNextPage from "~/components/common/fetch-next-page";
import { generatePosts } from "~/data/post-data";
import { mutateStore } from "~/stores/manage";
import { findPostsProps } from "~/types/post-interfaces";

interface Props {
  limit: number;
  max_posts: number;
  posts: findPostsProps;
}

const ViewPosts: Component<Props> = (props) => {
  const mutate = mutateStore();

  const onGeneratePosts = (count: number) => {
    const data = generatePosts({ count });
    data.map((item) => {
      mutate(
        "findPosts",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  return (
    <>
      <div class="flex flex-col w-full max-w-md gap-2 divide-y divide-solid divide-[var(--border-primary)]">
        <For each={props.posts}>
          {(post) => (
            <Switch>
              <Match when={post.is_ads}>
                <AdsPostCard {...(post as any)} />
              </Match>
              <Match when={!post.is_ads}>
                <PostCard {...post} />
              </Match>
            </Switch>
          )}
        </For>
      </div>
      <Show when={props.posts.length >= props.limit}>
        <FetchNextPage count={props.posts.length} limit={props.limit} max={props.max_posts} onGenerate={onGeneratePosts} />
      </Show>
    </>
  );
};

export default ViewPosts;
