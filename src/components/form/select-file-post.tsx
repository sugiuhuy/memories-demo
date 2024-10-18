import { Component, createSignal, createUniqueId, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import { accept, MimeTypes } from "~/configurations/file-config";
import { mutateStore } from "~/stores/manage";
import { searchUsersProps } from "~/types/user-interfaces";
import { filterFiles } from "~/utilities/manage-file";

interface Props {
  setValue: SetStoreFunction<{
    files: File[];
    file_options: { [key: string]: { image_effect?: string; image_ratio?: string; tagged: searchUsersProps[] } };
  }>;
}

const SelectFilePost: Component<Props> = (props) => {
  const mutate = mutateStore();

  const id = createUniqueId();
  const [isDragging, setIsDragging] = createSignal<boolean>(false);

  const onSelectFiles = (files: File[]) => {
    const fileType = filterFiles(files);
    const errorMessages = [
      "You can only upload max 10 files",
      "Ups! there something unknwon files",
      "You can only upload max 10 images",
      "You can only upload max one video",
    ];

    if (files.length > 10 || fileType.unknown > 0 || fileType.image > 10 || fileType.video > 1) {
      return mutate(
        "toasts",
        produce((states) => {
          const id = states.length + 1;

          states.push({
            id,
            status: "warning",
            message: errorMessages[fileType.unknown > 0 ? 1 : fileType.image > 10 ? 2 : fileType.video > 1 ? 3 : 0],
          });
          states.sort((a, b) => b.id - a.id);
        })
      );
    }

    props.setValue(
      produce((state) => {
        files.forEach((file) => {
          if (MimeTypes.images.includes(file.type)) {
            const item = {
              image_effect: "effect-normal",
              image_ratio: "cover",
              tagged: [],
            };

            state.file_options[file.name] = item;
          }

          if (MimeTypes.videos.includes(file.type)) {
            const item = {
              tagged: [],
            };

            state.file_options[file.name] = item;
          }
        });

        state.files = files;
      })
    );
  };

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
    onSelectFiles(results);
  };

  const onInput = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLInputElement;
    const results: File[] = Array.from(input.files!);
    onSelectFiles(results);

    input.value = "";
  };

  return (
    <div
      class="flex flex-col w-full h-full p-2 items-center justify-center"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input type="file" name="media_file" id={id} class="hidden" oninput={onInput} accept={accept.all} multiple />
      <Icons name="gallery" type_gallery="all" class="size-full max-w-32 max-h-32 aspect-square text-[var(--text-secondary)] pointer-events-none" />
      <span class="text-center tex-sm mt-1 text-[var(--text-secondary)] pointer-events-none select-none">Drop files here</span>
      <Show when={!isDragging()}>
        <label
          for={id}
          class="flex w-fit text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 py-2 px-4 mt-7 rounded-lg select-none cursor-pointer"
        >
          Select files
        </label>
      </Show>
    </div>
  );
};

export default SelectFilePost;
