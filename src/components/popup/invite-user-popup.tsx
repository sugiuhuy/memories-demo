import { debounce } from "@solid-primitives/scheduled";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal, For, Match, onMount, Show, Switch } from "solid-js";
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
import { searchUsersProps, userPropsBase } from "~/types/user-interfaces";

interface Props {
  onClose: () => void;
}

const InviteUserPopup: Component<Props> = (props) => {
  const navigate = useNavigate();

  const auth = selectStore((store) => store.auth!);
  const users = selectStore((store) => store.searchUsers);
  const mutate = mutateStore();

  const [isLoading, setIsLoading] = createSignal(true);
  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<searchUsersProps[]>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onSubmitInviteUser = (payload: { user: userPropsBase }) => {
    const _id = `${Date.now()}`;
    mutate(
      "findConversations",
      produce((states) => {
        states.push({
          _id,
          user: payload.user,
          last_message: null,
          count_unread: 0,
          createdAt: new Date(),
        });
      })
    );

    navigate(`/chat/${_id}`);
  };

  const onGenerateUsers = (count: number) => {
    const data = generateSearchUsers({ count, is_action: false, exclude: auth()._id });
    data.map((item) => {
      mutate(
        "searchUsers",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onMount(() => {
    setTimeout(() => {
      mutate("searchUsers", generateSearchUsers({ count: 10, is_action: false, exclude: auth()._id }));
      setResultSearching(users());

      setIsLoading(false);
    }, 1500);
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
      <div class="flex flex-col w-full">
        <div class="flex w-full items-center gap-1 p-1">
          <InputSearch placeholder="Search users" onDebounced={debounced} />
          <button class="flex group/icon disabled:cursor-not-allowed p-3" onclick={props.onClose}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
      </div>
      <div class="flex w-full h-full overflow-hidden p-2">
        <Switch>
          <Match when={isLoading()}>
            <div class="flex w-full items-center justify-center">
              <Spinner />
            </div>
          </Match>
          <Match when={!isLoading()}>
            <div class="flex flex-col w-full h-full overflow-auto">
              <div class="flex flex-col w-full gap-3">
                <For each={resultSearching()}>
                  {(user) => (
                    <UserCardContainer {...user} class="flex items-center w-full gap-2" avatar_class="size-11 text-2xl">
                      <button
                        type="button"
                        class="flex p-2 bg-blue-600 active:bg-blue-700 text-neutral-50 group/icon rounded-lg mr-2"
                        onclick={() => onSubmitInviteUser({ user })}
                      >
                        <Icons name="paperPlane" class="size-4 aspect-square shrink-0 group-active/icon:scale-95" />
                      </button>
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
      </div>
    </ModalContainer>
  );
};

export default InviteUserPopup;
