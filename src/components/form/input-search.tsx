import { Scheduled } from "@solid-primitives/scheduled";
import { Component, createSignal, createUniqueId, Show } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  placeholder: string;
  onDebounced: Scheduled<[value: string]>;
  is_reset?: boolean;
  disabled?: boolean;
  have_border?: boolean;
}

const InputSearch: Component<Props> = (props) => {
  const id = createUniqueId();
  const [value, setValue] = createSignal<string>("");

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    props.onDebounced(target.value);
  };

  const onClear = () => {
    setValue("");
    props.onDebounced("");
  };

  return (
    <div
      class={`flex w-full p-2 gap-2 items-center border-solid border-[var(--border-secondary)] ${
        props.have_border ? "rounded-lg border bg-[var(--bg-secondary)]" : "border-0 bg-transparent"
      }`}
    >
      <Icons name="search" is_visited={value().trim().length > 0} class="flex size-4 aspect-square" />
      <input
        type="text"
        id={id}
        name={id}
        value={value()}
        class={`flex w-full pl-2 border-solid border-[var(--border-secondary)] ${props.have_border ? "border-l" : "border-l-0"}`}
        placeholder={props.placeholder}
        oninput={onInput}
        autocomplete="off"
      />
      <Show when={value().trim().length}>
        <button type="button" class="p-1.5 bg-[var(--bg-primary)] rounded-full" onclick={onClear}>
          <Icons name="cross" class="size-2 aspect-square rotate-45" />
        </button>
      </Show>
    </div>
  );
};

export default InputSearch;
