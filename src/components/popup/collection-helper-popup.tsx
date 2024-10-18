import { Component } from "solid-js";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";

interface Props {
  onClose: () => void;
}

const CollectionHelperPopup: Component<Props> = (props) => {
  return (
    <ModalContainer class="flex flex-col w-full h-full max-w-md max-h-[520px] md:max-h-[620px] animate-zoom-out" onClose={props.onClose}>
      <div class="flex w-full p-3 items-center">
        <div class="flex w-full"></div>
        <div class="flex justify-center shrink-0">Collection helper</div>
        <div class="flex w-full justify-end">
          <button class="flex group/icon justify-end" onclick={props.onClose}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
      </div>
      <div class="flex w-full h-full p-2 overflow-hidden">
        <div class="flex flex-col w-full h-full p-1 overflow-auto break-words">
          <p class="text-xl mb-3">How do collections (sprites) work?</p>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/images/reaction.png`}
            class="flex w-[192px] mt-1 outline outline-1 outline-[var(--border-secondary)]"
          />
          <div class="flex flex-col mt-3 gap-2">
            <span>
              Before uploading an image, make sure the size of each frame in the sprite is exactly the same as, for example in the image above each
              frame has a size of 24x24 with 8 frames on sprite.
            </span>
            <span>The animation speed from the first frame to the last is in millisecond format</span>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CollectionHelperPopup;
