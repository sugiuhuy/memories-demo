import { RouteSectionProps, useMatch } from "@solidjs/router";
import { Component, For, Index, JSXElement, ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import Logout from "~/components/common/logout";
import NavbarLinks from "~/components/navigation/navbar-links";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import { selectStore } from "~/stores/manage";

const Link: ParentComponent<{ href: string; target?: string }> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <a
      href={props.href}
      class={`flex items-center w-full no-underline p-4 gap-3 ${
        Boolean(match()) ? "bg-[var(--bg-primary-hover)]" : "hover:bg-[var(--bg-primary-hover)] active:bg-[var(--bg-primary-hover)]"
      }`}
      target={props.target}
    >
      {props.children}
    </a>
  );
};

const AccountSettingContainer: Component<RouteSectionProps> = (props) => {
  const match = useMatch(() => "/account");
  const auth = selectStore((store) => store.auth!);
  const appearUrls = selectStore((store) => store.appear_urls);

  const navigators: { name: string; links: { href: string; target?: string; children: JSXElement }[] }[] = [
    {
      name: "Configuration your account",
      links: [
        {
          href: "/account/edit",
          children: (
            <>
              <Icons name="user" type_user="circle" class="size-5 aspect-square shrink-0" />
              <span>Edit account</span>
            </>
          ),
        },
        {
          href: "/account/password",
          children: (
            <>
              <Icons name="shield" type_shield="password" class="size-5 aspect-square shrink-0" />
              <span>Change password</span>
            </>
          ),
        },
        {
          href: "/account/privacy",
          children: (
            <>
              <Icons name="globe" class="size-5 aspect-square shrink-0" />
              <span>Privacy</span>
            </>
          ),
        },
      ],
    },
    {
      name: "How others can interact with you",
      links: [
        {
          href: "/account/manage/block",
          children: (
            <>
              <Icons name="user" type_user="block" class="size-5 aspect-square shrink-0" />
              <span>Blocked accounts</span>
            </>
          ),
        },
        {
          href: "/account/manage/mute",
          children: (
            <>
              <Icons name="personalize" is_active={false} class="size-5 aspect-square shrink-0" />
              <span>Muted accounts</span>
            </>
          ),
        },
        {
          href: "/account/manage/personalize",
          children: (
            <>
              <Icons name="personalize" is_active={true} class="size-5 aspect-square shrink-0" />
              <span>Personalizations</span>
            </>
          ),
        },
        {
          href: "/account/manage/push_notifications",
          children: (
            <>
              <Icons name="notification" class="size-5 aspect-square shrink-0" />
              <span>Push notifications</span>
            </>
          ),
        },
        {
          href: "/account/manage/tags_mentions",
          children: (
            <>
              <Icons name="mention" class="size-5 aspect-square shrink-0" />
              <span>Tags and mentions</span>
            </>
          ),
        },
      ],
    },
    {
      name: "Reaction",
      links: [
        {
          href: "/account/collections",
          children: (
            <>
              <Icons name="gallery" type_gallery="collections" class="size-5 aspect-square shrink-0" />
              <span>Collection</span>
            </>
          ),
        },
      ],
    },
    {
      name: "More info and support",
      links: [
        {
          href: "/account/verifying",
          children: (
            <>
              <Icons name="user" type_user="following" is_dark_mode class="size-5 aspect-square shrink-0" />
              <span>Verifying account</span>
            </>
          ),
        },
        {
          href: "/account/switch_appearance",
          children: (
            <>
              <Icons name="theme" is_dark_mode class="size-5 aspect-square shrink-0" />
              <span>Switch appearance</span>
            </>
          ),
        },
        {
          href: "/",
          children: (
            <>
              <Icons name="advertisement" class="size-5 aspect-square shrink-0" />
              <span>Advertisement</span>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div class="flex w-full h-full divide-x divide-solid divide-[var(--border-primary)]">
      <div
        class={`md:sticky top-0 flex-col w-full md:max-w-60 h-full md:h-dvh md:overflow-hidden divide-y divide-solid divide-[var(--border-primary)] ${
          Boolean(match()) ? "flex" : "flex max-md:hidden"
        }`}
      >
        <HeaderContainer class="flex md:hidden w-full items-center p-3">
          <button class="flex  group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
          </button>
          <span class="w-full text-center">Setting</span>
          <div class="size-5 aspect-square"></div>
        </HeaderContainer>
        <div class="flex flex-col w-full h-full md:overflow-x-hidden md:overflow-y-scroll">
          <For each={navigators}>
            {(item) => (
              <div class="flex flex-col w-full">
                <span class="flex w-full px-4 pt-3 pb-1.5 text-xs text-[var(--text-secondary-hover)]">{item.name}</span>
                <Index each={item.links}>
                  {(link, index) => (
                    <>
                      <Show when={item.name === "More info and support" && index === 1 && auth().is_admin}>
                        <Link href={import.meta.env.VITE_Admin_URL} target="_blank">
                          <Icons name="user" type_user="admin" class="size-5 aspect-square shrink-0" />
                          Admin panel
                        </Link>
                      </Show>
                      <Link href={link().href} target={link().target}>
                        {link().children}
                      </Link>
                    </>
                  )}
                </Index>
                <Show when={item.name === "More info and support"}>
                  <For each={appearUrls()}>
                    {(exLink) => (
                      <Show when={exLink.appear_on.client_settings}>
                        <Link href={exLink.url} target="_blank">
                          <span class="w-full">{exLink.title}</span>
                          <Icons name="link" type_link="blank" class="size-5 aspect-square shrink-0" />
                        </Link>
                      </Show>
                    )}
                  </For>
                </Show>
              </div>
            )}
          </For>
          <div class="flex md:hidden w-full border-t border-solid border-[var(--border-primary)] p-2">
            <Logout class="flex w-full p-2 bg-red-600 active:bg-red-700 disabled:cursor-not-allowed rounded-lg">Logout</Logout>
          </div>
        </div>
        <NavbarContainer class="flex md:hidden w-full">
          <NavbarLinks />
        </NavbarContainer>
      </div>
      <div
        class={`flex flex-col w-full h-full items-center divide-y divide-solid divide-[var(--border-primary)] ${
          Boolean(match()) ? "flex max-md:hidden" : "flex"
        }`}
      >
        {props.children}
        <NavbarContainer class="flex md:hidden w-full">
          <NavbarLinks />
        </NavbarContainer>
      </div>
    </div>
  );
};

export default AccountSettingContainer;
