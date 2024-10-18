/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgCopy: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 16" fill="none" class={props.class}>
      <path
        d="M11.5 1.5H5.5C4.99622 1.5 4.57944 1.87253 4.51013 2.35714H3.50502C3.57827 1.31925 4.44346 0.5 5.5 0.5H11.5C12.6046 0.5 13.5 1.39543 13.5 2.5V11.5C13.5 12.6046 12.6046 13.5 11.5 13.5H10.7677C10.771 13.4528 10.7727 13.4052 10.7727 13.3571V12.5H11.5C12.0523 12.5 12.5 12.0523 12.5 11.5V2.5C12.5 1.94772 12.0523 1.5 11.5 1.5Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.5 5C0.5 3.89543 1.39543 3 2.5 3H8C9.10457 3 10 3.89543 10 5V13.5C10 14.6046 9.10457 15.5 8 15.5H2.5C1.39543 15.5 0.5 14.6046 0.5 13.5V5ZM2.5 4H8C8.55229 4 9 4.44772 9 5V13.5C9 14.0523 8.55228 14.5 8 14.5H2.5C1.94772 14.5 1.5 14.0523 1.5 13.5V5C1.5 4.44772 1.94772 4 2.5 4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgCopy;
