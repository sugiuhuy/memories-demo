import { Component } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";

interface Props {
  name: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<any>;
  disabled?: boolean;
  is_submit?: boolean;
}

const Switcher: Component<Props> = (props) => {
  const onInputValue = () => {
    if (props.disabled) return;
    props.setValue(
      produce((state: any) => {
        state[props.name as keyof typeof props.value] = !props.value[props.name];
      })
    );
  };

  return (
    <button
      type={props.is_submit ? "submit" : "button"}
      class={`relative flex shrink-0 w-11 h-6 items-center rounded-full ${props.value[props.name] ? "bg-blue-600" : "bg-[var(--text-primary)]"}`}
      onclick={onInputValue}
      disabled={props.disabled}
    >
      <span
        class={`absolute flex size-5 rounded-full transition-[left] ${
          props.value[props.name] ? "left-[calc(100%-1.4rem)] bg-neutral-50" : "left-0.5 bg-[var(--bg-primary)]"
        }`}
      ></span>
    </button>
  );
};

export default Switcher;
