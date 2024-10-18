import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, For, Match, onCleanup, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import InputSearch from "~/components/form/input-search";
import ModalContainer from "~/containers/modal-container";
import UserCardContainer from "~/containers/user-card-container";
import { generateSearchUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { getProfileProps, searchUsersProps } from "~/types/user-interfaces";
import { formatNumber } from "~/utilities/formatter";

interface Props extends getProfileProps {
  relations: "followers" | "following";
  onClose: () => void;
  onSwitchPopup: (target: "followers" | "following") => void;
}

const ProfileRelationsPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const users = selectStore((store) => store.searchUsers);
  const mutate = mutateStore();

  const [isLoading, setIsLoading] = createSignal(true);
  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<searchUsersProps[]>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onSubmitInteraction = (payload: { _id: string; is_follow: boolean }) => {
    mutate(
      produce((state) => {
        const index = state.searchUsers.findIndex((u) => u._id === payload._id);
        if (index === -1) return;

        if (props._id === auth()._id) {
          if (state.searchUsers[index].is_follow) {
            state.getProfile!.count_following--;
          } else {
            state.getProfile!.count_following++;
          }
        } else {
          if (state.searchUsers[index].is_follow) {
            state.getProfile!.count_followers--;
          } else {
            state.getProfile!.count_followers++;
          }
        }

        state.searchUsers[index].is_follow = !payload.is_follow;
      })
    );
  };

  const onGenerateUsers = (count: number) => {
    const data = generateSearchUsers({ count, is_action: false, exclude: props._id });
    data.map((item) => {
      mutate(
        "searchUsers",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onCleanup(() => {
    mutate("searchUsers", []);
  });

  createEffect(() => {
    if (props.relations || props._id) {
      setTimeout(() => {
        mutate("searchUsers", []);
        mutate(
          "searchUsers",
          generateSearchUsers({
            count: props.relations === "followers" ? props.count_followers : props.count_following,
            is_action: false,
            exclude: props._id,
          })
        );
        setResultSearching(users());

        setIsLoading(false);
      }, 1500);
    }
  });

  createEffect(() => {
    setRegex(new RegExp(search().split("").join(".*"), "i"));
  });

  createEffect(() => {
    const _users = users().filter((item) => regex()!.test(item.name));
    setResultSearching(_users);
  });

  return (
    <ModalContainer class="flex flex-col w-full h-3/4 max-w-[400px] animate-zoom-out" onClose={props.onClose}>
      <div class="flex w-full items-center">
        <button
          class={`flex flex-col w-full p-3 items-center border-b border-solid ${
            props.relations === "followers"
              ? "border-[var(--boder-secondary)] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)]"
          }`}
          onclick={() => props.onSwitchPopup("followers")}
        >
          <span class="text-md">Followers</span>
          <span class="text-sm text-[var(--text-secondary-hover)] leading-none">{formatNumber(props.count_followers)}</span>
        </button>
        <button
          class={`flex flex-col w-full p-3 items-center border-b border-solid ${
            props.relations === "following"
              ? "border-[var(--boder-secondary)] text-[var(--text-primary)]"
              : "border-transparent text-[var(--text-secondary)]"
          }`}
          onclick={() => props.onSwitchPopup("following")}
        >
          <span class="text-md">Following</span>
          <span class="text-sm text-[var(--text-secondary-hover)] leading-none">{formatNumber(props.count_following)}</span>
        </button>
        <div class="flex p-3">
          <button class="flex group/icon justify-end" onclick={props.onClose}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
      </div>
      <div class="flex flex-col w-full h-full p-2 gap-2 overflow-hidden">
        <Switch>
          <Match
            when={
              (props.relations === "followers" && props.count_followers === 0) || (props.relations === "following" && props.count_following === 0)
            }
          >
            <div class="flex w-full h-full items-center justify-center">
              <span class="text-sm text-[var(--text-secondary-hover)]">No {props.relations} yet</span>
            </div>
          </Match>
          <Match
            when={(props.relations === "followers" && props.count_followers > 0) || (props.relations === "following" && props.count_following > 0)}
          >
            <Switch>
              <Match when={isLoading()}>
                <div class="flex w-full h-full items-center justify-center">
                  <Spinner />
                </div>
              </Match>
              <Match when={!isLoading()}>
                <InputSearch placeholder="Search" onDebounced={debounced} disabled={isLoading()} have_border />
                <Switch>
                  <Match when={resultSearching().length === 0}>
                    <div class="flex flex-col w-full h-full items-center justify-center select-none">
                      <Show when={search().trim().length > 0}>
                        <span class="text-sm text-[var(--text-primary)]">Search '{search()}'</span>
                      </Show>
                      <span class="text-lg text-[var(--text-secondary)]">Not found</span>
                    </div>
                  </Match>
                  <Match when={resultSearching().length !== 0}>
                    <div class="flex flex-col w-full h-full overflow-auto">
                      <div class="flex flex-col w-full gap-4">
                        <For each={resultSearching()}>
                          {(user) => (
                            <UserCardContainer {...user} class="flex items-center w-full gap-2" avatar_class="size-11 text-2xl">
                              <Show when={user._id !== auth()._id}>
                                <button
                                  onclick={() => onSubmitInteraction({ _id: user._id, is_follow: user.is_follow! })}
                                  class={`flex py-1 px-2 rounded-lg justify-center disabled:cursor-not-allowed text-sm mr-2 ${
                                    user.is_follow
                                      ? "outline outline-1 outline-[var(--border-secondary)] active:bg-[var(--bg-secondary-active)] text-[var(--text-primary)] disabled:text-[var(--text-secondary-hover)]"
                                      : "bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500"
                                  }`}
                                >
                                  <span class="text-sm">
                                    <Show when={user.is_follow} fallback={"Follow"} children={"Following"} />
                                  </span>
                                </button>
                              </Show>
                            </UserCardContainer>
                          )}
                        </For>
                      </div>
                      <Show when={resultSearching().length >= 10}>
                        <FetchNextPage count={resultSearching().length} limit={10} max={userNames.length} onGenerate={onGenerateUsers} />
                      </Show>
                    </div>
                  </Match>
                </Switch>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </ModalContainer>
  );
};

export default ProfileRelationsPopup;
