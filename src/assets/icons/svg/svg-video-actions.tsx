/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgVideoActions: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type_video_actions === "play"}>
        <svg width="100%" height="100%" viewBox="0 0 12 14" fill="none" class={props.class}>
          <path
            d="M11.383 6.12134C12.0797 6.49994 12.0797 7.50006 11.383 7.87866L1.72745 13.1254C1.06112 13.4875 0.25 13.0051 0.25 12.2467L0.25 1.75328C0.25 0.994927 1.06112 0.512548 1.72745 0.874627L11.383 6.12134Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_video_actions === "pause"}>
        <svg width="100%" height="100%" viewBox="0 0 12 16" fill="none" class={props.class}>
          <path
            d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16C3.10457 16 4 15.1046 4 14V2C4 0.895431 3.10457 0 2 0Z"
            fill="currentColor"
          />
          <path
            d="M10 0C8.89543 0 8 0.895431 8 2V14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14V2C12 0.895431 11.1046 0 10 0Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_video_actions === "stop"}>
        <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" class={props.class}>
          <path
            d="M0 2C0 0.89543 0.895431 0 2 0H12C13.1046 0 14 0.895431 14 2V12C14 13.1046 13.1046 14 12 14H2C0.89543 14 0 13.1046 0 12V2Z"
            fill="currentColor"
          />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgVideoActions;
