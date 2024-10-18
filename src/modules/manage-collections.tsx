import { Component, For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Input from "~/components/form/input";
import InputNumber from "~/components/form/input-number";
import Radio from "~/components/form/radio";
import Reaction from "~/components/media/reaction";

interface Props {
  src: string;
  value: { unicode: string; speed_animation: number };
  allow_used: { everyone: boolean; followers: boolean };
  disabled?: boolean;
  setValue: SetStoreFunction<{
    unicode: string;
    speed_animation: number;
  }>;
  setAllowUsedBy: SetStoreFunction<{
    everyone: boolean;
    followers: boolean;
  }>;
}

const ManageCollection: Component<Props> = (props) => {
  const allowUsedByRadios: { name: "everyone" | "followers"; title: string }[] = [
    { name: "everyone", title: "Allow used to everyone" },
    { name: "followers", title: "Allow used only to followers" },
  ];

  return (
    <div class="flex flex-col w-full p-3 gap-2">
      <div class="flex w-full gap-3 items-center">
        <div class="flex size-11 p-1.5 bg-[var(--bg-primary)] rounded-lg">
          <Reaction src={props.src} speed_animation={props.value.speed_animation} />
        </div>
        <Input name="unicode" placeholder="Unicode" type="text" value={props.value} setValue={props.setValue} maxlength={10} />
      </div>
      <InputNumber name="speed_animation" value={props.value} setValue={props.setValue} disabled={props.disabled} max={10_000} />
      <div class="flex flex-col w-full p-3 gap-4 border border-solid border-[var(--border-secondary)] rounded-lg">
        <For each={allowUsedByRadios}>
          {(item) => (
            <Radio
              {...item}
              position="right"
              checked={props.allow_used[item.name]}
              value={props.allow_used}
              setValue={props.setAllowUsedBy}
              disabled={props.disabled}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default ManageCollection;
