import { Component, onCleanup, onMount } from "solid-js";
import FooterLinks from "~/components/navigation/footer-links";

interface Props {
  statusCode: number;
  statusMessage: string;
  class: string;
}

const PageError: Component<Props> = (props) => {
  onMount(() => {
    document.title = props.statusMessage;
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <div class={props.class}>
      <div class="flex flex-col w-full h-full items-center justify-center">
        <span class="text-7xl">{props.statusCode}</span>
        <span class="text-sm">{props.statusMessage}</span>
      </div>
      <FooterLinks isShowLinks />
    </div>
  );
};

export default PageError;
