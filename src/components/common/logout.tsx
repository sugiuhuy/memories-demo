import { createSignal, ParentComponent } from "solid-js";
import Spinner from "~/components/common/spinner";
import PopupContainer from "~/containers/popup-container";
import authMutation from "~/functions/auth-mutation";

interface Props {
  class: string;
}

const Logout: ParentComponent<Props> = (props) => {
  const auth = authMutation();
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  const onSubmitLogout = () => {
    setIsOpen(true);
    setTimeout(() => {
      auth.logout();
    }, 1000);
  };

  return (
    <>
      <button class={props.class} onclick={onSubmitLogout}>
        {props.children}
      </button>
      <PopupContainer is_open={isOpen()}>
        <Spinner />
      </PopupContainer>
    </>
  );
};

export default Logout;
