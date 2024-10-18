/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgBookmark: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_active}>
          <path d="M0 0H14V16L7 10.2857L0 16V0Z" fill="currentColor" />
        </Match>

        <Match when={!props.is_active}>
          <path d="M6.68381 9.89838L0.5 14.9464V0.5H13.5V14.9464L7.31619 9.89838L7 9.64027L6.68381 9.89838Z" stroke="currentColor" />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgBookmark;
