/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgOptions: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type_options === "3 line"}>
        <svg width="100%" height="100%" viewBox="0 0 16 12" fill="none" class={props.class}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM16 10H0V12H16V10Z" fill="currentColor" />
        </svg>
      </Match>
      <Match when={props.type_options === "3 dot horizontal"}>
        <svg width="100%" height="100%" viewBox="0 0 16 4" fill="none" class={props.class}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C12 3.10457 12.8954 4 14 4C15.1046 4 16 3.10457 16 2C16 0.895431 15.1046 -3.91405e-08 14 -8.74228e-08C12.8954 -1.35705e-07 12 0.89543 12 2ZM8 4C6.89543 4 6 3.10457 6 2C6 0.89543 6.89543 -3.97973e-07 8 -3.49691e-07C9.10457 -3.01409e-07 10 0.89543 10 2C10 3.10457 9.10457 4 8 4ZM2 4C0.89543 4 -1.35705e-07 3.10457 -8.74228e-08 2C-3.91405e-08 0.89543 0.895431 -6.60242e-07 2 -6.11959e-07C3.10457 -5.63677e-07 4 0.89543 4 2C4 3.10457 3.10457 4 2 4Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_options === "3 dot vertical"}>
        <svg width="100%" height="100%" viewBox="0 0 4 16" fill="none" class={props.class}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 12C0.895431 12 2.7141e-07 12.8954 1.74846e-07 14C7.8281e-08 15.1046 0.895431 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12ZM6.99382e-07 8C7.95947e-07 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8C4 9.10457 3.10457 10 2 10C0.895431 10 6.02818e-07 9.10457 6.99382e-07 8ZM1.22392e-06 2C1.32048e-06 0.89543 0.895432 -2.7141e-07 2 -1.74846e-07C3.10457 -7.8281e-08 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.895432 4 1.12735e-06 3.10457 1.22392e-06 2Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_options === "short"}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" class={props.class}>
          <path d="M0 0H2V2H0V0Z" fill="currentColor" />
          <path d="M0 4H2V6H0V4Z" fill="currentColor" />
          <path d="M0 8H2V10H0V8Z" fill="currentColor" />
          <path d="M3 0H8.5V2H3V0Z" fill="currentColor" />
          <path d="M3 4H11.25V6H3V4Z" fill="currentColor" />
          <path d="M14 8V10H3V8H14Z" fill="currentColor" />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgOptions;
