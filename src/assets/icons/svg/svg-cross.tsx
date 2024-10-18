/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgCross: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <path
        d="M9 1C9 0.447715 8.55229 0 8 0C7.44771 0 7 0.447715 7 1V7H1C0.447715 7 0 7.44771 0 8C0 8.55229 0.447715 9 1 9H7V15C7 15.5523 7.44771 16 8 16C8.55228 16 9 15.5523 9 15V9H15C15.5523 9 16 8.55229 16 8C16 7.44771 15.5523 7 15 7H9V1Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgCross;
