import { Component } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";

interface Props {
  name: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<any>;
  max?: number;
  disabled?: boolean;
}

const InputNumber: Component<Props> = (props) => {
  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const targetValue: number = target.value as any;

    props.setValue(
      produce((state: any) => {
        state[props.name] = !targetValue ? 0 : targetValue;
      })
    );
  };

  const onIncrement = () => {
    props.setValue(
      produce((state: any) => {
        if (state[props.name] + 100 > props.max!) {
          state[props.name] = 50000;
        } else {
          state[props.name] += 100;
        }
      })
    );
  };

  const onDecrement = () => {
    props.setValue(
      produce((state: any) => {
        if (state[props.name] - 100 < 0) {
          state[props.name] = 0;
        } else {
          state[props.name] -= 100;
        }
      })
    );
  };

  return (
    <div class="flex w-full rounded-lg items-center overflow-hidden bg-[var(--bg-primary-active)]">
      <button
        type="button"
        class="px-2 shrink-0 text-neutral-50 active:scale-95 disabled:cursor-not-allowed"
        onclick={onDecrement}
        disabled={props.disabled}
      >
        <Icons name="arrow" class="size-4 rotate-270" />
      </button>
      <label
        class={`flex py-1 px-2 w-full max-w-full items-center justify-center bg-[var(--bg-primary)] ${false ? "cursor-not-allowed" : "cursor-text"}`}
      >
        <div class="relative inline-block max-w-full h-full overflow-hidden">
          <span class="whitespace-pre relative opacity-0 min-w-[2px] select-none align-top">{props.value[props.name]}</span>
          <input
            id="speed-time"
            type="number"
            name="speedAnimation"
            min={0}
            max={props.max}
            value={props.value[props.name]}
            oninput={onInput}
            class={`text-ellipsis bg-transparent h-full absolute top-0 left-0 w-full disabled:text-[var(--text-secondary-hover)] ${
              props.disabled ? "pointer-events-none" : "pointer-events-auto"
            }`}
            disabled={props.disabled}
          />
        </div>
        <span class="ml-0.5 text-sm text-[var(--text-secondary)] pointer-events-none select-none">ms</span>
      </label>
      <button
        type="button"
        class="px-2 shrink-0 text-neutral-50 active:scale-95 disabled:cursor-not-allowed"
        onclick={onIncrement}
        disabled={props.disabled}
      >
        <Icons name="arrow" class="size-4 rotate-90" />
      </button>
    </div>
  );
};

export default InputNumber;
