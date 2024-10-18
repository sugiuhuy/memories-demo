import { Component, createEffect, createSignal, For, Setter, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import { imageRatio } from "~/configurations/file-config";
import DropdownContainer from "~/containers/dropdown-container";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  file_name: string;
  file_options: { [key: string]: { image_ratio?: string } };
  setIsBussy: Setter<boolean>;
  setValue: SetStoreFunction<{
    file_options: { [key: string]: { image_effect?: string; image_ratio?: string; tagged: searchUsersProps[] } };
  }>;
}

const SwitchMediaRatio: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const onChangeRatio = (name: string) => {
    props.setValue(
      produce((state) => {
        state.file_options[props.file_name].image_ratio = name;
      })
    );
  };

  createEffect(() => {
    if (!isOpen()) {
      props.setIsBussy(false);
    }
  });

  return (
    <DropdownContainer is_open={isOpen()} setIsOpen={setIsOpen}>
      <button
        class={`flex size-8 aspect-square shrink-0 p-2 rounded-full backdrop-blur-xl group/icon ${isOpen() ? "bg-blue-600" : "bg-[rgba(0,0,0,0.8)]"}`}
        onclick={() => {
          setIsOpen(!isOpen());
          props.setIsBussy(true);
        }}
      >
        <Icons name="gallery" type_gallery="picture" class="group-active/icon:scale-95 text-neutral-50" />
      </button>
      <div
        class={`absolute top-[calc(100%+0.25rem)] right-0 flex flex-col p-3 gap-3 bg-[var(--bg-primary)] rounded-lg origin-top-right transition-[transform,opacity] border border-solid border-[var(--border-secondary)] ${
          isOpen() ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
        }`}
      >
        <For each={imageRatio}>
          {(item) => (
            <button class="flex w-full gap-4 items-center disabled:cursor-not-allowed" onclick={() => onChangeRatio(item)}>
              <div class="flex shrink-0 size-5 justify-center items-center aspect-square border border-solid border-[var(--text-primary)] rounded-full">
                <Show
                  when={props.file_options[props.file_name].image_ratio === item}
                  children={<span class="flex size-3 bg-[var(--text-primary)] rounded-full"></span>}
                />
              </div>
              <span class="flex w-20 text-start text-md capitalize">{item}</span>
            </button>
          )}
        </For>
      </div>
    </DropdownContainer>
  );
};

export default SwitchMediaRatio;
