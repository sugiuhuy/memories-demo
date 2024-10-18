import { Component, createUniqueId, Match, Switch } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import { accept } from "~/configurations/file-config";
import { mutateStore } from "~/stores/manage";
import { readFile } from "~/utilities/manage-file";

interface Props {
  disabled?: boolean;
  haveFile: boolean;
  setValue: SetStoreFunction<{ files: File[] }>;
}

const SelectFileMessage: Component<Props> = (props) => {
  const id = createUniqueId();
  const mutate = mutateStore();

  const appendToast = (payload: { status: "success" | "danger" | "info" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, ...payload });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const onInput = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (target.files.length > 1) return appendToast({ status: "danger", message: "You can only upload max one file" });

      const results: File[] = Array.from(target.files);
      for (const file of results) {
        if (file.type.startsWith("image/")) {
          const dataUrl = await readFile(file);
          const img = new Image();
          img.src = dataUrl;
        }
      }

      props.setValue(
        produce((state) => {
          state.files = results;
        })
      );
    }

    target.value = "";
  };

  const onRemoveFiles = () => {
    props.setValue(
      produce((state) => {
        state.files = [];
      })
    );
  };

  return (
    <Switch>
      <Match when={!props.haveFile}>
        <input type="file" name="file" id={id} class="hidden" oninput={onInput} multiple={false} accept={accept.all} />
        <label for={id} class="flex mb-0.5 active:text-secondary group/icon cursor-pointer">
          <Icons name="gallery" type_gallery="all" class="size-5 aspect-square group-active/icon:scale-95" />
        </label>
      </Match>
      <Match when={props.haveFile}>
        <button class="flex mb-0.5 active:text-secondary group/icon disabled:cursor-not-allowed" onclick={onRemoveFiles} disabled={props.disabled}>
          <Icons name="trash" class="size-5 aspect-square group-active/icon:scale-95 text-red-600" />
        </button>
      </Match>
    </Switch>
  );
};

export default SelectFileMessage;
