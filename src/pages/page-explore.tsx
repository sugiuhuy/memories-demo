import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import Icons from "~/assets/icons";
import Spinner from "~/components/common/spinner";
import InputSearch from "~/components/form/input-search";
import NavbarLinks from "~/components/navigation/navbar-links";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import { generatePosts } from "~/data/post-data";
import { generateSearchUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import ExploreUsers from "~/modules/explore-users";
import PostViewSwitcher from "~/modules/posts-view-switcher";
import { mutateStore, selectStore } from "~/stores/manage";
import { searchUsersProps } from "~/types/user-interfaces";

const PageExplore: Component = () => {
  const posts = selectStore((store) => store.findPosts);
  const users = selectStore((store) => store.searchUsers);
  const mutate = mutateStore();

  const [view, setView] = createSignal<"grid" | "flex">("grid");
  const [ishavePosts, setIshavePosts] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(true);
  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<searchUsersProps[]>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  onMount(() => {
    document.title = "Explore";

    setTimeout(() => {
      mutate("findPosts", generatePosts({ count: 10 }));
      mutate("searchUsers", generateSearchUsers({ count: 10, is_action: false }));
      setResultSearching(users());

      setIsLoading(false);
    }, 1500);
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
    mutate("searchUsers", []);
  });

  createEffect(() => {
    if (posts().length) {
      const havePosts = posts().filter((p) => !p.is_ads).length;
      setIshavePosts(havePosts > 0);
    }
  });

  createEffect(() => {
    setRegex(new RegExp(search().split("").join(".*"), "i"));
  });

  createEffect(() => {
    const _users = users().filter((item) => regex()!.test(item.name));
    setResultSearching(_users);
  });

  return (
    <div class="flex flex-col w-full h-full items-center divide-y divide-solid divide-[var(--border-primary)]">
      <HeaderContainer class="flex w-full md:max-w-md pl-3 md:py-2 md:px-0 pr-2 py-2 gap-3 items-center justify-center">
        <button
          class="flex md:hidden size-4 aspect-square group/navigator"
          onClick={() => {
            if (view() === "flex") return setView("grid");
            history.back();
          }}
        >
          <Icons name="arrow" class="rotate-270 group-active/navigator:scale-95" />
        </button>
        <InputSearch placeholder="Search user" onDebounced={debounced} have_border />
      </HeaderContainer>
      <div class="flex flex-col w-full md:max-w-md h-full items-center pt-2 max-md:p-2">
        <Switch>
          <Match when={search().trim().length === 0}>
            <Switch>
              <Match when={isLoading()}>
                <div class="flex w-full h-full items-center justify-center">
                  <Spinner />
                </div>
              </Match>
              <Match when={!isLoading()}>
                <Switch>
                  <Match when={!ishavePosts()}>
                    <div class="flex w-full h-full items-center justify-center">
                      <span class="text-sm text-[var(--text-secondary-hover)]">No posts found</span>
                    </div>
                  </Match>
                  <Match when={ishavePosts()}>
                    <PostViewSwitcher posts={posts()} view={view()} setView={setView} limit={10} max_posts={100} />
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </Match>
          <Match when={search().trim().length !== 0}>
            <Switch>
              <Match when={isLoading()}>
                <div class="flex w-full h-full items-center justify-center">
                  <Spinner />
                </div>
              </Match>
              <Match when={!isLoading()}>
                <Switch>
                  <Match when={resultSearching().length === 0}>
                    <div class="flex flex-col w-full h-full items-center justify-center">
                      <span class="text-sm text-[var(--text-secondary-hover)]">Search '{search()}'</span>
                      <span class="text-[var(--text-secondary)]">Not found</span>
                    </div>
                  </Match>
                  <Match when={resultSearching().length !== 0}>
                    <ExploreUsers users={resultSearching()} limit={10} max_users={userNames.length} />
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
      <NavbarContainer class="flex md:hidden w-full">
        <NavbarLinks />
      </NavbarContainer>
    </div>
  );
};

export default PageExplore;
