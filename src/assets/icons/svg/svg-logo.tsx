/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgLogo: Component<SvgProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 -0.5 16 16" shape-rendering="crispEdges" class={props.class}>
      <path
        stroke="currentColor"
        d="M2 0h12M1 1h1M14 1h1M0 2h1M15 2h1M0 3h1M15 3h1M0 4h1M15 4h1M0 5h1M15 5h1M0 6h1M15 6h1M0 7h1M15 7h1M0 8h1M15 8h1M0 9h1M15 9h1M0 10h1M15 10h1M0 11h1M15 11h1M0 12h1M15 12h1M0 13h1M15 13h1M1 14h1M14 14h1M2 15h12"
      />
      <path
        stroke="#696a6a"
        d="M2 1h12M1 2h2M4 2h11M1 3h1M3 3h12M1 4h1M3 4h12M1 5h14M1 6h14M1 7h14M1 8h2M4 8h3M9 8h3M13 8h2M1 9h1M3 9h3M7 9h2M10 9h3M14 9h1M1 10h14M1 11h14M1 12h14M2 13h12"
      />
      <path stroke="#868787" d="M3 2h1M2 3h1M2 4h1" />
      <path stroke="#000000" d="M3 8h1M7 8h2M12 8h1M6 9h1M9 9h1" />
      <path stroke="#d77bba" d="M2 9h1M13 9h1" />
      <path stroke="#404141" d="M1 13h1M14 13h1M2 14h12" />
    </svg>
  );
};

export default SvgLogo;
