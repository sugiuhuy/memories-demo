import { Component, createSignal, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import SelectFileCollection from "~/components/form/select-file-collection";
import AlertContainer from "~/containers/alert-container";
import ModalContainer from "~/containers/modal-container";
import PopupContainer from "~/containers/popup-container";
import ManageCollection from "~/modules/manage-collections";
import { mutateStore } from "~/stores/manage";

interface Props {
  onClose: () => void;
  onSwitchPopup: (target: "help") => void;
}

const CreateCollectionPopup: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [isOpenAlert, setIsOpenAlert] = createSignal<boolean>(false);
  const [value, setValue] = createStore<{ unicode: string; speed_animation: number; files: File[] }>({ unicode: "", speed_animation: 0, files: [] });
  const [allowUsedBy, setAllowUsedBy] = createStore<{ everyone: boolean; followers: boolean }>({ everyone: true, followers: false });

  const onClose = () => {
    if (isOpenAlert()) return;
    if (value.files.length > 0 && !isOpenAlert()) return setIsOpenAlert(true);

    props.onClose();
  };

  const onBack = () => {
    if (!value.files.length) return props.onClose();
    if (value.files.length > 0) return setIsOpenAlert(true);
  };

  const onNext = () => {
    mutate(
      "findCollections",
      produce((states) => {
        states.push({
          _id: `${Date.now()}`,
          allow_used: allowUsedBy,
          count_used: 0,
          speed_animation: value.speed_animation,
          unicode: value.unicode,
          src: URL.createObjectURL(value.files[0]),
        });
      })
    );
    props.onClose();
  };

  return (
    <>
      <ModalContainer class="flex flex-col w-full max-w-80 animate-zoom-out" onClose={onClose}>
        <div class="flex w-full p-3 items-center">
          <div class="flex w-full">
            <Switch>
              <Match when={value.files.length === 0}>
                <button class="flex group/icon" onclick={() => props.onSwitchPopup("help")}>
                  <Icons
                    name="alert"
                    type_alert="helper"
                    class="size-4 aspect-square group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                  />
                </button>
              </Match>
              <Match when={value.files.length > 0}>
                <button class="flex group/icon" onclick={onBack}>
                  <Icons
                    name="arrow"
                    class="size-4 aspect-square rotate-270 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                  />
                </button>
              </Match>
            </Switch>
          </div>
          <div class="flex justify-center shrink-0">
            <Show when={value.files.length > 0} fallback={"Select file"} children={"Config your reaction"} />
          </div>
          <div class="flex w-full justify-end">
            <Switch>
              <Match when={!value.files.length}>
                <button class="flex group/icon justify-end" onclick={onClose}>
                  <Icons
                    name="cross"
                    class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                  />
                </button>
              </Match>
              <Match when={value.files.length > 0}>
                <button
                  class="flex group/submit text-blue-600 active:text-blue-700 disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed justify-end"
                  onclick={onNext}
                  disabled={!value.unicode.trim().length}
                >
                  Create
                </button>
              </Match>
            </Switch>
          </div>
        </div>
        <Switch>
          <Match when={!value.files.length}>
            <SelectFileCollection setValue={setValue} />
          </Match>
          <Match when={value.files.length > 0}>
            <ManageCollection
              src={URL.createObjectURL(value.files[0])}
              value={value}
              setValue={setValue}
              allow_used={allowUsedBy}
              setAllowUsedBy={setAllowUsedBy}
            />
          </Match>
        </Switch>
      </ModalContainer>
      <PopupContainer is_open={isOpenAlert()}>
        <AlertContainer type_alert="warning" description="If you leave, your current progress won't be saved">
          <button
            class="flex w-full px-2 py-3 border-r border-solid border-[var(--border-secondary)] justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={() => setIsOpenAlert(false)}
          >
            <span class="text-base">Cancel</span>
          </button>
          <button
            class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={props.onClose}
          >
            <span class="text-base">Discard</span>
          </button>
        </AlertContainer>
      </PopupContainer>
    </>
  );
};

export default CreateCollectionPopup;
