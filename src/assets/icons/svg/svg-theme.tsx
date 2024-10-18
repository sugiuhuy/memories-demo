/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgTheme: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_dark_mode}>
          <path
            d="M2.64626 11.3639C7.4609 11.3639 11.3639 7.4609 11.3639 2.64626C11.3639 2.03087 11.3001 1.42998 11.1786 0.850005C13.7386 2.10656 15.5 4.73925 15.5 7.78231C15.5 12.0447 12.0447 15.5 7.78231 15.5C4.73925 15.5 2.10656 13.7385 0.850002 11.1786C1.42997 11.3001 2.03087 11.3639 2.64626 11.3639Z"
            stroke="currentColor"
          />
        </Match>
        <Match when={!props.is_dark_mode}>
          <path
            d="M7.5 0.5C7.5 0.223857 7.72386 0 8 0C8.27614 0 8.5 0.223857 8.5 0.5V2C8.5 2.27614 8.27614 2.5 8 2.5C7.72386 2.5 7.5 2.27614 7.5 2V0.5Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
            fill="currentColor"
          />
          <path
            d="M13.6569 2.34315C13.4616 2.14788 13.145 2.14788 12.9497 2.34315L11.8891 3.40381C11.6938 3.59907 11.6938 3.91565 11.8891 4.11091C12.0843 4.30618 12.4009 4.30618 12.5962 4.11091L13.6569 3.05025C13.8521 2.85499 13.8521 2.53841 13.6569 2.34315Z"
            fill="currentColor"
          />
          <path
            d="M15.5 7.5C15.7761 7.5 16 7.72386 16 8C16 8.27614 15.7761 8.5 15.5 8.5H14C13.7239 8.5 13.5 8.27614 13.5 8C13.5 7.72386 13.7239 7.5 14 7.5H15.5Z"
            fill="currentColor"
          />
          <path
            d="M13.6569 13.6569C13.8521 13.4616 13.8521 13.145 13.6569 12.9497L12.5962 11.8891C12.4009 11.6938 12.0843 11.6938 11.8891 11.8891C11.6938 12.0843 11.6938 12.4009 11.8891 12.5962L12.9497 13.6569C13.145 13.8521 13.4616 13.8521 13.6569 13.6569Z"
            fill="currentColor"
          />
          <path
            d="M7.5 14C7.5 13.7239 7.72386 13.5 8 13.5C8.27614 13.5 8.5 13.7239 8.5 14V15.5C8.5 15.7761 8.27614 16 8 16C7.72386 16 7.5 15.7761 7.5 15.5V14Z"
            fill="currentColor"
          />
          <path
            d="M4.11091 11.8891C3.91565 11.6938 3.59907 11.6938 3.40381 11.8891L2.34314 12.9498C2.14788 13.145 2.14788 13.4616 2.34314 13.6569C2.53841 13.8521 2.85499 13.8521 3.05025 13.6569L4.11091 12.5962C4.30617 12.4009 4.30617 12.0844 4.11091 11.8891Z"
            fill="currentColor"
          />
          <path
            d="M2 7.5C2.27614 7.5 2.5 7.72386 2.5 8C2.5 8.27614 2.27614 8.5 2 8.5H0.5C0.223857 8.5 0 8.27614 0 8C0 7.72386 0.223857 7.5 0.5 7.5H2Z"
            fill="currentColor"
          />
          <path
            d="M4.11091 4.11091C4.30618 3.91565 4.30618 3.59906 4.11091 3.4038L3.05025 2.34314C2.85499 2.14788 2.53841 2.14788 2.34315 2.34314C2.14788 2.5384 2.14788 2.85499 2.34315 3.05025L3.40381 4.11091C3.59907 4.30617 3.91565 4.30617 4.11091 4.11091Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgTheme;
