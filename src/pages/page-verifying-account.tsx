import { Component, Match, onCleanup, onMount, Switch } from "solid-js";
import SettingContainer from "~/containers/setting-container";
import { mutateStore, selectStore } from "~/stores/manage";

const PageVerifyingAccount: Component = () => {
  const mutate = mutateStore();
  const auth = selectStore((store) => store.auth!);

  onMount(() => {
    document.title = "Verifying account";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Verifying account" class="flex flex-col w-full h-full">
      <Switch>
        <Match when={auth().is_verified}>
          <div class="flex w-full h-full items-center justify-center">
            <span class="text-sm text-[var(--text-secondary-hover)]">Your account has been verified</span>
          </div>
        </Match>
        <Match when={!auth().is_verified}>
          <Switch>
            <Match when={auth().have_request_verified}>
              <div class="flex flex-col w-full h-full">
                <span class="text-2xl">You're on the waitlist!</span>
                <span>
                  The countdown begins for a verified badge, enchanced support, impersonation protection and even more ways to grow your brand.
                </span>
                <span class="mt-5">We are checking your account and previewing it</span>
                <span class="text-sm text-[var(--text-secondary-hover)]">*Notifications will be sent to your email</span>
              </div>
            </Match>
            <Match when={!auth().have_request_verified}>
              <div class="flex w-full h-full items-center justify-center">
                <button
                  class="px-2 py-1 bg-blue-600 active:bg-blue-700 text-neutral-50 rounded-lg disabled:cursor-not-allowed disabled:bg-blue-950 disabled:text-neutral-50"
                  onclick={() => mutate("auth", "have_request_verified", true)}
                >
                  Send the request
                </button>
              </div>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </SettingContainer>
  );
};

export default PageVerifyingAccount;
