/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgEmoji: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <path
        d="M4.75 9.5C5.16421 9.5 5.5 9.16421 5.5 8.75C5.5 8.33579 5.16421 8 4.75 8C4.33579 8 4 8.33579 4 8.75C4 9.16421 4.33579 9.5 4.75 9.5Z"
        fill="currentColor"
      />
      <path
        d="M12 8.75C12 9.16421 11.6642 9.5 11.25 9.5C10.8358 9.5 10.5 9.16421 10.5 8.75C10.5 8.33579 10.8358 8 11.25 8C11.6642 8 12 8.33579 12 8.75Z"
        fill="currentColor"
      />
      <path
        d="M6.35355 10.6464C6.15829 10.4512 5.84171 10.4512 5.64645 10.6464C5.45118 10.8417 5.45118 11.1583 5.64645 11.3536C6.94628 12.6534 9.05372 12.6534 10.3536 11.3536C10.5488 11.1583 10.5488 10.8417 10.3536 10.6464C10.1583 10.4512 9.84171 10.4512 9.64645 10.6464C8.73714 11.5558 7.26286 11.5558 6.35355 10.6464Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SvgEmoji;
