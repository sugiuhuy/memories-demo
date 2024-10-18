import { useMatch } from "@solidjs/router";
import { Component, Index, Match, Show, Switch } from "solid-js";
import Icons from "~/assets/icons";
import CreatePost from "~/components/common/create-post";
import Avatar from "~/components/media/avatar";
import { selectStore } from "~/stores/manage";
import { authProps } from "~/types/user-interfaces";

const Link = (props: { href: string; icon?: "home" | "compass" | "notification"; user?: authProps; count: number }) => {
  const match = useMatch(() => props.href);

  return (
    <a href={props.href} class="flex w-full py-4 px-2 items-center justify-center group/navigator">
      <div class="relative">
        <Switch>
          <Match when={props.icon}>
            <Icons name={props.icon!} is_visited={Boolean(match())} class="size-6 aspect-square group-active/navigator:scale-95" />
          </Match>
          <Match when={props.user}>
            <Avatar {...props.user!} class="size-6 aspect-square group-active/navigator:scale-95 rounded-full text-xs" />
          </Match>
        </Switch>
        <Show when={props.count > 0}>
          <span class="absolute top-0 right-0 flex size-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
            <span class="relative inline-flex rounded-full size-2 bg-rose-600"></span>
          </span>
        </Show>
      </div>
    </a>
  );
};

const NavbarLinks: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const links: { href: string; icon?: "home" | "compass" | "notification"; user?: authProps }[] = [
    { href: "/", icon: "home" },
    { href: "/explore", icon: "compass" },
    { href: "/notifications", icon: "notification" },
    { href: auth() ? `/@${auth().username}` : "#", user: auth() },
  ];

  return (
    <Index each={links}>
      {(item, index) => (
        <>
          <Show when={index === 2}>
            <CreatePost class="flex w-full py-4 px-2 items-center justify-center group/navigator">
              <Icons name="addNew" class="size-6 aspect-square group-active/navigator:scale-95" />
            </CreatePost>
          </Show>
          <Link {...item()} count={item().icon === "notification" ? auth().count_unread_notifications : 0} />
        </>
      )}
    </Index>
  );
};

export default NavbarLinks;
