/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgHeart: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 14" fill="none" class={props.class}>
      <Switch>
        <Match when={props.is_active}>
          <path
            d="M14.7324 1.29451C13.0423 -0.431503 10.3021 -0.431504 8.61204 1.29451L8 1.91956L7.38796 1.29451C5.69786 -0.431503 2.95767 -0.431503 1.26757 1.29451C-0.422524 3.02052 -0.422525 5.81895 1.26757 7.54496L7.29593 13.7014C7.68575 14.0995 8.31425 14.0995 8.70407 13.7014L14.7324 7.54496C16.4225 5.81895 16.4225 3.02052 14.7324 1.29451Z"
            fill="currentColor"
          />
        </Match>
        <Match when={!props.is_active}>
          <path
            d="M7.64275 2.26937L8 2.63422L8.35725 2.26937L8.96929 1.64433C10.4633 0.118557 12.8812 0.118558 14.3752 1.64433C15.8749 3.17596 15.8749 5.66351 14.3752 7.19514L8.34682 13.3516C8.15308 13.5495 7.84692 13.5495 7.65318 13.3516L1.62482 7.19514C0.125058 5.66351 0.125059 3.17596 1.62482 1.64433C3.11885 0.118558 5.53669 0.118558 7.03071 1.64433L7.64275 2.26937Z"
            stroke="currentColor"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default SvgHeart;
