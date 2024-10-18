import { Component, For, onCleanup, onMount, Show } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import SettingContainer from "~/containers/setting-container";
import { mutateStore, selectStore } from "~/stores/manage";

const PageSwitchAppearance: Component = () => {
  const theme = selectStore((store) => store.theme);
  const mutate = mutateStore();

  const themes: { value: "dark" | "light" | "auto"; title: string }[] = [
    { value: "light", title: "Light" },
    { value: "dark", title: "Dark" },
    { value: "auto", title: "Auto" },
  ];

  onMount(() => {
    document.title = "Switch appearance";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Switch appearance" class="flex flex-col w-full h-full">
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
    </SettingContainer>
  );
};

export default PageSwitchAppearance;
