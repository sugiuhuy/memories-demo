/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgDashboard: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" class={props.class}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 0C0.447715 0 0 0.447715 0 1V2C0 2.55228 0.447715 3 1 3H4C4.55229 3 5 2.55229 5 2V1C5 0.447715 4.55229 0 4 0H1ZM8 7C7.44771 7 7 7.44771 7 8V11C7 11.5523 7.44771 12 8 12H11C11.5523 12 12 11.5523 12 11V8C12 7.44771 11.5523 7 11 7H8ZM0 6C0 5.44771 0.447715 5 1 5H4C4.55229 5 5 5.44772 5 6V11C5 11.5523 4.55229 12 4 12H1C0.447715 12 0 11.5523 0 11V6ZM8 0C7.44771 0 7 0.447715 7 1V4C7 4.55229 7.44771 5 8 5H11C11.5523 5 12 4.55229 12 4V1C12 0.447715 11.5523 0 11 0H8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgDashboard;
