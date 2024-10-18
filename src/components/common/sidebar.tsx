import { useMatch } from "@solidjs/router";
import { Component, createEffect, createSignal, For, Index, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import CreatePost from "~/components/common/create-post";
import Logout from "~/components/common/logout";
import Avatar from "~/components/media/avatar";
import DropdownContainer from "~/containers/dropdown-container";
import { mutateStore, selectStore } from "~/stores/manage";
import { authProps } from "~/types/user-interfaces";

const Link: Component<{ href: string; icon?: "home" | "compass" | "notification" | "paperPlane"; user?: authProps; count: number }> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <a
      href={props.href}
      class="relative p-3 after:absolute after:-z-[1] after:top-0 after:left-0 after:content-[''] after:w-full after:h-full after:bg-[var(--bg-secondary)] after:rounded-lg after:scale-0 after:hover:scale-100 after:transition-transform group/navigator"
    >
      <Switch>
        <Match when={props.icon}>
          <Icons name={props.icon!} is_visited={Boolean(match())} class="size-6 aspect-square group-active/navigator:scale-95" />
        </Match>
        <Match when={props.user}>
          <Avatar {...props.user!} class="size-6 aspect-square group-active/navigator:scale-95 rounded-full text-xs" />
        </Match>
      </Switch>
      <Show when={props.count > 0}>
        <span class="absolute top-2 right-2 flex size-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
          <span class="relative inline-flex rounded-full size-2 bg-rose-600"></span>
        </span>
      </Show>
    </a>
  );
};

const Sidebar: Component<authProps> = (props) => {
  const theme = selectStore((store) => store.theme);
  const mutate = mutateStore();

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [tab, setTab] = createSignal<number>(0);
  const [isDarkMode, setIsDarkMode] = createSignal<boolean>(true);

  const links: { href: string; icon?: "home" | "compass" | "notification" | "paperPlane"; user?: authProps }[] = [
    { href: "/", icon: "home" },
    { href: "/explore", icon: "compass" },
    { href: "/chat", icon: "paperPlane" },
    { href: "/notifications", icon: "notification" },
    { href: `/@${props.username}`, user: props },
  ];

  const themes: { value: "dark" | "light" | "auto"; title: string }[] = [
    { value: "light", title: "Light" },
    { value: "dark", title: "Dark" },
    { value: "auto", title: "Auto" },
  ];

  createEffect(() => {
    if (isOpen()) {
      setTab(0);
    }
  });

  createEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";

    if (theme()) {
      setIsDarkMode(theme() === "auto" && systemTheme === "dark" ? true : theme() === "dark" ? true : false);
    }
  });

  return (
    <div class="sticky z-[99] top-0 left-0 bottom-0 hidden md:flex flex-col h-dvh p-2 gap-2 border-r border-solid border-[var(--border-primary)]">
      <a href="/" class="flex w-full py-2 justify-center group/navigator">
        <Icons
          name="logo"
          class="size-full max-w-8 max-h-8 aspect-square group-hover/navigator:scale-110 group-active/navigator:scale-105 transition-transform"
        />
      </a>
      <div class="flex flex-col h-full justify-center gap-2.5">
        <Index each={links}>
          {(item, index) => (
            <>
              <Show when={index === 4}>
                <CreatePost class="relative p-3 after:absolute after:-z-[1] after:top-0 after:left-0 after:content-[''] after:w-full after:h-full after:bg-[var(--bg-secondary)] after:rounded-lg after:scale-0 after:hover:scale-100 after:transition-transform group/navigator">
                  <Icons name="addNew" class="size-6 aspect-square group-active/navigator:scale-95" />
                </CreatePost>
              </Show>
              <Link
                {...item()}
                count={
                  item().icon === "notification" ? props.count_unread_notifications : item().icon === "paperPlane" ? props.count_unread_messages : 0
                }
              />
            </>
          )}
        </Index>
      </div>
      <DropdownContainer is_open={isOpen()} setIsOpen={setIsOpen}>
        <button
          class={`relative p-3 after:absolute after:-z-[1] after:top-0 after:left-0 after:content-[''] after:w-full after:h-full after:bg-[var(--bg-secondary)] after:rounded-lg after:scale-0 after:hover:scale-100 after:transition-transform group/navigator origin-bottom-left transition-[transform,opacity] ${
            isOpen() ? "scale-50 opacity-0 pointer-events-none" : "scale-100 opacity-100 pointer-events-auto"
          }`}
          onClick={() => setIsOpen(!isOpen())}
        >
          <Icons name="options" type_options="3 line" class="size-6 aspect-square group-active/navigator:scale-95" />
        </button>
        <div
          class={`absolute z-[1] bottom-0 left-0 flex flex-col w-64 bg-[var(--bg-secondary)] rounded-lg origin-bottom-left transition-[transform,opacity] border border-solid border-[var(--border-secondary)] ${
            isOpen() ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
          }`}
        >
          <Switch>
            <Match when={tab() === 0}>
              <div class="flex flex-col w-full p-2 gap-2 border-b border-solid border-[var(--border-secondary)]">
                <a
                  href="/account"
                  class="flex w-full p-2 gap-2.5 items-center hover:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed rounded-lg"
                >
                  <Icons name="setting" class="size-4 aspect-square shrink-0" />
                  <span>Settings</span>
                </a>
                <Show when={props.is_admin}>
                  <a
                    href={import.meta.env.VITE_Admin_URL}
                    class="flex w-full p-2 gap-2.5 items-center hover:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed rounded-lg"
                    target="_blank"
                  >
                    <Icons name="user" type_user="admin" class="size-4 aspect-square shrink-0" />
                    <span>Admin panel</span>
                  </a>
                </Show>
                <button
                  type="button"
                  class="flex w-full p-2 gap-2.5 items-center hover:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed rounded-lg"
                  onClick={() => setTab(1)}
                >
                  <Icons name="theme" is_dark_mode={isDarkMode()} class="size-4 aspect-square shrink-0" />
                  <span>Switch appearance</span>
                </button>
              </div>
              <div class="flex flex-col w-full p-2">
                <Logout class="flex w-full p-2 hover:bg-[var(--bg-secondary-hover)] disabled:cursor-not-allowed rounded-lg">Logout</Logout>
              </div>
            </Match>
            <Match when={tab() === 1}>
              <div class="flex w-full p-3 gap-4 items-center border-b border-solid border-[var(--border-secondary)]">
                <button type="button" class="size-4 aspect-square shrink-0 active:scale-95" onClick={() => setTab(0)}>
                  <Icons name="arrow" class="rotate-270" />
                </button>
                <span class="flex w-full">Switch appearance</span>
                <Icons name="theme" is_dark_mode={isDarkMode()} class="size-4 aspect-square shrink-0 mr-1" />
              </div>
              <div class="flex w-full p-3">
                <div class="flex w-full bg-[var(--bg-primary)] border border-solid border-[var(--border-secondary)] divide-x divide-solid divide-[var(--border-secondary)] rounded-lg overflow-hidden">
                  <For each={themes}>
                    {(item) => (
                      <button
                        class={`flex w-full p-2 justify-center items-center text-center ${
                          theme() === item.value ? "bg-[var(--bg-secondary)]" : "active:bg-[var(--bg-secondary)]"
                        }`}
                        onclick={() => {
                          mutate(
                            produce((state) => {
                              state.theme = item.value;
                            })
                          );
                        }}
                      >
                        <Show when={item.value !== "auto"} fallback={item.title}>
                          <Icons
                            name="theme"
                            is_dark_mode={item.value === "light" ? false : true}
                            class={`size-4 aspect-square ${
                              item.value === "light" ? "text-yellow-600 animate-theme-full-rotate" : "text-[var(--text-primary)] animate-theme-tilt"
                            }`}
                          />
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </DropdownContainer>
    </div>
  );
};

export default Sidebar;
