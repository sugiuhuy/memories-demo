/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgArticle: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <path d="M14 3H10V8H14V3Z" fill="currentColor" />
      <path d="M5 4H9V5H5V4Z" fill="currentColor" />
      <path d="M9 6H5V7H9V6Z" fill="currentColor" />
      <path d="M5 9H14V10H5V9Z" fill="currentColor" />
      <path d="M14 11H5V13H14V11Z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 0C4.34315 0 3 1.34315 3 3V13C3 14.6569 4.34315 16 6 16H13C14.6569 16 16 14.6569 16 13V3C16 1.34315 14.6569 0 13 0H6ZM13 1H6C4.89543 1 4 1.89543 4 3V13C4 14.1046 4.89543 15 6 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z"
        fill="currentColor"
      />
      <path
        d="M2 4H0V13C0 14.6569 1.34315 16 3 16H5C4.10406 16 3.29986 15.6073 2.75016 14.9845C1.7635 14.8616 1 14.02 1 13V5H2V4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgArticle;
