import { Component, createSignal, For } from "solid-js";
import UserCardContainer from "~/containers/user-card-container";
import { searchUsersProps } from "~/types/user-interfaces";

const ProfileSuggestions: Component<searchUsersProps[]> = (props) => {
  let elRef: HTMLDivElement | undefined;

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

  return (
    <div class="flex w-full max-w-md">
      <div
        ref={elRef}
        onMouseMove={onDragging}
        onMouseDown={() => setIsDraggable(true)}
        onMouseUp={onUnDragging}
        onMouseLeave={onUnDragging}
        class={`flex w-full items-center p-2 gap-4 overflow-auto scroll-hidden-x ${isDraggable() ? "cursor-grabbing" : "cursor-default"}`}
      >
        <For each={props}>
          {(user) => (
            <UserCardContainer
              {...user}
              class={`flex items-center w-fit min-w-44 gap-2 p-2 shrink-0 select-none outline outline-1 outline-[var(--border-primary)] rounded-lg ${
                isDisabled() ? "pointer-events-none" : "pointer-events-auto"
              }`}
              avatar_class="size-11 text-2xl"
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default ProfileSuggestions;
