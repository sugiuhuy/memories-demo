/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgMute: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 12" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_muted}>
          <path
            d="M14.8195 11.1473L14.1704 11.908L13.1977 11.0778C12.272 11.662 11.1755 12 10 12V10C10.5547 10 11.0831 9.88708 11.5633 9.68299L9 7.49538V12L3 8H1C0.447715 8 0 7.55228 0 7V5C0 4.44772 0.447715 4 1 4H3L4.06918 3.28722L2 1.5213L2.64917 0.760654L14.8195 11.1473Z"
            fill="currentColor"
          />
          <path d="M9 4.86603L5.79889 2.13407L9 0V4.86603Z" fill="currentColor" />
          <path d="M10 5.71947L11.6513 7.12873C11.8713 6.80748 12 6.41877 12 6C12 4.89543 11.1046 4 10 4V5.71947Z" fill="currentColor" />
          <path
            d="M13.1769 8.43079L14.6997 9.73037C15.5137 8.70621 16 7.4099 16 6C16 2.68629 13.3137 0 10 0V2C12.2091 2 14 3.79086 14 6C14 6.91436 13.6932 7.75706 13.1769 8.43079Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_muted}>
          <path d="M9 0L3 4H1C0.447715 4 0 4.44772 0 5V7C0 7.55228 0.447715 8 1 8H3L9 12V0Z" fill="currentColor" />
          <path
            d="M14 6C14 3.79086 12.2091 2 10 2V0C13.3137 0 16 2.68629 16 6C16 9.31371 13.3137 12 10 12V10C12.2091 10 14 8.20914 14 6Z"
            fill="currentColor"
          />
          <path d="M12 6C12 4.89543 11.1046 4 10 4V8C11.1046 8 12 7.10457 12 6Z" fill="currentColor" />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgMute;
