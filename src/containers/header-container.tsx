import { createEffect, createSignal, onCleanup, ParentComponent } from "solid-js";

interface Props {
  class: string;
}

const HeaderContainer: ParentComponent<Props> = (props) => {
  const [isNearTop, setIsNearTop] = createSignal<boolean>(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 1) {
      setIsNearTop(false);
    } else {
      setIsNearTop(true);
    }
  };

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      class={`sticky z-[999] top-0 left-0 right-0 backdrop-blur-xl bg-[var(--bg-primary)] max-md:bg-[var(--bg-transparent)] ${props.class} ${
        isNearTop() ? "shadow-none" : "shadow-ex"
      }`}
    >
      {props.children}
    </div>
  );
};

export default HeaderContainer;
