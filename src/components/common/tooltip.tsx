import { createEffect, createSignal, onCleanup, onMount, ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";

interface Props {
  class?: string;
  onclick?: () => void;
  text: string;
}

const Tooltip: ParentComponent<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;
  let textRef: HTMLDivElement | undefined;

  const [isShow, setIsShow] = createSignal<boolean>(false);
  const onMouseEnter = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(true);
  };
  const onMouseLeave = () => {
    if (navigator.maxTouchPoints > 0) return;
    setIsShow(false);
  };

  const onReposition = () => {
    const inContainerTooltip = elRef!.getBoundingClientRect();
    const tooltipRect = textRef!.getBoundingClientRect();

    let { x, y } = inContainerTooltip!;
    y = y > window.innerHeight - tooltipRect.height ? window.innerHeight - tooltipRect.height : y;
    x = x > window.innerWidth - tooltipRect.width ? window.innerWidth - tooltipRect.width : x;

    textRef!.style.setProperty("--tooltip-top", `${y + inContainerTooltip!.height + 8}px`);
    textRef!.style.setProperty("--tooltip-left", `${x}px`);
  };

  onMount(() => {
    onReposition();
  });

  onCleanup(() => {
    elRef!.removeEventListener("mousemove", onReposition);
  });

  createEffect(() => {
    elRef!.addEventListener("mousemove", onReposition);
  });

  return (
    <div ref={elRef} class={props.class} onclick={props.onclick} onmouseenter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {props.children}
      <Portal mount={document.getElementById("portals")!}>
        <div
          ref={textRef}
          class={`fixed z-[999999] top-[var(--tooltip-top)] left-[var(--tooltip-left)] bg-[var(--bg-secondary)] py-1.5 px-2 rounded-lg pointer-events-none select-none transition-opacity outline outline-1 outline-[var(--border-secondary)] text-sm ${
            isShow() ? "opacity-100" : "opacity-0"
          }`}
        >
          {props.text}
        </div>
      </Portal>
    </div>
  );
};

export default Tooltip;
