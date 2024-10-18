import { Component, createSignal, createUniqueId, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import { accept } from "~/configurations/file-config";

interface Props {
  setValue: SetStoreFunction<{ files: File[] }>;
}

const SelectFileCollection: Component<Props> = (props) => {
  const id = createUniqueId();
  const [isDragging, setIsDragging] = createSignal<boolean>(false);

  const onDragEnter = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
  };

  const onDrop = (Event: DragEvent) => {
    Event.preventDefault();
    Event.stopPropagation();
    setIsDragging(false);

    const target = Event.dataTransfer;
    const results: File[] = Array.from(target!.files);
    props.setValue(
      produce((state) => {
        state.files = results;
      })
    );
  };

  const onInput = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLInputElement;
    const results: File[] = Array.from(input.files!);
    props.setValue(
      produce((state) => {
        state.files = results;
      })
    );

    input.value = "";
  };

  return (
    <div
      class="flex flex-col size-full max-w-80 max-h-80 aspect-square items-center justify-center"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input type="file" name="media_file" id={id} class="hidden" oninput={onInput} accept={accept.images} />
      <Icons
        name="gallery"
        type_gallery="picture"
        class="size-full max-w-24 max-h-24 aspect-square text-[var(--text-secondary-hover)] pointer-events-none"
      />
      <span class="text-center tex-sm mt-1 text-[var(--text-secondary-hover)] pointer-events-none select-none">Drop files here</span>
      <Show when={!isDragging()}>
        <label
          for={id}
          class="flex w-fit text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 py-2 px-4 mt-7 rounded-lg select-none cursor-pointer"
        >
          Select file
        </label>
      </Show>
    </div>
  );
};

export default SelectFileCollection;
