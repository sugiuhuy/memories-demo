/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgDeliveried: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.is_deliveried}>
        <svg width="100%" height="100%" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" class={props.class}>
          <path
            d="M12.1212 0.237369C11.8311 -0.0791229 11.3422 -0.0791229 11.0521 0.237369L7.04386 4.60971L8.05496 5.71266L12.1212 1.27701C12.3887 0.985213 12.3887 0.52916 12.1212 0.237369Z"
            fill="currentColor"
          />
          <path
            d="M6.65746 7.23711L8.12044 8.833C8.32456 9.05567 8.66851 9.05567 8.87263 8.833L15.7994 1.277C16.0669 0.985213 16.0669 0.52916 15.7994 0.237369C15.5092 -0.0791229 15.0204 -0.0791219 14.7302 0.23737L8.49654 7.03736L4.94792 3.16637C4.65779 2.84988 4.16892 2.84988 3.87879 3.16637C3.6113 3.45816 3.6113 3.91421 3.87879 4.20601L5.64636 6.13416L4.81838 7.03736L1.26975 3.16637C0.979618 2.84988 0.490754 2.84988 0.200619 3.16637C-0.0668727 3.45816 -0.0668732 3.91421 0.200618 4.20601L4.44227 8.833C4.64639 9.05567 4.99034 9.05567 5.19446 8.833L6.65746 7.23711Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={!props.is_deliveried}>
        <svg width="100%" height="100%" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" class={props.class}>
          <path
            d="M13.4749 1.69944C13.7687 1.39219 13.7687 0.908243 13.4749 0.600997C13.1619 0.273544 12.6389 0.273545 12.3259 0.600997L5.53999 7.69955L1.67409 3.65553C1.36106 3.32808 0.838065 3.32808 0.525034 3.65553C0.231321 3.96278 0.23132 4.44673 0.525032 4.75398L5.17855 9.62192C5.37547 9.82792 5.70447 9.82792 5.90139 9.62193L13.4749 1.69944Z"
            fill="currentColor"
          />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgDeliveried;
