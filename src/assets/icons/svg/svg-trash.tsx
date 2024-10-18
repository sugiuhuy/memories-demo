/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgTrash: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 12 14" fill="none" class={props.class}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 1.5C2.5 0.671573 3.17157 0 4 0H8C8.82843 0 9.5 0.671573 9.5 1.5H11.5C11.7761 1.5 12 1.72386 12 2C12 2.27614 11.7761 2.5 11.5 2.5H0.5C0.223858 2.5 0 2.27614 0 2C0 1.72386 0.223858 1.5 0.5 1.5H2.5ZM8 1C8.27614 1 8.5 1.22386 8.5 1.5H3.5C3.5 1.22386 3.72386 1 4 1H8ZM1 3C1.27614 3 1.5 3.22386 1.5 3.5V10.5C1.5 11.8807 2.61929 13 4 13H8C9.38071 13 10.5 11.8807 10.5 10.5V3.5C10.5 3.22386 10.7239 3 11 3C11.2761 3 11.5 3.22386 11.5 3.5V10.5C11.5 12.433 9.933 14 8 14H4C2.067 14 0.5 12.433 0.5 10.5V3.5C0.5 3.22386 0.723858 3 1 3ZM4 5V11C4 11.2761 3.77614 11.5 3.5 11.5C3.22386 11.5 3 11.2761 3 11V5C3 4.72386 3.22386 4.5 3.5 4.5C3.77614 4.5 4 4.72386 4 5ZM6.5 5V11C6.5 11.2761 6.27614 11.5 6 11.5C5.72386 11.5 5.5 11.2761 5.5 11V5C5.5 4.72386 5.72386 4.5 6 4.5C6.27614 4.5 6.5 4.72386 6.5 5ZM9 5V11C9 11.2761 8.77614 11.5 8.5 11.5C8.22386 11.5 8 11.2761 8 11V5C8 4.72386 8.22386 4.5 8.5 4.5C8.77614 4.5 9 4.72386 9 5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgTrash;
