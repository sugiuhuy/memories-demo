import { ParentComponent } from "solid-js";
import { produce } from "solid-js/store";
import { accept } from "~/configurations/file-config";
import { mutateStore } from "~/stores/manage";
import { filterFiles, readFile } from "~/utilities/manage-file";

interface Props {
  class: string;
}

const ChangeAvatar: ParentComponent<Props> = (props) => {
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

  const onSubmit = (payload: File[]) => {
    if (payload.length > 1) return appendToast({ status: "danger", message: "You can only select one file" });

    const fileType = filterFiles(payload);
    if (fileType.unknown > 0) return appendToast({ status: "danger", message: "Ups! there something unknwon files" });
    if (fileType.image > 1) return appendToast({ status: "danger", message: "You can only upload max one image" });
    if (fileType.video > 0) return appendToast({ status: "danger", message: "You are not allowed to upload a video" });

    mutate("auth", "avatar", URL.createObjectURL(payload[0]));
  };

  const onInput = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const results: File[] = Array.from(target.files);
      for (const file of results) {
        if (file.type.startsWith("image/")) {
          const dataUrl = await readFile(file);
          const img = new Image();
          img.src = dataUrl;
        }
      }

      onSubmit(results);
    }

    target.value = "";
  };

  return (
    <>
      <input id="avatar" type="file" class="hidden group/icon" oninput={onInput} multiple={false} accept={accept.images} />
      <label for="avatar" class={props.class}>
        {props.children}
      </label>
    </>
  );
};

export default ChangeAvatar;
