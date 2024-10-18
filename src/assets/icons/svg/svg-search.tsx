/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgSearch: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_visited}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.0949e-07 6.50121L0 6.50241C0 10.0936 2.91123 13.0048 6.50241 13.0048C7.93705 13.0048 9.26317 12.5402 10.3385 11.7533L14.2923 15.707C14.6829 16.0977 15.3163 16.0977 15.707 15.707C16.0977 15.3163 16.0977 14.6829 15.707 14.2923L11.7533 10.3385C12.5402 9.26317 13.0048 7.93705 13.0048 6.50241C13.0048 2.91123 10.0936 0 6.50241 0C2.91163 0 0.000651939 2.91058 1.0949e-07 6.50121ZM11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_visited}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.50241 0C2.91123 0 0 2.91123 0 6.50241C0 10.0936 2.91123 13.0048 6.50241 13.0048C7.93705 13.0048 9.26317 12.5402 10.3385 11.7533L14.2923 15.707C14.6829 16.0977 15.3163 16.0977 15.707 15.707C16.0977 15.3163 16.0977 14.6829 15.707 14.2923L11.7533 10.3385C12.5402 9.26317 13.0048 7.93705 13.0048 6.50241C13.0048 2.91123 10.0936 0 6.50241 0ZM1.00037 6.50241C1.00037 3.46372 3.46372 1.00037 6.50241 1.00037C9.54111 1.00037 12.0045 3.46372 12.0045 6.50241C12.0045 9.54111 9.54111 12.0045 6.50241 12.0045C3.46372 12.0045 1.00037 9.54111 1.00037 6.50241Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgSearch;
