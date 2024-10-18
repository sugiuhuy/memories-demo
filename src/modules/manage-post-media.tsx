import { Component, createEffect, createSignal, For, Match, Setter, Show, Switch } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import SwitchMediaRatio from "~/components/form/switch-media-ratio";
import Avatar from "~/components/media/avatar";
import ImageEffect from "~/components/media/image-effect";
import Video from "~/components/media/video";
import FindTaggedUsersPopup from "~/components/popup/find-tagged-users-popup";
import { imageEffectOptions, MimeTypes } from "~/configurations/file-config";
import PopupContainer from "~/containers/popup-container";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  file: File;
  file_options: { [key: string]: { image_effect?: string; image_ratio?: string; tagged: searchUsersProps[] } };
  setIsBussy: Setter<boolean>;
  setValue: SetStoreFunction<{
    files: File[];
    file_options: { [key: string]: { image_effect?: string; image_ratio?: string; tagged: searchUsersProps[] } };
  }>;
}

const ManagePostMedia: Component<Props> = (props) => {
  let elRef: HTMLDivElement | undefined;

  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [isDraggable, setIsDraggable] = createSignal<boolean>(false);
  const [isDisabled, setIsDisabled] = createSignal<boolean>(false);

  const onDragging = (event: MouseEvent) => {
    if (!isDraggable()) return;

    setIsDisabled(true);
    elRef!.scrollLeft -= event.movementX;
  };

  const onUnDragging = () => {
    setIsDraggable(false);
    setIsDisabled(false);
  };

  const onChangeEffect = (effect: string) => {
    props.setValue(
      produce((state) => {
        state.file_options[props.file.name].image_effect = effect;
      })
    );
  };

  createEffect(() => {
    if (!isOpen()) {
      props.setIsBussy(false);
    }
  });

  return (
    <>
      <div class="relative flex w-full h-full shrink-0">
        <div class="absolute z-[1] top-1 flex w-full p-2">
          <div class="flex w-full">
            <For each={props.file_options[props.file.name].tagged}>
              {(user) => (
                <Tooltip text={user.name} class="relative flex first:ml-0 -ml-2">
                  <Avatar {...user} class="size-8 text-xs outline outline-2 outline-white" />
                  <Show when={user.is_verified}>
                    <div class="absolute -top-0.5 -right-0.5">
                      <Icons name="verified" class="size-3 aspect-square shrink-0" />
                    </div>
                  </Show>
                </Tooltip>
              )}
            </For>
          </div>
          <div class="flex items-center gap-2">
            <button
              class={`flex size-8 aspect-square shrink-0 p-2 rounded-full backdrop-blur-xl ${
                props.file_options[props.file.name].tagged!.length > 0 ? "bg-blue-600" : "bg-[rgba(0,0,0,0.8)]"
              } group/icon`}
              onclick={() => {
                setIsOpen(true);
                props.setIsBussy(true);
              }}
            >
              <Icons name="user" type_user="tagged" class="group-active/icon:scale-95 text-neutral-50" />
            </button>
            <Show when={MimeTypes.images.includes(props.file.type)}>
              <SwitchMediaRatio
                file_name={props.file.name}
                file_options={props.file_options}
                setValue={props.setValue}
                setIsBussy={props.setIsBussy}
              />
            </Show>
          </div>
        </div>
        <Switch>
          <Match when={MimeTypes.videos.includes(props.file.type)}>
            <Video src={URL.createObjectURL(props.file)} />
          </Match>
          <Match when={MimeTypes.images.includes(props.file.type)}>
            <ImageEffect
              effect={props.file_options[props.file.name].image_effect!}
              ratio={props.file_options[props.file.name].image_ratio!}
              src={URL.createObjectURL(props.file)}
            />
            <div
              ref={elRef}
              class="absolute z-[1] bottom-0 right-0 left-0 flex w-full p-1.2 backdrop-blur-xl bg-[rgba(0,0,0,0.8)] scroll-hidden-x overflow-auto"
              onMouseMove={onDragging}
              onMouseDown={() => setIsDraggable(true)}
              onMouseUp={onUnDragging}
              onMouseLeave={onUnDragging}
            >
              <div class={`flex gap-2 p-2 pointer-events-${isDisabled() ? "none" : "auto"}`}>
                <For each={imageEffectOptions}>
                  {(effect) => (
                    <button
                      class={`flex flex-col p-1.5 gap-1.5 items-center bg-neutral-800 rounded-lg shrink-0 border border-solid ${
                        props.file_options[props.file.name].image_effect === effect ? "border-blue-600" : "border-neutral-900"
                      }`}
                      onclick={() => onChangeEffect(effect)}
                    >
                      <div class={`size-16 ${effect}`}>
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/template.png`}
                          alt={effect}
                          class="size-full aspect-square rounded-lg"
                          draggable={false}
                        />
                      </div>
                      <span class="text-xs text-neutral-50 capitalize">{effect.replace("effect-", "")}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </Match>
        </Switch>
      </div>
      <PopupContainer is_open={isOpen()}>
        <FindTaggedUsersPopup
          file_name={props.file.name}
          file_options={props.file_options}
          setValue={props.setValue}
          limit={10}
          onClose={() => setIsOpen(false)}
        />
      </PopupContainer>
    </>
  );
};

export default ManagePostMedia;
