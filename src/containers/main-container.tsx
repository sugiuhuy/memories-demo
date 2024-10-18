import { Navigate, RouteSectionProps, useLocation } from "@solidjs/router";
import { Component, Show } from "solid-js";
import Sidebar from "~/components/common/sidebar";
import { selectStore } from "~/stores/manage";

const MainContainer: Component<RouteSectionProps> = (props) => {
  const location = useLocation();
  const auth = selectStore((store) => store.auth!);

  return (
    <Show when={auth() !== null} fallback={<Navigate href="/account/login" state={{ prevUrl: location.pathname }} />}>
      <div class="flex w-full divide-x divide-solid divide-[var(--border-primary)]">
        <Sidebar {...auth()} />
        {props.children}
      </div>
    </Show>
  );
};

export default MainContainer;
