import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, For, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import InputSearch from "~/components/form/input-search";
import UserCardContainer from "~/containers/user-card-container";
import { generateSearchUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  interaction: "block" | "mute" | "personalize";
  limit: number;
}

const Card = (props: { user: searchUsersProps; interaction: "block" | "mute" | "personalize" }) => {
  const mutate = mutateStore();

  const onSubmitInteraction = () => {
    mutate(
      "findManageUsers",
      produce((states) => {
        const index = states.findIndex((d) => d._id === props.user._id);
        if (index === -1) return;
        states.splice(index, 1);
      })
    );

    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, status: "success", message: "User has been removed" });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  return (
    <UserCardContainer {...props.user} class="flex items-center w-full gap-2" avatar_class="size-11 text-2xl" no_navigate>
      <button
        class="flex p-2 aspect-square bg-red-600 active:bg-red-700 disabled:bg-red-950 text-neutral-50 disabled:cursor-not-allowed rounded-lg"
        onclick={onSubmitInteraction}
      >
        <Icons name="trash" class="size-4 aspect-square" />
      </button>
    </UserCardContainer>
  );
};

const ManageInteraction: Component<Props> = (props) => {
  const randomCountUsers = Math.floor((Math.random() * userNames.length) / 2);
  const users = selectStore((store) => store.findManageUsers);
  const mutate = mutateStore();

  const [isLoading, setIsLoading] = createSignal(true);
  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<searchUsersProps[]>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onGenerateUsers = (count: number) => {
    const data = generateSearchUsers({ count, is_action: false });
    data.map((item) => {
      mutate(
        "findManageUsers",
        produce((states) => {
          states.push(item);
        })
      );
    });
  };

  onMount(() => {
    setTimeout(() => {
      mutate("findManageUsers", generateSearchUsers({ count: 10, is_action: false }));
      setResultSearching(users());

      setIsLoading(false);
    }, 1500);
  });

  onCleanup(() => {
    mutate("findManageUsers", []);
  });

  createEffect(() => {
    if (props.interaction) {
      setIsLoading(true);
      setTimeout(() => {
        mutate("findManageUsers", generateSearchUsers({ count: 10, is_action: false }));
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
    <Switch>
      <Match when={isLoading()}>
        <div class="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      </Match>
      <Match when={!isLoading()}>
        <Switch>
          <Match when={users().length === 0}>
            <div class="flex w-full h-full items-center justify-center">
              <span class="text-sm text-[var(--text-secondary-hover)]">You haven't {props.interaction} anyone</span>
            </div>
          </Match>
          <Match when={users().length !== 0}>
            <InputSearch onDebounced={debounced} placeholder="Search user" have_border />
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
                <For each={resultSearching()}>{(user) => <Card user={user} interaction={props.interaction} />}</For>
                <Show when={resultSearching().length >= props.limit}>
                  <FetchNextPage count={resultSearching().length} limit={props.limit} max={randomCountUsers} onGenerate={onGenerateUsers} />
                </Show>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </Match>
    </Switch>
  );
};

export default ManageInteraction;
