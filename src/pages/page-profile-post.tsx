import { Component, createEffect, createSignal, Match, onMount, Show, Switch } from "solid-js";
import Icons from "~/assets/icons";
import CreatePost from "~/components/common/create-post";
import Spinner from "~/components/common/spinner";
import { generatePosts } from "~/data/post-data";
import PostViewSwitcher from "~/modules/posts-view-switcher";
import { mutateStore, selectStore } from "~/stores/manage";

const Posts = (props: { _id: string; order: "own" | "saved" | "tagged"; max: number }) => {
  const auth = selectStore((store) => store.auth!);
  const posts = selectStore((store) => store.findPosts!);
  const mutate = mutateStore();

  const [view, setView] = createSignal<"grid" | "flex">("grid");
  const [ishavePosts, setIshavePosts] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(() => {
    if (props.max > 0) {
      setTimeout(() => {
        mutate("findPosts", generatePosts({ count: 10, author: props._id }));
        setIsLoading(false);
      }, 1500);
    }
  });

  createEffect(() => {
    if (posts().length) {
      const havePosts = posts().filter((p) => !p.is_ads).length;
      setIshavePosts(havePosts > 0);
    }
  });

  return (
    <Switch>
      <Match when={isLoading()}>
        <div class="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      </Match>
      <Match when={!isLoading()}>
        <Switch>
          <Match when={!ishavePosts() && props.order === "own"}>
            <Switch>
              <Match when={props._id === auth()._id}>
                <div class="flex flex-col w-full max-w-md h-full items-center justify-center">
                  <div class="flex flex-col w-full gap-2 items-center">
                    <Icons name="gallery" type_gallery="all" class="size-32 aspect-square text-[var(--text-secondary)]" />
                    <span class="text-[var(--text-secondary)] text-3xl text-center">Shared Memories</span>
                    <span class="text-[var(--text-secondary-hover)] text-center text-sm">
                      When you share memories, they will appear on your profile.
                    </span>
                    <CreatePost class="flex w-fit py-2 px-4 bg-blue-600 active:bg-blue-700 text-neutral-50 rounded-lg mt-3">
                      Shared you first post
                    </CreatePost>
                  </div>
                </div>
              </Match>
              <Match when={props._id !== auth()._id}>
                <div class="flex flex-col w-full max-w-md h-full items-center justify-center">
                  <span class="text-[var(--text-secondary-hover)] select-none text-center">Haven't shared any posts yet</span>
                </div>
              </Match>
            </Switch>
          </Match>
          <Match when={!ishavePosts() && (props.order === "tagged" || props.order === "saved")}>
            <div class="flex flex-col w-full max-w-md h-full items-center justify-center">
              <span class="text-[var(--text-secondary-hover)] select-none text-center">
                <Switch>
                  <Match when={props.order === "tagged"}>
                    <Show when={props._id === auth()._id} fallback={"No one has tagged him yet"}>
                      No one has tagged you yet
                    </Show>
                  </Match>
                  <Match when={props.order === "saved"}>
                    <Show when={props._id === auth()._id} fallback={"He hasn't saved any posts yet"}>
                      You haven't saved any posts
                    </Show>
                  </Match>
                </Switch>
              </span>
            </div>
          </Match>
          <Match when={ishavePosts()}>
            <PostViewSwitcher limit={10} max_posts={props.max} posts={posts()} setView={setView} view={view()} />
          </Match>
        </Switch>
      </Match>
    </Switch>
  );
};

export const PageProfileAllPosts: Component = () => {
  const profile = selectStore((store) => store.getProfile!);
  return <Posts _id={profile()._id} max={profile().count_posts} order="own" />;
};

export const PageProfileTaggedPosts: Component = () => {
  const profile = selectStore((store) => store.getProfile!);
  const randomCountPosts = Math.floor(Math.random() * 50);

  return <Posts _id={profile()._id} max={randomCountPosts} order="tagged" />;
};

export const PageProfileSavedPosts: Component = () => {
  const profile = selectStore((store) => store.getProfile!);
  const randomCountPosts = Math.floor(Math.random() * 50);

  return <Posts _id={profile()._id} max={randomCountPosts} order="saved" />;
};
