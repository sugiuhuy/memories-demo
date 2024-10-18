/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgCompass: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_visited}>
          <path
            d="M9.39076 9.39076C9.66223 9.66223 10.1257 9.53915 10.2267 9.16877L11.2698 5.34417C11.3716 4.97092 11.0291 4.62843 10.6558 4.73023L6.83123 5.7733C6.46085 5.87431 6.33777 6.33777 6.60924 6.60924L9.39076 9.39076Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35946 6.10899C5.44545 5.73639 5.73639 5.44545 6.10899 5.35946L11.2205 4.17989C11.5805 4.0968 11.9032 4.41948 11.8201 4.77951L10.6405 9.89101C10.5546 10.2636 10.2636 10.5546 9.89101 10.6405L4.77951 11.8201C4.41948 11.9032 4.0968 11.5805 4.17989 11.2205L5.35946 6.10899Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_visited}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.62128 10.7028L9.89101 10.6405C10.2636 10.5546 10.5546 10.2636 10.6405 9.89101L11.8201 4.77951C11.9032 4.41948 11.5805 4.0968 11.2205 4.17989L6.10899 5.35946C5.73639 5.44545 5.44545 5.73639 5.35946 6.10899L5.29728 6.37846C5.29723 6.37865 5.29732 6.37828 5.29728 6.37846L4.17989 11.2205C4.0968 11.5805 4.41948 11.9032 4.77951 11.8201L9.62128 10.7028C9.62138 10.7028 9.62118 10.7028 9.62128 10.7028ZM10.6658 5.33417L6.33385 6.33385L9.66615 9.66615L10.6658 5.33417Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgCompass;
