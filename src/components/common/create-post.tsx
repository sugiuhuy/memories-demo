import { createSignal, ParentComponent } from "solid-js";
import PopupContainer from "~/containers/popup-container";
import CreatePostPopup from "~/components/popup/create-post-popup";

interface Props {
  class: string;
}

const CreatePost: ParentComponent<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <>
      <button class={props.class} onclick={() => setIsOpen(!isOpen())}>
        {props.children}
      </button>
      <PopupContainer is_open={isOpen()}>
        <CreatePostPopup onClose={() => setIsOpen(false)} />
      </PopupContainer>
    </>
  );
};

export default CreatePost;
