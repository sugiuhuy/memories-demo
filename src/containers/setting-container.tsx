import { JSXElement, ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import FooterLinks from "~/components/navigation/footer-links";
import HeaderContainer from "~/containers/header-container";

interface Props {
  title: string;
  class: string;
  button?: JSXElement;
}

const SettingContainer: ParentComponent<Props> = (props) => {
  return (
    <>
      <HeaderContainer class="flex md:hidden w-full items-center p-3">
        <button class="flex group/navigator" onClick={() => history.back()}>
          <Icons name="arrow" class="size-4 shrink-0 aspect-square rotate-270 group-active/navigator:scale-95" />
        </button>
        <span class="w-full text-center">{props.title}</span>
        <Show when={props.button} fallback={<div class="size-5 aspect-square"></div>}>
          {props.button}
        </Show>
      </HeaderContainer>
      <div class="flex flex-col w-full max-w-md h-full p-2">
        <div class="flex flex-col w-full h-full">
          <div class="flex max-md:hidden w-full pt-7 pb-5 text-3xl">{props.title}</div>
          <div class={props.class}>{props.children}</div>
        </div>
        <div class="flex max-md:hidden w-full pb-2 pt-12">
          <FooterLinks isShowLinks />
        </div>
      </div>
    </>
  );
};

export default SettingContainer;
