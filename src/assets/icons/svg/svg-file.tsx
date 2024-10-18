/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgFile: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 12 16" fill="none" class={props.class}>
      <path d="M2 6H8V7H2V6Z" fill="currentColor" />
      <path d="M2 8H8V9H2V8Z" fill="currentColor" />
      <path d="M8 10H2V11H8V10Z" fill="currentColor" />
      <path d="M2 12H6V13H2V12Z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H10C11.1046 16 12 15.1046 12 14V5.32843C12 4.79799 11.7893 4.28929 11.4142 3.91421L8.08579 0.585787C7.71071 0.210714 7.20201 0 6.67157 0H2ZM1 14C1 14.5523 1.44772 15 2 15H10C10.5523 15 11 14.5523 11 14V5.5H9C7.61929 5.5 6.5 4.38071 6.5 3V1H2C1.44772 1 1 1.44772 1 2V14ZM7.5 1.41421L10.5858 4.5H9C8.17157 4.5 7.5 3.82843 7.5 3V1.41421Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgFile;
