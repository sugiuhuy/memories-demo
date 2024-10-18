import { Component, For, Show } from "solid-js";
import { selectStore } from "~/stores/manage";

interface Props {
  isShowLinks?: boolean;
}

const FooterLinks: Component<Props> = (props) => {
  const appearUrls = selectStore((store) => store.appear_urls);

  return (
    <div class="flex flex-col w-full items-center">
      <Show when={props.isShowLinks}>
        <div class="flex w-full flex-wrap justify-center gap-3">
          <For each={appearUrls()}>
            {(item) => (
              <Show when={item.appear_on.client_footer}>
                <a href={item.url} class="text-blue-600 active:text-blue-700 text-center text-sm">
                  {item.title}
                </a>
              </Show>
            )}
          </For>
        </div>
      </Show>
      <span class="text-center text-sm text-[var(--text-secondary)] select-none">
        ©️ {new Date().getFullYear()} {import.meta.env.VITE_TITLE}
      </span>
    </div>
  );
};

export default FooterLinks;
