import { Navigate, RouteSectionProps } from "@solidjs/router";
import { Component, Show } from "solid-js";
import FooterLinks from "~/components/navigation/footer-links";
import { selectStore } from "~/stores/manage";

const AccountGuestContainer: Component<RouteSectionProps> = (props) => {
  const auth = selectStore((store) => store.auth);

  return (
    <Show when={auth() === null} fallback={<Navigate href="/" />}>
      <div class="flex flex-col w-full p-2 gap-2 justify-center items-center">
        <div class="flex flex-col w-full max-w-80 h-full items-center justify-center gap-4">{props.children}</div>
        <FooterLinks isShowLinks />
      </div>
    </Show>
  );
};

export default AccountGuestContainer;
