import { Component, Show, splitProps } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import { spaceNumber } from "~/utilities/formatter";

interface Props {
  name: string;
  placeholder: string;
  value: { [key: string]: any };
  setValue: SetStoreFunction<any>;
  class?: string;
  disabled?: boolean;
  maxlength?: number;
}

const Textarea: Component<Props> = (props) => {
  const [_textAreaProps] = splitProps(props, ["name", "placeholder", "maxlength", "disabled"]);

  const onInputValue = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    props.setValue(
      produce((state: any) => {
        state[target.name as keyof typeof props.value] = target.value;
      })
    );
  };

  return (
    <div class="flex flex-col w-full bg-[var(--bg-secondary)] rounded-lg border border-solid border-[var(--border-secondary)] focus-within:border-blue-600 transition-[border-color]">
      <textarea {..._textAreaProps} value={props.value[props.name]} class={props.class || "flex w-full h-32 p-2"} oninput={onInputValue} />
      <Show when={props.maxlength}>
        <div class="flex w-full justify-end p-2 border-t border-solid border-[var(--border-secondary)]">
          <span class="text-sm text-[var(--text-secondary-hover)]">
            {spaceNumber(props.value[props.name].trim().length)} / {spaceNumber(props.maxlength!)}
          </span>
        </div>
      </Show>
    </div>
  );
};

export default Textarea;
