/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgUpload: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 13" fill="none" class={props.class}>
      <path
        d="M7.35355 0.646447C7.15829 0.451184 6.84171 0.451184 6.64645 0.646447L3.46447 3.82843C3.2692 4.02369 3.2692 4.34027 3.46447 4.53553C3.65973 4.7308 3.97631 4.7308 4.17157 4.53553L6.5 2.20711V9C6.5 9.27614 6.72386 9.5 7 9.5C7.27614 9.5 7.5 9.27614 7.5 9V2.20711L9.82843 4.53553C10.0237 4.7308 10.3403 4.7308 10.5355 4.53553C10.7308 4.34027 10.7308 4.02369 10.5355 3.82843L7.35355 0.646447Z"
        fill="currentColor"
      />
      <path
        d="M1.5 9C1.5 8.72386 1.27614 8.5 1 8.5C0.723858 8.5 0.5 8.72386 0.5 9V11C0.5 11.8284 1.17157 12.5 2 12.5H12C12.8284 12.5 13.5 11.8284 13.5 11V9C13.5 8.72386 13.2761 8.5 13 8.5C12.7239 8.5 12.5 8.72386 12.5 9V11C12.5 11.2761 12.2761 11.5 12 11.5H2C1.72386 11.5 1.5 11.2761 1.5 11V9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgUpload;
