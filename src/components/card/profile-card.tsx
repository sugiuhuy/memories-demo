import { useMatch } from "@solidjs/router";
import { For, JSXElement, Match, ParentComponent, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ProfileInteraction from "~/components/common/profile-interaction";
import ProfileSuggestions from "~/components/common/profile-suggestions";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import ProfileOptionsPopup from "~/components/popup/profile-options-popup";
import ReportIssuePopup from "~/components/popup/report-issue-popup";
import HeaderContainer from "~/containers/header-container";
import PopupContainer from "~/containers/popup-container";
import { selectStore } from "~/stores/manage";
import { getProfileProps } from "~/types/user-interfaces";
import { formatNumber } from "~/utilities/formatter";
import transformContentPattern from "~/utilities/transform-content-pattern";
import ProfileRelationsPopup from "../popup/profile-relations.popup";

const Link = (props: { href: string; children: JSXElement }) => {
  const match = useMatch(() => props.href);

  return (
    <a
      href={props.href}
      class={`flex w-full justify-center p-2 border-b border-solid ${Boolean(match()) ? "text-blue-600 border-blue-600" : "border-transparent"}`}
    >
      {props.children}
    </a>
  );
};

const ProfileCard: ParentComponent<getProfileProps> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const [popup, setPopup] = createStore<{ is_open: boolean; target: "options" | "report" | "followers" | "following" }>({
    is_open: false,
    target: "options",
  });

  const onClosePopup = () => setPopup("is_open", false);
  const onSwitchPopup = (target: "options" | "report" | "followers" | "following") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  const navigators: { href: string; name: string }[] = [
    { href: "", name: "Memories" },
    { href: "/tagged", name: "Tagged" },
    { href: "/saved", name: "Saved" },
  ];

  return (
    <>
      <HeaderContainer class="flex md:hidden flex-col w-full">
        <div class="flex w-full p-2 gap-3 items-center">
          <button class="flex  group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
          </button>
          <div class="flex w-full gap-2 items-center">
            <Avatar {...props} class="size-12 max-md:size-11 aspect-square rounded-lg text-2xl" />
            <div class="flex w-full flex-col max-w-full overflow-hidden">
              <div class="flex items-center">
                <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
                  <a href={`/@${props.username}`} class="text-blue-600 active:text-blue-700 truncate no-underline">
                    {props.name}
                  </a>
                  <Show when={props.is_verified}>
                    <Tooltip text="Account is verified" class="flex ml-1">
                      <Icons name="verified" class="size-4 aspect-square shrink-0" />
                    </Tooltip>
                  </Show>
                </div>
              </div>
              <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
                <span class="truncate text-[var(--text-secondary-hover)] text-sm">
                  @{props.username} · {formatNumber(props.count_posts)} posts
                </span>
              </div>
            </div>
            <Switch>
              <Match when={auth()._id === props._id}>
                <a href="/account" class="flex text-[var(--text-secondary)] active:text-[var(--text-primary)] group/icon">
                  <Icons name="setting" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
                </a>
              </Match>
              <Match when={auth()._id !== props._id}>
                <button
                  class="flex text-[var(--text-secondary)] active:text-[var(--text-primary)] group/icon"
                  onclick={() => onSwitchPopup("options")}
                >
                  <Icons name="setting" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
                </button>
              </Match>
            </Switch>
          </div>
        </div>
      </HeaderContainer>
      <div class="flex flex-col w-full h-full items-center">
        <div class="flex w-full max-w-md gap-2 items-center p-2">
          <div class="flex w-full flex-col max-w-full overflow-hidden">
            <div class="flex items-center">
              <div class="inline-flex items-center whitespace-nowrap w-full max-w-full overflow-hidden">
                <span class="text-3xl max-md:text-2xl truncate">{props.name}</span>
                <Show when={props.is_verified}>
                  <Tooltip text="Account is verified" class="flex mt-1 ml-1">
                    <Icons name="verified" class="size-5 max-md:size-4 aspect-square shrink-0" />
                  </Tooltip>
                </Show>
              </div>
            </div>
            <div class="inline-flex items-center whitespace-nowrap overflow-hidden w-full max-w-full">
              <span class="truncate text-[var(--text-secondary-hover)] text-sm leading-5">@{props.username}</span>
            </div>
          </div>
          <Avatar {...props} class="flex size-24 max-md:size-16 aspect-square rounded-lg text-7xl max-md:text-5xl shrink-0" />
        </div>
        <Show when={props.bio.trim().length > 0}>
          <div class="inline w-full max-w-md whitespace-pre-line break-words p-2" innerHTML={transformContentPattern(props.bio)}></div>
        </Show>
        <div class="flex w-full max-w-md gap-10 justify-between items-center p-2">
          <div class="flex w-full gap-2">
            <span class="inline-block max-lg:hidden text-[var(--text-secondary)] select-none">{formatNumber(props.count_posts)} posts</span>
            <span class="max-lg:hidden text-[var(--text-secondary-hover)]">·</span>
            <button
              class="inline-block text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:text-[var(--text-primary)]"
              onclick={() => onSwitchPopup("followers")}
            >
              {formatNumber(props.count_followers)} followers
            </button>
            <span class="text-[var(--text-secondary-hover)]">·</span>
            <button
              class="inline-block text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:text-[var(--text-primary)]"
              onclick={() => onSwitchPopup("following")}
            >
              {formatNumber(props.count_following)} following
            </button>
          </div>
          <Switch>
            <Match when={auth()._id === props._id}>
              <a href="/account/edit" class="flex max-md:hidden text-[var(--text-secondary)] active:text-[var(--text-primary)] group/icon">
                <Icons name="setting" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
              </a>
            </Match>
            <Match when={auth()._id !== props._id}>
              <button
                class="flex max-md:hidden text-[var(--text-secondary)] active:text-[var(--text-primary)] group/icon"
                onclick={() => onSwitchPopup("options")}
              >
                <Icons name="setting" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
              </button>
            </Match>
          </Switch>
        </div>
        <Show when={auth()._id !== props._id}>
          <div class="flex w-full max-w-md gap-3 items-center p-2">
            <ProfileInteraction {...props} />
          </div>
        </Show>
        <Show when={props.is_show_suggestions && props.suggestions.length > 0}>
          <ProfileSuggestions {...props.suggestions} />
        </Show>
        <div class="flex flex-col w-full max-w-md h-full">
          <div class="md:sticky z-[2] top-0 left-0 flex w-full h-fit border-b border-solid border-[var(--border-primary)] backdrop-blur-xl bg-[var(--bg-primary)] max-md:bg-[var(--bg-transparent)] mb-2">
            <For each={navigators}>{(link) => <Link href={`/@${props.username}${link.href}`}>{link.name}</Link>}</For>
          </div>
          <div class="flex flex-col w-full h-full max-md:p-2">{props.children}</div>
        </div>
      </div>
      <PopupContainer is_open={popup.is_open}>
        <Switch>
          <Match when={popup.target === "followers" || popup.target === "following"}>
            <ProfileRelationsPopup
              {...props}
              relations={popup.target as "followers" | "following"}
              onClose={onClosePopup}
              onSwitchPopup={onSwitchPopup}
            />
          </Match>
          <Match when={popup.target === "options"}>
            <ProfileOptionsPopup {...props} onClose={onClosePopup} onSwitchPopup={onSwitchPopup} />
          </Match>
          <Match when={popup.target === "report"}>
            <ReportIssuePopup reporting={{ report_user: props._id }} onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default ProfileCard;
