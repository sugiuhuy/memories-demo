import { Component, createEffect, createSignal, For, onCleanup } from "solid-js";
import Icons from "~/assets/icons";
import NavbarLinks from "~/components/navigation/navbar-links";
import HeaderContainer from "~/containers/header-container";
import NavbarContainer from "~/containers/navbar-container";
import NotificationsSwitcher from "~/modules/notifications-switcher";
import { mutateStore, selectStore } from "~/stores/manage";

const PageNotifications: Component = () => {
  const notifications = selectStore((store) => store.findNotifications);
  const mutate = mutateStore();

  const [order, setOrder] = createSignal<"all" | "user" | "post">("all");
  const orders: { name: "all" | "user" | "post"; placeholder: string }[] = [
    { name: "all", placeholder: "All" },
    { name: "user", placeholder: "User" },
    { name: "post", placeholder: "Memories" },
  ];

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
    mutate("findNotifications", []);
  });

  createEffect(() => {
    document.title = order() === "post" ? "Post notifications" : order() === "user" ? "User notifications" : "Notifications";
  });

  return (
    <div class="flex flex-col w-full h-full items-center divide-y divide-solid divide-[var(--border-primary)]">
      <HeaderContainer class="flex flex-col w-full md:max-w-md items-center justify-center">
        <div class="flex md:hidden w-full pt-3 px-3 items-center gap-3">
          <button class="flex group/navigator" onClick={() => history.back()}>
            <Icons name="arrow" class="size-4 rotate-270 aspect-square group-active/navigator:scale-95 shrink-0" />
          </button>
          <div class="flex w-full justify-center">Notifications</div>
          <a href="/account/manage/push_notifications" class="flex group/navigator">
            <Icons name="setting" class="size-5 aspect-square group-active/navigator:scale-95 shrink-0" />
          </a>
        </div>
        <div class="flex w-full items-center">
          <For each={orders}>
            {(item) => (
              <button
                class={`flex w-full items-center justify-center p-3 border-b border-solid ${
                  order() === item.name ? "border-blue-600 text-blue-600" : "border-[var(--border-primary)]"
                }`}
                onclick={() => setOrder(item.name)}
              >
                {item.placeholder}
              </button>
            )}
          </For>
        </div>
      </HeaderContainer>
      <div class="flex flex-col w-full md:max-w-md h-full items-center pt-2 max-md:p-2">
        <NotificationsSwitcher notifications={notifications()} limit={10} max_notifications={100} />
      </div>
      <NavbarContainer class="flex md:hidden w-full">
        <NavbarLinks />
      </NavbarContainer>
    </div>
  );
};

export default PageNotifications;
