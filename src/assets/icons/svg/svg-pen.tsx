/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgPen: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type_pen === "normal"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            d="M14.0432 0.335736C13.5955 -0.111913 12.8698 -0.111912 12.4221 0.335737L10.8105 1.9473L14.0527 5.18946L15.6643 3.5779C16.1119 3.13025 16.1119 2.40447 15.6643 1.95682L14.0432 0.335736Z"
            fill="currentColor"
          />
          <path
            d="M13.6474 5.59473L10.4053 2.35257L2.42377 10.3341C2.09347 10.6644 1.83392 11.0585 1.66096 11.4924L0.0211065 15.6066C-0.0720574 15.8403 0.15968 16.0721 0.393414 15.9789L4.50757 14.339C4.94149 14.1661 5.33563 13.9065 5.66593 13.5762L13.6474 5.59473Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_pen === "box"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class={props.class}>
          <path
            d="M13.3166 0.251803C13.6523 -0.083934 14.1967 -0.0839344 14.5324 0.251802L15.7482 1.46761C16.0839 1.80335 16.0839 2.34769 15.7482 2.68342L14.5395 3.8921L12.1079 1.46048L13.3166 0.251803Z"
            fill="currentColor"
          />
          <path
            d="M11.8039 1.76443L14.2356 4.19605L8.24945 10.1822C8.00172 10.4299 7.70612 10.6246 7.38068 10.7543L4.29506 11.9842C4.11976 12.054 3.94596 11.8802 4.01583 11.7049L5.24572 8.61932C5.37544 8.29388 5.5701 7.99828 5.81783 7.75055L11.8039 1.76443Z"
            fill="currentColor"
          />
          <path
            d="M1.75 3C1.75 2.86193 1.86193 2.75 2 2.75H7.5C7.91421 2.75 8.25 2.41421 8.25 2C8.25 1.58579 7.91421 1.25 7.5 1.25H2C1.0335 1.25 0.25 2.0335 0.25 3V14C0.25 14.9665 1.0335 15.75 2 15.75H13C13.9665 15.75 14.75 14.9665 14.75 14V8.5C14.75 8.08579 14.4142 7.75 14 7.75C13.5858 7.75 13.25 8.08579 13.25 8.5V14C13.25 14.1381 13.1381 14.25 13 14.25H2C1.86193 14.25 1.75 14.1381 1.75 14V3Z"
            fill="currentColor"
          />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgPen;
