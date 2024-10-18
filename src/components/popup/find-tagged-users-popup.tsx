import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import FetchNextPage from "~/components/common/fetch-next-page";
import InputSearch from "~/components/form/input-search";
import ModalContainer from "~/containers/modal-container";
import UserCardContainer from "~/containers/user-card-container";
import { generateSearchUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  file_name: string;
  file_options: { [key: string]: { tagged: searchUsersProps[] } };
  limit: number;
  onClose: () => void;
  setValue: SetStoreFunction<{
    file_options: { [key: string]: { tagged: searchUsersProps[] } };
  }>;
}

const FindTaggedUsersPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const users = selectStore((store) => store.findUserTags);
  const mutate = mutateStore();

  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<searchUsersProps[]>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onTagged = (user: searchUsersProps) => {
    props.setValue(
      produce((state) => {
        const index = state.file_options[props.file_name].tagged!.findIndex((u) => u._id === user._id);
        if (index !== -1) {
          return state.file_options[props.file_name].tagged!.splice(index, 1);
        }

        return state.file_options[props.file_name].tagged!.push(user);
      })
    );
  };

  const onGenerateUsers = (count: number) => {
    const data = generateSearchUsers({ count, is_action: false, exclude: auth()._id });
    data.map((item) => {
      mutate(
        "findUserTags",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onMount(() => {
    mutate("findUserTags", generateSearchUsers({ count: 10, is_action: false, exclude: auth()._id }));
    setResultSearching(users());
  });

  onCleanup(() => {
    mutate("findUserTags", []);
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
        <div class="flex w-full p-3 items-center">
          <div class="flex w-full"></div>
          <span class="flex shrink-0">Tagged users</span>
          <div class="flex w-full justify-end">
            <button class="flex group/icon" onclick={props.onClose}>
              <Icons
                name="cross"
                class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
              />
            </button>
          </div>
        </div>
        <InputSearch placeholder="Search users" onDebounced={debounced} />
      </div>
      <div class="flex flex-col w-full h-full p-2 gap-3 overflow-hidden">
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
              <div class="flex flex-col w-full gap-3">
                <Show when={props.file_options[props.file_name].tagged.length > 0}>
                  <div class="flex flex-col w-full border-b border-solid border-[var(--border-secondary)] gap-3 pb-2">
                    <For each={props.file_options[props.file_name].tagged}>
                      {(user) => (
                        <UserCardContainer {...user} class="flex items-center w-full gap-2" avatar_class="size-11 text-2xl" target="_blank">
                          <button class="flex p-1.5 rounded-lg mr-2 group/icon bg-red-600 active:bg-red-700" onclick={() => onTagged(user)}>
                            <Icons name="cross" class="size-4 rotate-45 aspect-square text-neutral-50 group-active/icon:scale-95" />
                          </button>
                        </UserCardContainer>
                      )}
                    </For>
                  </div>
                </Show>
                <For each={users()}>
                  {(user) => (
                    <Show when={!props.file_options[props.file_name].tagged.find((u) => u._id === user._id)}>
                      <UserCardContainer {...user} class="flex items-center w-full gap-2" avatar_class="size-11 text-2xl" target="_blank">
                        <button class="flex p-1.5 rounded-lg mr-2 group/icon bg-blue-600 active:bg-blue-700" onclick={() => onTagged(user)}>
                          <Icons name="user" type_user="tagged" class="size-4 aspect-square text-neutral-50 group-active/icon:scale-95" />
                        </button>
                      </UserCardContainer>
                    </Show>
                  )}
                </For>
              </div>
              <Show when={users().length >= props.limit}>
                <FetchNextPage count={users().length} limit={props.limit} max={userNames.length} onGenerate={onGenerateUsers} />
              </Show>
            </div>
          </Match>
        </Switch>
      </div>
    </ModalContainer>
  );
};

export default FindTaggedUsersPopup;
