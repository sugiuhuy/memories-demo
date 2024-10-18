import { Component, For, Show } from "solid-js";
import { produce } from "solid-js/store";
import FetchNextPage from "~/components/common/fetch-next-page";
import UserCardContainer from "~/containers/user-card-container";
import { generateSearchUsers } from "~/data/user-data";
import { mutateStore } from "~/stores/manage";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  users: searchUsersProps[];
  limit: number;
  max_users: number;
}

const ExploreUsers: Component<Props> = (props) => {
  const mutate = mutateStore();

  const onSubmitFollow = (payload: { _id: string; is_follow: boolean }) => {
    mutate(
      "searchUsers",
      (states) => states._id === payload._id,
      produce((state) => {
        state.is_follow = !payload.is_follow;
      })
    );
  };

  const onGenerateUsers = (count: number) => {
    const data = generateSearchUsers({ count, is_action: false });
    data.map((item) => {
      mutate(
        "searchUsers",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  return (
    <>
      <div class="flex flex-col w-full gap-3">
        <For each={props.users}>
          {(user) => (
            <UserCardContainer {...user} class="flex w-full gap-2 items-center" avatar_class="size-11 text-2xl">
              <button
                class={`flex h-fit py-1 px-2 rounded-lg disabled:cursor-not-allowed ${
                  user.is_follow
                    ? "outline outline-1 outline-[var(--border-primary)]"
                    : "bg-blue-600 active:bg-blue-700 text-neutral-50 disabled:bg-blue-950 disabled:text-neutral-500"
                }`}
                onclick={() => onSubmitFollow({ _id: user._id, is_follow: user.is_follow! })}
              >
                <Show when={user.is_follow} fallback={"Follow"}>
                  Following
                </Show>
              </button>
            </UserCardContainer>
          )}
        </For>
      </div>
      <Show when={props.users.length >= 10}>
        <FetchNextPage count={props.users.length} limit={props.limit} max={props.max_users} onGenerate={onGenerateUsers} />
      </Show>
    </>
  );
};

export default ExploreUsers;
