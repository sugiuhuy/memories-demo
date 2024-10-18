/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgReport: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <path d="M7 8.5V2.5H9V8.5H7Z" fill="currentColor" />
      <path d="M9 11.5H7V9.5H9V11.5Z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.92494 13.5938L8 16L6.07506 13.5938C6.02762 13.5345 5.95579 13.5 5.87984 13.5H3C1.34315 13.5 4.76837e-07 12.1569 4.76837e-07 10.5V3C4.76837e-07 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3L16 10.5C16 12.1569 14.6569 13.5 13 13.5L10.1202 13.5C10.0442 13.5 9.97238 13.5345 9.92494 13.5938ZM1 10.5L1 3C1 1.89543 1.89543 1 3 1L13 1C14.1046 1 15 1.89543 15 3V10.5C15 11.6046 14.1046 12.5 13 12.5L10.1202 12.5C9.74043 12.5 9.38129 12.6726 9.14407 12.9691L8 14.3992L6.85593 12.9691C6.61872 12.6726 6.25957 12.5 5.87984 12.5H3C1.89543 12.5 1 11.6046 1 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgReport;
