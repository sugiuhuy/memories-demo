import { Component, createSignal, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";

interface Props {
  type: "text" | "password";
  name: string;
  placeholder: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<any>;
  maxlength?: number;
  disabled?: boolean;
}

const Input: Component<Props> = (props) => {
  const [isShowPassword, setIsShowPassword] = createSignal<boolean>(false);
  const onInputValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    props.setValue(
      produce((state: any) => {
        state[target.name as keyof typeof props.value] = target.value;
      })
    );
  };

  return (
    <label
      class={`flex w-full bg-[var(--bg-secondary)] rounded-lg border border-solid border-[var(--border-secondary)] focus-within:border-blue-600 transition-[border-color] py-1 gap-1 items-center ${
        props.disabled ? "cursor-not-allowed" : "cursor-text"
      }`}
    >
      <div class={`relative flex items-center w-full h-[38px] overflow-hidden ${props.disabled ? "pointer-events-none" : "pointer-events-auto"}`}>
        <input
          type={props.type === "password" && isShowPassword() ? "text" : props.type}
          name={props.name}
          class={`w-full px-2 text-ellipsis align-middle disabled:text-[var(--text-secondary)] ${
            !props.value[props.name].trim().length ? "pt-[0] pb-[7]" : "pt-[14px] pb-[2px] text-[12px]"
          }`}
          value={props.value[props.name]}
          oninput={onInputValue}
          maxlength={props.maxlength}
          disabled={props.disabled}
          autocomplete="off"
        />
        <div
          class={`absolute w-full text-ellipsis truncate origin-left pointer-events-none transition-transform text-[var(--text-secondary-hover)] text-[12px] px-2 select-none ${
            !props.value[props.name].trim().length ? "scale-100 translate-y-0" : "scale-[calc(10/12)] -translate-y-[10px]"
          }`}
        >
          {props.placeholder}
        </div>
      </div>
      <Show when={props.type === "password"}>
        <Tooltip
          text={isShowPassword() ? "Password is showing" : "Password are hidden"}
          class={`size-5 aspect-square mr-2 cursor-pointer active:text-[var(--text-secondary)] shrink-0 ${
            props.disabled ? "pointer-events-none text-[var(--text-secondary-hover)]" : "pointer-events-auto"
          }`}
          onclick={() => setIsShowPassword(!isShowPassword())}
        >
          <Icons name="eye" is_active={isShowPassword()} />
        </Tooltip>
      </Show>
    </label>
  );
};

export default Input;
