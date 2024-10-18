import { createSignal, onMount, ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import FooterLinks from "~/components/navigation/footer-links";

const WelcomeContainer: ParentComponent = (props) => {
  const [isWaiting, setIsWaiting] = createSignal<boolean>(true);

  onMount(() => {
    setTimeout(() => {
      setIsWaiting(false);
    }, 1500);
  });

  return (
    <Show when={isWaiting()} fallback={props.children}>
      <div class="flex flex-col w-full p-2 gap-2">
        <div class="flex flex-col w-full h-full items-center justify-center">
          <Icons name="logo" class="size-full max-w-16 max-h-16 aspect-square" />
        </div>
        <FooterLinks />
      </div>
    </Show>
  );
};

export default WelcomeContainer;
