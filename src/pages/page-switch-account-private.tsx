import { Component, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Switcher from "~/components/form/switcher";
import SettingContainer from "~/containers/setting-container";
import { mutateStore, selectStore } from "~/stores/manage";

const PageSwitchAccountPrivate: Component = () => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const [value, setValue] = createStore<{ is_private: boolean }>({ is_private: false });

  const onSubmitAccountPrivacy = (e: Event) => {
    e.preventDefault();
    mutate(
      "auth",
      produce((state) => {
        state!.is_private = !auth().is_private;
      })
    );
  };

  onMount(() => {
    document.title = "Account privacy";
    setValue("is_private", auth().is_private);
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Account privacy" class="flex flex-col w-full h-full">
      <form
        onsubmit={onSubmitAccountPrivacy}
        class="flex w-full items-center max-lg:p-2 lg:p-3 lg:border border-solid border-[var(--border-primary)] rounded-lg gap-2"
      >
        <div class="flex flex-col w-full">
          <span class="text-md">Private account</span>
          <div class="flex flex-col w-full">
            <span class="text-xs text-[var(--text-secondary)]">
              When your account is public, Anyone can see your profile, memories and comments, including mentions and tags in photos and videos
            </span>
            <span class="text-xs text-[var(--text-secondary)]">
              When your account is private, Only someone who follows you can see your profile, memories and comments, including mentions and tags in
              photos and videos
            </span>
          </div>
        </div>
        <Switcher name="is_private" value={value} setValue={setValue} is_submit />
      </form>
    </SettingContainer>
  );
};

export default PageSwitchAccountPrivate;
