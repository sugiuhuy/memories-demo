import { RouteSectionProps, useParams } from "@solidjs/router";
import { Component, createEffect, createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import Icons from "~/assets/icons";
import ProfileCard from "~/components/card/profile-card";
import Spinner from "~/components/common/spinner";
import NavbarLinks from "~/components/navigation/navbar-links";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import { generateProfile } from "~/data/user-data";
import { mutateStore, selectStore } from "~/stores/manage";

const ProfileContainer: Component<RouteSectionProps> = (props) => {
  const params: { username: string } = useParams();

  const profile = selectStore((store) => store.getProfile!);
  const mutate = mutateStore();
  const [isWaiting, setIsWaiting] = createSignal<boolean>(false);

  onMount(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
    mutate("getProfile", null);
  });

  createEffect(() => {
    if (params.username) {
      setIsWaiting(true);

      setTimeout(() => {
        mutate("getProfile", null);
        mutate("getProfile", generateProfile({ username: params.username.replace("@", ""), count_suggestions: 10 }));
        setIsWaiting(false);
      }, 1500);
    }
  });

  return (
    <div class="flex flex-col w-full h-full divide-y divide-solid divide-[var(--border-primary)]">
      <Switch>
        <Match when={isWaiting() || !profile()}>
          <HeaderContainer class="flex md:hidden w-full p-2 gap-3 items-center">
            <button class="flex  group/navigator" onClick={() => history.back()}>
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
          <div class="flex flex-col w-full h-full p-2 gap-2 items-center animate-pulse">
            <div class="flex w-full max-w-md gap-2 items-center">
              <div class="flex w-full flex-col max-w-full overflow-hidden">
                <div class="flex items-center">
                  <div class="inline-flex items-center whitespace-nowrap w-full max-w-full overflow-hidden">
                    <span class="text-3xl truncate w-3/4 h-7 bg-[var(--bg-secondary)]"></span>
                    <span class="flex ml-1 size-5 aspect-square bg-[var(--bg-secondary)] rounded-full shrink-0"></span>
                  </div>
                </div>
                <div class="inline-flex mt-1 items-center whitespace-nowrap overflow-hidden w-full max-w-full">
                  <span class="truncate w-1/2 h-4 text-[var(--text-secondary-hover)] text-sm leading-5 bg-[var(--bg-secondary)]"></span>
                </div>
              </div>
              <div class="flex size-24 max-md:size-16 aspect-square bg-[var(--bg-secondary)] rounded-lg shrink-0"></div>
            </div>
            <div class="inline w-full max-w-md whitespace-pre-line break-words h-6 bg-[var(--bg-secondary)] mt-2"></div>
            <div class="flex w-full max-w-md gap-10 justify-between items-center mt-2">
              <div class="flex w-full gap-3">
                <span class="inline-block w-full h-4 bg-[var(--bg-secondary)]"></span>
                <span class="inline-block w-full h-4 bg-[var(--bg-secondary)]"></span>
              </div>
              <div class="size-8 aspect-square shrink-0 bg-[var(--bg-secondary)] rounded-full"></div>
            </div>
            <div class="flex w-full max-w-md gap-3 mt-2">
              <div class="flex w-full h-10 bg-[var(--bg-secondary)] rounded-lg"></div>
              <div class="flex size-10 aspect-square bg-[var(--bg-secondary)] rounded-lg shrink-0"></div>
              <div class="flex size-10 aspect-square bg-[var(--bg-secondary)] rounded-lg shrink-0"></div>
            </div>
            <div class="flex w-full max-w-md h-full items-center justify-center mt-2">
              <Spinner />
            </div>
          </div>
        </Match>
        <Match when={!isWaiting() || profile()}>
          <ProfileCard {...profile()}>{props.children}</ProfileCard>
        </Match>
      </Switch>
      <NavbarContainer class="flex md:hidden w-full">
        <NavbarLinks />
      </NavbarContainer>
    </div>
  );
};

export default ProfileContainer;
