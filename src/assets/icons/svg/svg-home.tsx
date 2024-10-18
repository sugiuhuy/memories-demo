/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgHome: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_visited}>
          <path
            d="M8.3512 0.133421C8.15012 -0.0444738 7.84988 -0.0444737 7.6488 0.133421L0.364262 6.57802C0.132779 6.78281 0 7.07866 0 7.38966V14.9215C0 15.5171 0.477563 16 1.06667 16H5.33333C5.92244 16 6.4 15.5171 6.4 14.9215V12.7645C6.4 12.1689 6.87756 11.6861 7.46667 11.6861H8.53333C9.12244 11.6861 9.6 12.1689 9.6 12.7645V14.9215C9.6 15.5171 10.0776 16 10.6667 16H14.9333C15.5224 16 16 15.5171 16 14.9215V7.38966C16 7.07866 15.8672 6.78281 15.6357 6.57802L8.3512 0.133421Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_visited}>
          <path
            d="M7.9801 0.507905C7.99201 0.497365 8.00799 0.497365 8.0199 0.507904L15.3044 6.9525C15.4279 7.06171 15.5 7.22087 15.5 7.38966V14.9215C15.5 15.2462 15.2411 15.5 14.9333 15.5H10.6667C10.3589 15.5 10.1 15.2462 10.1 14.9215V12.7645C10.1 11.898 9.40376 11.1861 8.53333 11.1861H7.46667C6.59624 11.1861 5.9 11.898 5.9 12.7645V14.9215C5.9 15.2462 5.64112 15.5 5.33333 15.5H1.06667C0.758885 15.5 0.5 15.2462 0.5 14.9215V7.38966C0.5 7.22087 0.572121 7.06171 0.695565 6.9525L7.9801 0.507905L7.6488 0.133421L7.9801 0.507905Z"
            stroke="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgHome;
