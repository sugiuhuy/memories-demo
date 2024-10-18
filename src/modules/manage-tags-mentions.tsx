import { Component, For, onMount } from "solid-js";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import Radio from "~/components/form/radio";
import { mutateStore } from "~/stores/manage";

interface Props {
  allow_mentioned_from: { private: boolean; on: boolean; off: boolean };
  allow_tagged_from: { private: boolean; on: boolean; off: boolean };
}

const ManageTagsMentions: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [allowTaggedFrom, setAllowTaggedFrom] = createStore<{ private: boolean; on: boolean; off: boolean }>({
    off: false,
    on: false,
    private: false,
  });

  const [allowMentionedFrom, setAllowMentionedFrom] = createStore<{ private: boolean; on: boolean; off: boolean }>({
    off: false,
    on: false,
    private: false,
  });

  const onSubmitManageTagsMentions = (e: Event) => {
    e.preventDefault();

    mutate(
      "auth",
      produce((state) => {
        state!.allow_mentioned_from = allowMentionedFrom;
        state!.allow_tagged_from = allowTaggedFrom;
      })
    );
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, status: "success", message: "Setting has been saved" });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const inputs: {
    name: string;
    description: string;
    value: { private: boolean; on: boolean; off: boolean };
    setValue: SetStoreFunction<{ private: boolean; on: boolean; off: boolean }>;
    inputs: { name: "private" | "on" | "off"; title: string }[];
  }[] = [
    {
      name: "Who can tag you",
      description: "Choose who can tag you in their memories photos. When people try to tag you, they'll see if you don't allow tags from everyone.",
      value: allowTaggedFrom,
      setValue: setAllowTaggedFrom,
      inputs: [
        { name: "on", title: "Allow tags from everyone" },
        { name: "private", title: "Allow tags from people you follow" },
        { name: "off", title: "Don't allow tags" },
      ],
    },
    {
      name: "Who can @mention you",
      description:
        "Choose who can @mention you to link your account in their memories and comments. When people try to @mention you, they'll see if you don't allow @mentions.",
      value: allowMentionedFrom,
      setValue: setAllowMentionedFrom,
      inputs: [
        { name: "on", title: "Allow tags from everyone" },
        { name: "private", title: "Allow tags from people you follow" },
        { name: "off", title: "Don't allow tags" },
      ],
    },
  ];

  onMount(() => {
    setAllowTaggedFrom(props.allow_mentioned_from);
    setAllowMentionedFrom(props.allow_tagged_from);
  });

  return (
    <form onsubmit={onSubmitManageTagsMentions} class="flex flex-col w-full max-lg:p-2 gap-6">
      <For each={inputs}>
        {(input) => (
          <div class="flex flex-col w-full gap-2">
            <div class="flex flex-col w-full">
              <span class="text-md">{input.name}</span>
              <span class="text-xs text-[var(--text-secondary)]">{input.description}</span>
            </div>
            <div class="flex flex-col w-full p-5 gap-7 border border-solid border-[var(--border-primary)] rounded-lg">
              <For each={input.inputs}>
                {(item) => (
                  <Radio {...item} position="left" checked={input.value[item.name]} value={input.value} setValue={input.setValue} is_submit />
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </form>
  );
};

export default ManageTagsMentions;
