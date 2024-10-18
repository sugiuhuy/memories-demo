import { Component, Show } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";
import { mutateStore } from "~/stores/manage";
import { getProfileProps } from "~/types/user-interfaces";

interface Props extends getProfileProps {
  onClose: () => void;
  onSwitchPopup: (target: "report") => void;
}

const ProfileOptionsPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const onAppendToas = (message: string) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, status: "success", message });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const onSubmitBlock = () => {
    onAppendToas(!props.is_block ? "User has been unblock" : "User has been blocked");
    mutate(
      "getProfile",
      produce((state) => {
        state!.is_block = !props.is_block;
      })
    );
  };

  const onSubmitMute = () => {
    onAppendToas(!props.is_mute ? "User has been unmute" : "User has been muted");
    mutate(
      "getProfile",
      produce((state) => {
        state!.is_mute = !props.is_mute;
      })
    );
  };

  const onSubmitPersonalize = () => {
    onAppendToas(!props.is_personalize ? "User has been unpersonalize" : "User has been personalized");
    mutate(
      "getProfile",
      produce((state) => {
        state!.is_personalize = !props.is_personalize;
      })
    );
  };

  return (
    <ModalContainer class="flex flex-col w-full max-w-72 animate-zoom-in" onClose={props.onClose}>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={() => props.onSwitchPopup("report")}
        >
          <span class="text-rose-600">Report</span>
          <Icons name="report" class="size-4 aspect-square text-rose-600" />
        </button>
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={onSubmitBlock}
        >
          <span class="text-rose-600">
            <Show when={props.is_block} fallback={"Block"} children={"Unblock"} />
          </span>
          <Icons name="user" type_user="block" class="size-4 aspect-square text-rose-600" />
        </button>
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={onSubmitMute}
        >
          <span class="text-rose-600">
            <Show when={props.is_mute} fallback={"Mute"} children={"Unmute"} />
          </span>
          <Icons name="user" type_user="mute" class="size-4 aspect-square text-rose-600" />
        </button>
        <Show when={props.is_follow}>
          <button
            class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
            onclick={onSubmitPersonalize}
          >
            <span class="text-blue-600">
              <Show when={props.is_personalize} fallback={"Personalize"} children={"Personalized"} />
            </span>
            <Icons name="personalize" is_active={props.is_personalize} class="size-4 aspect-square text-blue-600" />
          </button>
        </Show>
      </div>
      <div class="flex flex-col w-full p-2">
        <button
          class="flex w-full p-3 justify-between items-center hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-hover)] rounded-lg"
          onclick={props.onClose}
        >
          <span>Cancel</span>
          <Icons name="cross" class="size-4 rotate-45 aspect-square" />
        </button>
      </div>
    </ModalContainer>
  );
};

export default ProfileOptionsPopup;
