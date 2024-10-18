import { Editor } from "@tiptap/core";
import EditorCharacterCount from "@tiptap/extension-character-count";
import EditorLink from "@tiptap/extension-link";
import EditorPlaceHolder from "@tiptap/extension-placeholder";
import EditorMention from "@tiptap/extension-mention";
import StarterKit from "@tiptap/starter-kit";
import { Component, createEffect, createUniqueId, onCleanup, onMount, Setter } from "solid-js";
import tippy, { GetReferenceClientRect } from "tippy.js";
import { selectStore } from "~/stores/manage";
import { SetStoreFunction } from "solid-js/store";
import { generateSearchUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";

interface Props {
  placeholder: string;
  value: { get_html: string; get_text: string };
  setValue: SetStoreFunction<{ get_html: string; get_text: string }>;
  setIsBussy?: Setter<boolean>;
  maxlength?: number;
  auto_focuse?: boolean;
  clear_content?: boolean;
  onTyping?: (value: boolean) => void;
}

const TiptapText: Component<Props> = (props) => {
  let editor!: Editor;
  const auth = selectStore((store) => store.auth!);
  const id = createUniqueId();

  onMount(() => {
    editor = new Editor({
      element: document.querySelector(`#${id}`) as HTMLElement,
      extensions: [
        StarterKit.configure({
          blockquote: false,
          bold: false,
          bulletList: false,
          dropcursor: false,
          gapcursor: false,
          codeBlock: {
            exitOnArrowDown: false,
            exitOnTripleEnter: false,
          },
          heading: false,
          history: false,
          horizontalRule: false,
          italic: false,
          listItem: false,
          orderedList: false,
          strike: false,
        }),
        EditorLink.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            class: "text-blue-600 active:text-blue-700 no-underline",
          },
        }),
        EditorCharacterCount.configure({
          limit: props.maxlength,
        }),
        EditorPlaceHolder.configure({
          placeholder: props.placeholder,
          emptyEditorClass:
            "text-[var(--text-secondary-hover)] first:before:content-[attr(data-placeholder)] first:before:float-left first:before:h-0 first:before:pointer-events-none",
        }),
        EditorMention.configure({
          HTMLAttributes: {
            class: "bg-blue-600 active:bg-blue-700 rounded-lg py-1 px-2 text-neutral-50",
          },
          deleteTriggerWithBackspace: true,
          suggestion: {
            items: (props) => {
              const users = generateSearchUsers({ count: userNames.length, exclude: auth()._id });
              return users.filter((item) => item.name.toLowerCase().startsWith(props.query.toLowerCase())).slice(0, 5);
            },

            render: () => {
              let component: any;
              let popup: any;

              return {
                onStart: (_props) => {
                  if (_props.items.length === 0) {
                    return;
                  }

                  if (props.setIsBussy) {
                    props.setIsBussy(true);
                  }

                  component = document.createElement("div");
                  component.classList.add("mention-suggestion");

                  _props.items.forEach((item) => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionItem.textContent = `@${item.name}`;

                    suggestionItem.addEventListener("click", () => {
                      _props.command({ id: item.id, label: item.name });
                    });

                    component.appendChild(suggestionItem);
                  });

                  popup = tippy("body", {
                    getReferenceClientRect: _props.clientRect as GetReferenceClientRect,
                    appendTo: () => document.body,
                    content: component,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                  });
                },
                onUpdate: (_props) => {
                  if (_props.items.length === 0) {
                    popup[0].hide(); // Sembunyikan popup jika item kosong saat update
                    return;
                  }

                  while (component.firstChild) {
                    component.removeChild(component.firstChild);
                  }

                  _props.items.forEach((item) => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionItem.textContent = `@${item.name}`;

                    suggestionItem.addEventListener("click", () => {
                      _props.command({ id: item.id, label: item.name });
                    });

                    component.appendChild(suggestionItem);
                  });

                  popup[0].setProps({
                    getReferenceClientRect: _props.clientRect as GetReferenceClientRect,
                  });
                },
                onKeyDown: (_props) => {
                  if (_props.event.key === "Escape") {
                    popup[0].hide();
                    return true;
                  }
                  return false;
                },
                onExit: () => {
                  popup[0].destroy();

                  if (props.setIsBussy) {
                    props.setIsBussy(false);
                  }
                },
              };
            },
          },
        }),
      ],
      autofocus: props.auto_focuse,
      content: props.value.get_html,
      editorProps: {
        attributes: {
          class: "w-full outline-0",
        },
      },
      onUpdate: (result) => {
        props.setValue("get_text", result.editor.getText());
        props.setValue("get_html", result.editor.getHTML());
      },
      onFocus: () => {
        if (props.onTyping) return props.onTyping(true);
      },
      onBlur: () => {
        if (props.onTyping) return props.onTyping(false);
      },
    });
  });

  onCleanup(() => {
    if (!props.value) {
      editor.destroy();
    }
  });

  createEffect(() => {
    if (props.clear_content) {
      editor.commands.clearContent();
    }
  });

  return <div id={id} />;
};

export default TiptapText;
