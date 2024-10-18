import { Component, onCleanup, onMount, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ChangeAvatar from "~/components/common/change-avatar";
import Tooltip from "~/components/common/tooltip";
import Switcher from "~/components/form/switcher";
import Avatar from "~/components/media/avatar";
import { pattern } from "~/configurations/pattern-config";
import SettingContainer from "~/containers/setting-container";
import { mutateStore, selectStore } from "~/stores/manage";

const PageEditProfile: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const [value, setValue] = createStore<{ username: string; name: string; bio: string; is_show_suggestions: boolean }>({
    bio: "",
    name: "",
    username: "",
    is_show_suggestions: false,
  });

  const onAppendToast = (payload: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, ...payload });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const onSubmitChangeUsername = (e: Event) => {
    e.preventDefault();
    const messages = [
      "Your username only allowed changed 5 times",
      "Please enter your new username",
      "Please enter your new username at least 5 alphanumberic",
      "Username only accept 15 length of alphanumberic",
      "Username only accept alphanumberic",
    ];
    if (
      auth().count_username_changed >= 5 ||
      !value.username.trim().length ||
      value.username.trim().length < 5 ||
      value.username.trim().length > 15 ||
      !value.username.match(pattern.alphanumeric)
    ) {
      return onAppendToast({
        status: "warning",
        message:
          messages[
            !value.username.trim().length
              ? 1
              : value.username.trim().length < 5
              ? 2
              : value.username.trim().length > 15
              ? 3
              : !value.username.match(pattern.alphanumeric)
              ? 4
              : 0
          ],
      });
    }

    mutate(
      "auth",
      produce((state) => {
        state!.username = value.username;
        state!.count_username_changed++;
      })
    );
    onAppendToast({ status: "success", message: "Username has been changed" });
  };

  const onSubmitEditProfile = (e: Event) => {
    e.preventDefault();
    const messages = [
      "Please enter your name",
      "Please enter your name at least 4 characters",
      "Your name must be max 30 characters",
      "Your bio must be max 150 characters",
    ];

    if (
      !value.name.trim().length ||
      value.name.trim().length < 4 ||
      value.name.trim().length > 30 ||
      (value.bio.trim().length > 0 && value.bio.trim().length > 150)
    ) {
      return onAppendToast({
        status: "warning",
        message:
          messages[
            value.name.trim().length < 4
              ? 1
              : value.name.trim().length > 30
              ? 2
              : value.bio.trim().length > 0 && value.bio.trim().length > 150
              ? 3
              : 0
          ],
      });
    }

    mutate(
      "auth",
      produce((state) => {
        state!.bio = value.bio;
        state!.name = value.name;
        state!.is_show_suggestions = value.is_show_suggestions;
      })
    );
    onAppendToast({ status: "success", message: "Profile has been updated" });
  };

  const onInputValue = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setValue(
      produce((state: any) => {
        state[target.name as keyof typeof value] = target.value;
      })
    );
  };

  onMount(() => {
    document.title = "Edit profile";
    setValue({ bio: auth().bio, name: auth().name, username: auth().username, is_show_suggestions: auth().is_show_suggestions });
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Edit profile" class="flex flex-col w-full h-full gap-5">
      <div class="flex w-full justify-between items-center gap-2 p-2 outline outline-1 outline-[var(--border-primary)] rounded-lg">
        <Avatar {...auth()} class="size-12 text-4xl" />
        <div class="flex w-full flex-col max-w-full overflow-hidden">
          <div class="flex items-center">
            <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
              <span class="truncate">{auth().name}</span>
              <Show when={auth().is_verified}>
                <Tooltip text="Account is verified" class="flex ml-1">
                  <Icons name="verified" class="size-4 aspect-square shrink-0" />
                </Tooltip>
              </Show>
            </div>
          </div>
          <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
            <span class="truncate max-md:hidden text-[var(--text-secondary-hover)] text-sm">@{auth().username}</span>
            <ChangeAvatar class="truncate md:hidden text-blue-600 active:text-blue-700 text-sm cursor-pointer">Change avatar</ChangeAvatar>
          </div>
        </div>
        <ChangeAvatar class="max-md:hidden p-2 bg-blue-600 active:bg-blue-700 text-neutral-50 rounded-lg text-sm shrink-0 cursor-pointer">
          Change avatar
        </ChangeAvatar>
      </div>
      <form onsubmit={onSubmitChangeUsername} class="flex flex-col w-full p-2 gap-2 outline outline-1 outline-[var(--border-primary)] rounded-lg">
        <span class="text-xl">Username</span>
        <span class="text-sm text-[var(--text-secondary)]">You can change your username only 5 times</span>
        <input
          type="text"
          name="username"
          value={value.username}
          oninput={onInputValue}
          class="flex w-full p-2 bg-[var(--bg-secondary)] rounded-lg outline outline-1 outline-[var(--border-secondary)] focus:outline-blue-600 disabled:cursor-not-allowed"
          autocomplete="off"
          disabled={auth().count_username_changed >= 5}
        />
        <div class="flex w-full justify-end">
          <button
            class="w-1/2 p-2 bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg"
            disabled={!value.username.trim().length || value.username === auth().username || auth().count_username_changed >= 5}
          >
            Save
          </button>
        </div>
      </form>
      <form onsubmit={onSubmitEditProfile} class="flex flex-col w-full p-2 gap-3 outline outline-1 outline-[var(--border-primary)] rounded-lg">
        <div class="flex w-full flex-col max-w-full overflow-hidden">
          <div class="flex items-center">
            <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
              <span class="truncate text-xl">{auth().name}</span>
              <Show when={auth().is_verified}>
                <Tooltip text="Account is verified" class="flex ml-1">
                  <Icons name="verified" class="size-4 aspect-square shrink-0" />
                </Tooltip>
              </Show>
            </div>
          </div>
          <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
            <span class="truncate text-[var(--text-secondary-hover)] text-sm">@{auth().username}</span>
          </div>
        </div>
        <div class="flex flex-col w-full gap-2">
          <span class="text-lg">Display name</span>
          <input
            type="text"
            name="name"
            value={value.name}
            oninput={onInputValue}
            class="flex w-full p-2 bg-[var(--bg-secondary)] rounded-lg outline outline-1 outline-[var(--border-secondary)] focus:outline-blue-600 disabled:cursor-not-allowed"
            autocomplete="off"
            max={30}
          />
        </div>
        <div class="flex flex-col w-full gap-2">
          <span class="text-lg">Bio</span>
          <textarea
            name="bio"
            value={value.bio}
            oninput={onInputValue}
            class="flex w-full h-48 p-2 bg-[var(--bg-secondary)] rounded-lg outline outline-1 outline-[var(--border-secondary)] focus:outline-blue-600 disabled:cursor-not-allowed"
            maxlength={150}
          />
        </div>
        <div class="flex w-full p-3 gap-4 items-center bg-[var(--bg-secondary)] outline outline-1 outline-[var(--border-secondary)] rounded-lg">
          <div class="flex flex-col w-full">
            <span class="inline-block text-sm">Show account suggestions on profiles</span>
            <span class="inline-block text-xs text-[var(--text-secondary)]">show suggestions for accounts you have followed.</span>
          </div>
          <Switcher name="is_show_suggestions" value={value} setValue={setValue} />
        </div>
        <div class="flex w-full justify-end">
          <button
            class="w-1/2 p-2 bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg"
            disabled={
              !value.name.trim().length ||
              (value.name === auth().name && value.bio === auth().bio && value.is_show_suggestions === auth().is_show_suggestions)
            }
          >
            Save
          </button>
        </div>
      </form>
    </SettingContainer>
  );
};

export default PageEditProfile;
