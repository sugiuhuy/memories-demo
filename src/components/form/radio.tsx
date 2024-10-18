import { Component, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";

interface Props {
  name: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<any>;
  checked: boolean;
  position: "left" | "right";
  title: string;
  description?: string;
  disabled?: boolean;
  is_submit?: boolean;
}

const Radio: Component<Props> = (props) => {
  const onInputValue = () => {
    if (props.disabled) return;
    props.setValue(
      produce((state: any) => {
        // state[props.name as keyof typeof props.value] = !props.value[props.name];

        // Loop through each key in the state and set it to false
        for (const key in state) {
          if (Object.prototype.hasOwnProperty.call(state, key)) {
            state[key] = false;
          }
        }

        // Set the specific state based on the current name to true
        state[props.name as keyof typeof props.value] = true;
      })
    );
  };

  return (
    <button
      type={props.is_submit ? "submit" : "button"}
      class={`flex w-full gap-4 items-center disabled:cursor-not-allowed ${props.position === "left" ? "flex-row" : "flex-row-reverse"}`}
      disabled={props.disabled}
      onclick={onInputValue}
    >
      <div class="flex flex-col w-full">
        <span class="w-full text-start text-md">{props.title}</span>
        <Show when={props.description}>
          <span class="w-full text-start text-xs text-[var(--text-secondary)]">{props.description}</span>
        </Show>
      </div>
      <div class="flex shrink-0 size-5 justify-center items-center aspect-square border border-solid border-[var(--text-primary)] rounded-full">
        <Show when={props.checked} children={<span class="flex size-3 bg-[var(--text-primary)] rounded-full"></span>} />
      </div>
    </button>
  );
};

export default Radio;
