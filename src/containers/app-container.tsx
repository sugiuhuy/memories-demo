import { RouteSectionProps } from "@solidjs/router";
import { Component, createEffect, For } from "solid-js";
import ToastCard from "~/components/common/toast-card";
import ThemeColors from "~/configurations/theme-colors";
import WelcomeContainer from "~/containers/welcome-container";
import { selectStore } from "~/stores/manage";

const AppContainer: Component<RouteSectionProps> = (props) => {
  const toasts = selectStore((store) => store.toasts);
  const theme = selectStore((store) => store.theme);

  createEffect(() => {
    ThemeColors(theme());
  });

  return (
    <WelcomeContainer>
      <div class={`fixed z-[999999] top-0 right-0 flex flex-col w-full max-w-96 gap-3 p-2 ${toasts().length > 0 && "pointer-events-auto"}`}>
        <For each={toasts()}>{(toast) => <ToastCard {...toast} />}</For>
      </div>
      {props.children}
    </WelcomeContainer>
  );
};

export default AppContainer;
