/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgPaperPlane: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_visited}>
          <path
            d="M15.914 2.73699C16.3759 1.09691 14.9031 -0.375879 13.263 0.0859756L1.66113 3.35311C-0.0710385 3.84089 -0.570039 6.04905 0.746599 7.1587C0.817918 7.2188 0.898432 7.26726 0.981335 7.30999L5.55356 9.6669C5.5778 9.6199 5.60996 9.57597 5.65002 9.53712L9.15191 6.14106C9.35015 5.94882 9.66669 5.95368 9.85893 6.15191C10.0512 6.35015 10.0463 6.66669 9.84809 6.85894L6.3462 10.255C6.31097 10.2892 6.27201 10.3171 6.23068 10.3388L8.69216 15.0251C8.73347 15.1037 8.77999 15.1802 8.83704 15.2483C9.94528 16.5713 12.1585 16.0733 12.6469 14.3389L15.914 2.73699Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_visited}>
          <path
            d="M6.61467 9.99464L9.84809 6.85894C10.0463 6.66669 10.0512 6.35015 9.85894 6.15191C9.66669 5.95368 9.35015 5.94882 9.15191 6.14106L5.9079 9.28703L1.21043 6.86556C1.14543 6.83206 1.10078 6.80331 1.06882 6.77637C0.0783895 5.94165 0.42591 4.2204 1.79666 3.83439L13.3985 0.567257C14.6627 0.211269 15.7887 1.33732 15.4327 2.60146L12.1656 14.2033C11.7791 15.576 10.054 15.9224 9.22033 14.9272C9.19474 14.8967 9.16718 14.8542 9.13481 14.7926L6.61467 9.99464Z"
            stroke="currentColor"
            stroke-linecap="round"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgPaperPlane;
