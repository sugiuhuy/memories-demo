import { ParentComponent } from "solid-js";

interface Props {
  class: string;
}

const NavbarContainer: ParentComponent<Props> = (props) => {
  return (
    <div class={`sticky z-[999] left-0 right-0 bottom-0 ${props.class} backdrop-blur-xl bg-[var(--bg-primary)] max-md:bg-[var(--bg-transparent)]`}>
      {props.children}
    </div>
  );
};

export default NavbarContainer;
