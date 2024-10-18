import { Component, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import SelectFileMessage from "~/components/form/select-file-message";
import TiptapText from "~/components/form/tiptap-text";
import { MimeTypes } from "~/configurations/file-config";
import { mutateStore, selectStore } from "~/stores/manage";

interface Props {
  value: { in_conversation: string; get_html: string; get_text: string; files: File[] };
  setValue: SetStoreFunction<{ in_conversation: string; get_html: string; get_text: string; files: File[] }>;
}

const ManageMessage: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const onClearValue = () => {
    props.setValue(
      produce((state) => {
        state.files = [];
        state.get_html = "";
        state.get_text = "";
      })
    );
  };

  const onSubmitSendMessage = (e: Event) => {
    e.preventDefault();

    mutate(
      "findMessages",
      produce((states) => {
        states.push({
          _id: `${Date.now()}`,
          createdAt: new Date(),
          file: !props.value.files.length ? null : { file_type: props.value.files[0].type, src: URL.createObjectURL(props.value.files[0]) },
          get_html: props.value.get_html,
          get_text: props.value.get_text,
          is_read: false,
          sender: {
            _id: auth()._id,
            avatar: auth().avatar,
            display: auth().display,
            is_verified: auth().is_verified,
            name: auth().name,
            username: auth().username,
          },
        });
      })
    );
    onClearValue();
  };

  return (
    <form onsubmit={onSubmitSendMessage} class="relative flex w-full gap-2 items-center">
      <Show when={props.value.files.length > 0}>
        <div class="absolute z-[1] bottom-[calc(100%+1.5rem)] flex w-full justify-center p-2">
          <Show when={MimeTypes.images.includes(props.value.files[0].type)} fallback={"Invalid file types"}>
            <img src={URL.createObjectURL(props.value.files[0])} alt="preview" class="flex h-full max-h-md" />
          </Show>
        </div>
      </Show>
      <div class="flex h-full items-end">
        <SelectFileMessage setValue={props.setValue} haveFile={props.value.files.length > 0} />
      </div>
      <div class="flex w-full max-h-32 p-2 bg-[var(--bg-secondary)] outline outline-1 outline-[var(--border-primary)] rounded-lg overflow-hidden">
        <div class="flex w-full h-full max-h-32 overflow-hidden">
          <div class="w-full h-full max-h-32 overflow-auto">
            <TiptapText
              {...props}
              maxlength={150}
              placeholder="write message..."
              auto_focuse={false}
              clear_content={!props.value.get_text.trim().length}
            />
          </div>
        </div>
      </div>
      <div class="flex h-full items-end">
        <button
          class="flex shrink-0 enabled:group/icon mb-2 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
          disabled={!props.value.in_conversation.trim().length || !props.value.get_text.trim().length}
        >
          <Icons name="paperPlane" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
        </button>
      </div>
    </form>
  );
};

export default ManageMessage;
