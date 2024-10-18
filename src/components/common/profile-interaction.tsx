import { useNavigate } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore } from "~/stores/manage";
import { getProfileProps } from "~/types/user-interfaces";

const ProfileInteraction: Component<getProfileProps> = (props) => {
  const navigate = useNavigate();
  const mutate = mutateStore();

  const onSubmitFollow = () => {
    mutate(
      "getProfile",
      produce((state) => {
        state!.is_follow = !props.is_follow;

        if (state!.is_follow) return state!.count_followers++;
        state!.count_followers--;
      })
    );
  };

  const onSubmitPersonalize = () => {
    mutate(
      "getProfile",
      produce((state) => {
        state!.is_personalize = !props.is_personalize;
      })
    );
  };

  const onSubmitInviteUser = () => {
    const _id = `${Date.now()}`;
    mutate(
      "findConversations",
      produce((states) => {
        states.push({
          _id,
          user: {
            _id: props._id,
            avatar: props.avatar,
            display: props.display,
            is_verified: props.is_verified,
            name: props.name,
            username: props.username,
          },
          last_message: null,
          count_unread: 0,
          createdAt: new Date(),
        });
      })
    );

    navigate(`/chat/${_id}`);
  };

  return (
    <>
      <button
        class={`flex w-full p-2 rounded-lg justify-center disabled:cursor-not-allowed ${
          props.is_follow
            ? "outline outline-1 outline-[var(--border-primary)] active:bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            : "bg-blue-600 active:bg-blue-700 text-neutral-50"
        }`}
        onclick={onSubmitFollow}
      >
        <Show when={props.is_follow} fallback={"Follow"} children={"Following"} />
      </button>
      <div class="flex items-center gap-2">
        <Show when={props.is_follow}>
          <button
            class="flex h-full aspect-square items-center p-2 rounded-lg justify-center disabled:cursor-not-allowed group/icon"
            onclick={onSubmitPersonalize}
          >
            <Icons name="personalize" is_active={props.is_personalize} class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
          </button>
        </Show>
        <button
          class="flex h-full aspect-square items-center p-2 rounded-lg justify-center disabled:cursor-not-allowed group/icon"
          onclick={onSubmitInviteUser}
        >
          <Icons name="paperPlane" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
        </button>
      </div>
    </>
  );
};

export default ProfileInteraction;
