import { Component, Match, onMount, Switch } from "solid-js";

interface Props {
  display: { initial: string; color: string };
  avatar: string | null;
  class: string;
}

const Avatar: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  onMount(() => {
    elRef!.style.setProperty("--bg-color", props.display.color);
  });

  return (
    <div ref={elRef} class={`relative flex ${props.class} items-center justify-center rounded-lg aspect-square overflow-hidden shrink-0`}>
      <Switch>
        <Match when={props.avatar}>
          <img
            src={props.avatar!}
            alt={props.display.initial}
            class="flex w-full h-full object-cover object-center pointer-events-none select-none"
            draggable={false}
          />
        </Match>
        <Match when={!props.avatar}>
          <div class="flex w-full h-full items-center justify-center bg-[var(--bg-color)] text-white pointer-events-none select-none">
            <span class="uppercase">{props.display.initial}</span>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default Avatar;
