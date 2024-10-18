import { Component, createEffect, createSignal, For, Match, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Spinner from "~/components/common/spinner";
import NavbarLinks from "~/components/navigation/navbar-links";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import UserCardContainer from "~/containers/user-card-container";
import { generatePosts } from "~/data/post-data";
import { generateSearchUsers } from "~/data/user-data";
import ViewPosts from "~/modules/view-posts";
import { mutateStore, selectStore } from "~/stores/manage";

const PageHome: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const posts = selectStore((store) => store.findPosts);
  const suggestions = selectStore((store) => store.userSuggestions);
  const mutate = mutateStore();

  const [ishavePosts, setIshavePosts] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(true);

  const onSubmitFollow = (payload: { _id: string; is_follow: boolean }) => {
    mutate(
      "userSuggestions",
      (states) => states._id === payload._id,
      produce((state) => {
        state.is_follow = !payload.is_follow;
      })
    );
  };

  onMount(() => {
    document.title = import.meta.env.VITE_TITLE;

    setTimeout(() => {
      mutate("findPosts", generatePosts({ count: 10 }));
      mutate("userSuggestions", generateSearchUsers({ count: 10, is_action: false, exclude: auth()._id }));

      setIsLoading(false);
    }, 1500);
  });

  createEffect(() => {
    if (posts().length) {
      const havePosts = posts().filter((p) => !p.is_ads).length;
      setIshavePosts(havePosts > 0);
    }
  });

  return (
    <div class="flex flex-col w-full h-full divide-y divide-solid divide-[var(--border-primary)]">
      <HeaderContainer class="flex md:hidden w-full p-2 items-center">
        <div class="flex w-full">
          <a href="/chat" class="group/icon p-2">
            <Icons name="paperPlane" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
          </a>
        </div>
        <a href="/" class="group/icon">
          <Icons name="logo" class="size-7 aspect-square shrink-0 group-active/icon:scale-95" />
        </a>
        <div class="flex w-full justify-end">
          <a href="/account" class="relative group/icon p-2">
            <Icons name="setting" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
            <Show when={auth().count_unread_messages > 0}>
              <span class="absolute top-0 right-0 flex size-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
                <span class="relative inline-flex rounded-full size-2 bg-rose-600"></span>
              </span>
            </Show>
          </a>
        </div>
      </HeaderContainer>
      <div class="flex w-full h-full p-2 gap-2">
        <div class="flex flex-col w-full items-center">
          <Switch>
            <Match when={isLoading()}>
              <div class="flex w-full h-full items-center justify-center">
                <Spinner />
              </div>
            </Match>
            <Match when={!isLoading()}>
              <Switch>
                <Match when={!ishavePosts()}>
                  <div class="flex flex-col w-full max-w-md h-full items-center justify-center">
                    <Icons name="gallery" type_gallery="all" class="size-32 aspect-square text-[var(--primary)]" />
                    <span class="text-[var(--text-secondary-hover)] select-none text-center">You haven't followed anyone yet</span>
                    <a href="/explore" class="flex w-fit py-2 px-4 bg-blue-600 active:bg-blue-700 text-neutral-50 rounded-lg mt-3">
                      Explore now!
                    </a>
                  </div>
                </Match>
                <Match when={ishavePosts()}>
                  <ViewPosts posts={posts()} limit={10} max_posts={100} />
                </Match>
              </Switch>
            </Match>
          </Switch>
        </div>
        <div class="flex max-lg:hidden flex-col w-full max-w-80 gap-4">
          <Switch>
            <Match when={isLoading()}>
              <div class="flex w-full h-full items-center justify-center">
                <Spinner />
              </div>
            </Match>
            <Match when={!isLoading()}>
              <For each={suggestions()}>
                {(user) => (
                  <UserCardContainer {...user} class="flex w-full gap-2 items-center" avatar_class="size-11 text-2xl">
                    <button
                      class={`flex h-fit py-1 px-2 rounded-lg disabled:cursor-not-allowed ${
                        user.is_follow
                          ? "outline outline-1 outline-[var(--border-primary)]"
                          : "bg-blue-600 active:bg-blue-700 text-neutral-50 disabled:bg-blue-950 disabled:text-neutral-500"
                      }`}
                      onclick={() => onSubmitFollow({ _id: user._id, is_follow: user.is_follow! })}
                    >
                      <Show when={user.is_follow} fallback={"Follow"}>
                        Following
                      </Show>
                    </button>
                  </UserCardContainer>
                )}
              </For>
            </Match>
          </Switch>
        </div>
      </div>
      <NavbarContainer class="flex md:hidden w-full">
        <NavbarLinks />
      </NavbarContainer>
    </div>
  );
};

export default PageHome;
