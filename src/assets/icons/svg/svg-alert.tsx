/*
 * copyright 2024. Uhuy party.
 * Please do not resell svg icons without permission.
 *
 * author : Dek sugi
 * email  : sugi.uhuy@gmail.com
 */

import { Component, Match, Switch } from "solid-js";
import { SvgProps } from "~/assets/icons";

const SvgAlert: Component<SvgProps> = (props) => {
  return (
    <Switch>
      <Match when={props.type_alert === "success"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            d="M10.411 2.23377C9.14168 1.70302 7.73268 1.60595 6.40254 1.9576C5.0724 2.30926 3.89546 3.08999 3.05427 4.17872C2.21307 5.26744 1.75463 6.60332 1.75003 7.97915C1.74544 9.35498 2.19496 10.6939 3.02887 11.7882C3.86278 12.8825 5.03448 13.6711 6.36224 14.0316C7.69001 14.3921 9.09963 14.3045 10.3725 13.7822C11.6453 13.2599 12.7103 12.3323 13.4022 11.143C14.0941 9.95384 14.3742 8.56956 14.1992 7.2049C14.1465 6.79405 14.4369 6.41827 14.8477 6.36558C15.2586 6.31288 15.6343 6.60322 15.687 7.01407C15.9041 8.70625 15.5567 10.4228 14.6987 11.8974C13.8408 13.372 12.5202 14.5223 10.9419 15.1699C9.36354 15.8175 7.61561 15.9262 5.96918 15.4792C4.32276 15.0321 2.86985 14.0543 1.8358 12.6974C0.801753 11.3404 0.24435 9.68017 0.250043 7.97414C0.255736 6.26811 0.824208 4.61163 1.86729 3.26161C2.91037 1.91159 4.36977 0.94348 6.01915 0.507426C7.66852 0.0713717 9.41569 0.191744 10.9897 0.849874C11.3718 1.00966 11.5521 1.44899 11.3923 1.83114C11.2325 2.2133 10.7932 2.39356 10.411 2.23377Z"
            fill="currentColor"
          />
          <path
            d="M15.3 3.6C15.6314 3.15817 15.5418 2.53137 15.1 2.2C14.6582 1.86863 14.0314 1.95817 13.7 2.4L7.75 10.3333C7.73728 10.3221 7.72296 10.3088 7.70711 10.2929L5.20711 7.79289C4.81658 7.40237 4.18342 7.40237 3.79289 7.79289C3.40237 8.18342 3.40237 8.81658 3.79289 9.20711L6.29289 11.7071C6.65189 12.0661 7.14124 12.375 7.75 12.375C8.35876 12.375 8.84811 12.0661 9.20711 11.7071L9.25736 11.6569L15.3 3.6Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_alert === "info"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            d="M7 7.5C7 7.22386 7.22386 7 7.5 7H8.5C8.77614 7 9 7.22386 9 7.5V11.5C9 11.7761 8.77614 12 8.5 12H7.5C7.22386 12 7 11.7761 7 11.5V7.5Z"
            fill="currentColor"
          />
          <path
            d="M7.5 4C7.22386 4 7 4.22386 7 4.5V5.5C7 5.77614 7.22386 6 7.5 6H8.5C8.77614 6 9 5.77614 9 5.5V4.5C9 4.22386 8.77614 4 8.5 4H7.5Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8ZM8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_alert === "warning"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            d="M9 8.5C9 8.77614 8.77614 9 8.5 9H7.5C7.22386 9 7 8.77614 7 8.5V4.5C7 4.22386 7.22386 4 7.5 4H8.5C8.77614 4 9 4.22386 9 4.5V8.5Z"
            fill="currentColor"
          />
          <path
            d="M8.5 12C8.77614 12 9 11.7761 9 11.5V10.5C9 10.2239 8.77614 10 8.5 10H7.5C7.22386 10 7 10.2239 7 10.5V11.5C7 11.7761 7.22386 12 7.5 12H8.5Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8ZM8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_alert === "danger"}>
        <svg width="100%" height="100%" viewBox="0 0 16 14" fill="none" class={props.class}>
          <path
            d="M9 8.5C9 8.77614 8.77614 9 8.5 9H7.5C7.22386 9 7 8.77614 7 8.5V5.5C7 5.22386 7.22386 5 7.5 5H8.5C8.77614 5 9 5.22386 9 5.5V8.5Z"
            fill="currentColor"
          />
          <path
            d="M8.5 12C8.77614 12 9 11.7761 9 11.5V10.5C9 10.2239 8.77614 10 8.5 10H7.5C7.22386 10 7 10.2239 7 10.5V11.5C7 11.7761 7.22386 12 7.5 12H8.5Z"
            fill="currentColor"
          />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 14H16L8 0ZM8 2.01556L1.72318 13H14.2768L8 2.01556Z" fill="currentColor" />
        </svg>
      </Match>
      <Match when={props.type_alert === "help"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.002 14.2437C13.1096 14.1805 13.211 14.1027 13.3033 14.0104L14.0104 13.3033C14.1028 13.2109 14.1806 13.1095 14.2438 13.0019C15.3427 11.6321 16 9.89279 16 8C16 6.10715 15.3426 4.36784 14.2437 2.99793C14.1805 2.89037 14.1027 2.789 14.0104 2.69668L13.3033 1.98957C13.2109 1.89724 13.1096 1.81946 13.002 1.75623C11.6321 0.657356 9.89281 0 8 0C6.10718 0 4.36789 0.657365 2.99798 1.75625C2.89042 1.81947 2.78905 1.89725 2.69673 1.98957L1.98962 2.69668C1.89731 2.78899 1.81955 2.89034 1.75633 2.99788C0.657396 4.3678 0 6.10713 0 8C0 9.89281 0.657356 11.6321 1.75623 13.002C1.81945 13.1096 1.89724 13.2109 1.98957 13.3033L2.69668 14.0104C2.789 14.1027 2.89037 14.1805 2.99793 14.2437C4.36784 15.3426 6.10715 16 8 16C9.89284 16 11.6321 15.3426 13.002 14.2437ZM11.3441 14.1511C10.3505 14.6924 9.21117 15 8 15C6.78883 15 5.64951 14.6924 4.65588 14.1511C4.7124 14.1087 4.7666 14.0618 4.818 14.0104L6.17278 12.6556C6.73877 12.8779 7.35513 13 8 13C8.64487 13 9.26123 12.8779 9.82723 12.6556L11.182 14.0104C11.2334 14.0618 11.2876 14.1087 11.3441 14.1511ZM12.6556 9.82715L14.0104 11.182C14.0618 11.2334 14.1087 11.2875 14.1511 11.3441C14.6924 10.3504 15 9.21114 15 8C15 6.78883 14.6924 5.64951 14.1511 4.65588C14.1087 4.7124 14.0618 4.7666 14.0104 4.818L12.6556 6.17278C12.8779 6.73877 13 7.35513 13 8C13 8.64485 12.8779 9.26118 12.6556 9.82715ZM9.82716 3.34437L11.182 1.98957C11.2334 1.93818 11.2876 1.89129 11.3441 1.84891C10.3505 1.30759 9.21115 1 8 1C6.78886 1 5.64955 1.30759 4.65594 1.84891C4.71245 1.89129 4.76665 1.93817 4.81805 1.98957L6.17285 3.34437C6.73882 3.12207 7.35515 3 8 3C8.64485 3 9.26118 3.12207 9.82716 3.34437ZM3.3444 6.17277L1.98962 4.818C1.93822 4.7666 1.89133 4.71239 1.84895 4.65588C1.3076 5.6495 1 6.78883 1 8C1 9.21115 1.30759 10.3505 1.84891 11.3441C1.89129 11.2876 1.93818 11.2334 1.98957 11.182L3.34437 9.82716C3.12207 9.26118 3 8.64485 3 8C3 7.35513 3.12208 6.73877 3.3444 6.17277ZM12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z"
            fill="currentColor"
          />
        </svg>
      </Match>
      <Match when={props.type_alert === "helper"}>
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" class={props.class}>
          <path
            d="M7.23295 9.99432V10.0455H8.25568V9.99432C8.26136 9.64205 8.2983 9.34801 8.36648 9.11222C8.43466 8.87642 8.54403 8.6733 8.6946 8.50284C8.84517 8.32955 9.04545 8.16477 9.29545 8.00852C9.54545 7.85511 9.75852 7.67898 9.93466 7.48011C10.1136 7.28125 10.25 7.0554 10.3438 6.80256C10.4403 6.54972 10.4886 6.26705 10.4886 5.95455C10.4886 5.51136 10.3864 5.11648 10.1818 4.76989C9.98011 4.4233 9.69318 4.15057 9.32102 3.9517C8.9517 3.75284 8.51705 3.65341 8.01705 3.65341C7.55682 3.65341 7.13778 3.74432 6.75994 3.92614C6.38494 4.10795 6.08239 4.37074 5.85227 4.71449C5.625 5.05824 5.5 5.47159 5.47727 5.95455H6.55114C6.57386 5.61932 6.65767 5.34801 6.80256 5.14062C6.94744 4.93324 7.12784 4.78125 7.34375 4.68466C7.55966 4.58807 7.78409 4.53977 8.01705 4.53977C8.28409 4.53977 8.52699 4.59517 8.74574 4.70597C8.96449 4.81676 9.1392 4.97443 9.26989 5.17898C9.40057 5.38352 9.46591 5.625 9.46591 5.90341C9.46591 6.12784 9.42614 6.33239 9.34659 6.51705C9.26989 6.7017 9.16477 6.86506 9.03125 7.0071C8.89773 7.14631 8.74716 7.26705 8.57955 7.36932C8.30114 7.53693 8.0625 7.72017 7.86364 7.91903C7.66477 8.1179 7.51136 8.37784 7.40341 8.69886C7.29545 9.01989 7.23864 9.4517 7.23295 9.99432Z"
            fill="currentColor"
          />
          <path
            d="M7.23722 12.3423C7.38778 12.4929 7.56818 12.5682 7.77841 12.5682C7.92045 12.5682 8.0483 12.5341 8.16193 12.4659C8.27841 12.3949 8.37074 12.3011 8.43892 12.1847C8.50994 12.0682 8.54545 11.9403 8.54545 11.8011C8.54545 11.5909 8.47017 11.4105 8.3196 11.2599C8.16903 11.1094 7.98864 11.0341 7.77841 11.0341C7.56818 11.0341 7.38778 11.1094 7.23722 11.2599C7.08665 11.4105 7.01136 11.5909 7.01136 11.8011C7.01136 12.0114 7.08665 12.1918 7.23722 12.3423Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
            fill="currentColor"
          />
        </svg>
      </Match>
    </Switch>
  );
};

export default SvgAlert;
