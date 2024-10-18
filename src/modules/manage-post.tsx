import { Component, For, Setter, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import TiptapText from "~/components/form/tiptap-text";

interface Props {
  value: { get_html: string; get_text: string; is_active_comment: boolean; is_active_reaction: boolean };
  setValue: SetStoreFunction<{ get_html: string; get_text: string; is_active_comment: boolean; is_active_reaction: boolean }>;
  setIsBussy?: Setter<boolean>;
}

const ManagePost: Component<Props> = (props) => {
  const maxLength = 1000;

  const onChecked = (payload: "is_active_comment" | "is_active_reaction") => {
    props.setValue(
      produce((state) => {
        state[payload] = !props.value[payload];
      })
    );
  };

  const options: { name: "is_active_comment" | "is_active_reaction"; title: string }[] = [
    { name: "is_active_comment", title: "Active comment sections" },
    { name: "is_active_reaction", title: "Active reaction" },
  ];

  return (
    <div class="flex flex-col w-full h-full p-2 gap-3 overflow-hidden">
      <div class="flex flex-col w-full h-full text-[var(--text-primary)] bg-[var(--bg-primary)] rounded-lg p-2 gap-2 overflow-hidden">
        <div class="flex w-full h-full overflow-hidden">
          <div class="flex w-full h-full">
            <div class="w-full h-full overflow-auto">
              <TiptapText
                value={props.value}
                setValue={props.setValue}
                setIsBussy={props.setIsBussy}
                maxlength={maxLength}
                placeholder="write captions..."
                auto_focuse
              />
            </div>
          </div>
        </div>
        <div class="flex w-full pt-2 items-center justify-end border-t border-solid border-[var(--border-primary)]">
          <div class="text-sm text-[var(--text-secondary)]">
            {props.value.get_text.trim().length.toLocaleString("en-US")} / {maxLength.toLocaleString("en-US")}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full p-3 gap-3 border border-solid border-[var(--border-secondary)] rounded-lg">
        <For each={options}>
          {(option) => (
            <button class="flex w-full gap-4 items-center disabled:cursor-not-allowed" onclick={() => onChecked(option.name)}>
              <div class="flex shrink-0 size-5 justify-center items-center aspect-square border border-solid border-[var(--text-primary)] rounded-md">
                <Show when={props.value[option.name]} children={<span class="flex size-3 bg-[var(--text-primary)] rounded-sm"></span>} />
              </div>
              <span class="flex w-full text-start text-md">{option.title}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default ManagePost;
