/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgComment: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_active}>
          <path
            d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.49039 15.5924 10.8856 14.8827 12.0802L15.4667 15.4667L12.0802 14.8827C10.8856 15.5925 9.49039 16 8 16Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_active}>
          <path
            d="M14.39 12.1652L14.3586 11.9834L14.4529 11.8248C15.1179 10.7053 15.5 9.39805 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C9.39805 15.5 10.7053 15.1179 11.8248 14.4529L11.9834 14.3586L12.1652 14.39L14.8536 14.8536L14.39 12.1652Z"
            stroke="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgComment;
