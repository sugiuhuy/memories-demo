import { Component } from "solid-js";

interface Props {
  class?: string;
}

const Spinner: Component<Props> = (props) => {
  return (
    <div class={props.class ? props.class : "size-4 text-[var(--text-primary)]"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="25 25 50 50"
        fill="none"
        class="animate-spinner-rotate origin-center w-full h-full aspect-square"
      >
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" class="animate-spinner-dash" stroke-width="4.5" stroke-miterlimit="10" />
      </svg>
    </div>
  );
};

export default Spinner;
