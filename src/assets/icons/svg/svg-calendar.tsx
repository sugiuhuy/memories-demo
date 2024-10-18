/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgCalendar: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 15" fill="none" class={props.class}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 2V3H5V2H9V3H10V2C11.6569 2 13 3.34315 13 5H1C1 3.34315 2.34315 2 4 2ZM5 1H9V0H10V1C12.2091 1 14 2.79086 14 5V6V11C14 13.2091 12.2091 15 10 15H4C1.79086 15 0 13.2091 0 11V5C0 2.79086 1.79086 1 4 1V0H5V1ZM1 11V6H13V11C13 12.6569 11.6569 14 10 14H4C2.34315 14 1 12.6569 1 11ZM4 10C4.55228 10 5 9.55229 5 9C5 8.44771 4.55228 8 4 8C3.44772 8 3 8.44771 3 9C3 9.55229 3.44772 10 4 10ZM8 9C8 9.55229 7.55228 10 7 10C6.44772 10 6 9.55229 6 9C6 8.44771 6.44772 8 7 8C7.55228 8 8 8.44771 8 9ZM10 10C10.5523 10 11 9.55229 11 9C11 8.44771 10.5523 8 10 8C9.44771 8 9 8.44771 9 9C9 9.55229 9.44771 10 10 10ZM5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgCalendar;
