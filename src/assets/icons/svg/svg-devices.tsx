/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgDevices: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type_devices === "web"}>
        <svg width="100%" height="100%" viewBox="0 0 16 12" fill="none" class={props.class}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.00284 9.076C1.00096 9.05092 0.999998 9.02557 0.999998 9V1C0.999998 0.447716 1.44771 0 2 0H14C14.5523 0 15 0.447715 15 1L15 4C15.5523 4 16 4.44772 16 5V11C16 11.5523 15.5523 12 15 12H12H1.72076C1.29033 12 0.908188 11.7246 0.772074 11.3162L0.438741 10.3162C0.266449 9.79935 0.53878 9.26899 1.00284 9.076ZM11 11V10H1.38742L1.72076 11H11ZM11 9V5C11 4.44772 11.4477 4 12 4H14V1H2V9H11ZM15 4.5H12C11.7239 4.5 11.5 4.72386 11.5 5H15.5C15.5 4.72386 15.2761 4.5 15 4.5ZM15.5 5.5H11.5V9.5H15.5V5.5ZM11.5 11V10H15.5V11C15.5 11.2761 15.2761 11.5 15 11.5H12C11.7239 11.5 11.5 11.2761 11.5 11ZM14 10.75C14 11.0261 13.7761 11.25 13.5 11.25C13.2239 11.25 13 11.0261 13 10.75C13 10.4739 13.2239 10.25 13.5 10.25C13.7761 10.25 14 10.4739 14 10.75Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_devices === "mobile"}>
        <svg width="100%" height="100%" viewBox="0 0 10 16" fill="none" class={props.class}>
          <path
            d="M5 14.5C5.55228 14.5 6 14.0523 6 13.5C6 12.9477 5.55228 12.5 5 12.5C4.44772 12.5 4 12.9477 4 13.5C4 14.0523 4.44772 14.5 5 14.5Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2C0 0.895431 0.895431 0 2 0H8C9.10457 0 10 0.895431 10 2V14C10 15.1046 9.10457 16 8 16H2C0.89543 16 0 15.1046 0 14V2ZM2 1H8C8.55229 1 9 1.44772 9 2H1C1 1.44772 1.44772 1 2 1ZM1 3H9V11H1V3ZM1 12V14C1 14.5523 1.44772 15 2 15H8C8.55228 15 9 14.5523 9 14V12H1Z"
            fill="currentColor"
          />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgDevices;
