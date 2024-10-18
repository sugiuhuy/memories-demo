/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgAdvertisement: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 14" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_active}>
          <path
            d="M14.2969 0.312487L6 4.00001H1.5C1.22386 4.00001 1 4.22387 1 4.50001V5.00001H0.5C0.223857 5.00001 0 5.22387 0 5.50001V8.50001C0 8.77615 0.223857 9.00001 0.5 9.00001H1V9.50001C1 9.77615 1.22386 10 1.5 10H2V13.5C2 13.7762 2.22386 14 2.5 14H3.83504C4.07564 14 4.28213 13.8286 4.32647 13.5922L5 10H6L14.2969 13.6875C14.6276 13.8345 15 13.5925 15 13.2306V8.00001C15.5523 8.00001 16 7.5523 16 7.00001C16 6.44773 15.5523 6.00001 15 6.00001V0.769393C15 0.407563 14.6276 0.165534 14.2969 0.312487Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_active}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 14L6.9 10.4L14.2969 13.6875C14.6276 13.8345 15 13.5925 15 13.2306V9C15.5523 9 16 8.55228 16 8V6C16 5.44772 15.5523 5 15 5V0.769392C15 0.407563 14.6276 0.165534 14.2969 0.312487L6 4.00001H1.5C1.22386 4.00001 1 4.22387 1 4.50001V5H0.5C0.223858 5 0 5.22386 0 5.5V8.5C0 8.77614 0.223858 9 0.5 9H1V9.50001C1 9.77615 1.22386 10 1.5 10H3V14H6ZM6.21221 5.00001L14 1.53877V12.4612L6.21852 9.00281L5.21922 13H4V9.00001H2V5.00001H6.21221Z"
            fill="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgAdvertisement;
