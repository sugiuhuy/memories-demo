import { debounce } from "@solid-primitives/scheduled";
import { Component, createEffect, createSignal, For, Match, onCleanup, onMount, Setter, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import Icons from "~/assets/icons";
import CollectionCard from "~/components/card/collection-card";
import FetchNextPage from "~/components/common/fetch-next-page";
import Spinner from "~/components/common/spinner";
import InputSearch from "~/components/form/input-search";
import CollectionHelperPopup from "~/components/popup/collection-helper-popup";
import CreateCollectionPopup from "~/components/popup/create-collection-popup";
import PopupContainer from "~/containers/popup-container";
import SettingContainer from "~/containers/setting-container";
import { generateRandomReaction } from "~/data/file-images";
import { userNames } from "~/data/user-name-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { findCollectionsProps } from "~/types/user-interfaces";

const ButtonAddNew = (props: { setIsOpen: Setter<boolean> }) => {
  return (
    <button class="flex shrink-0 group/icon" onclick={() => props.setIsOpen(true)}>
      <Icons name="addNew" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
    </button>
  );
};

const PageCollections: Component = () => {
  const randomCountReaction = Math.floor(Math.random() * userNames.length) + 1;
  const _collections = [
    {
      _id: "collection_1",
      src: generateRandomReaction(),
      speed_animation: 800,
      unicode: "sparklink",
      allow_used: {
        everyone: true,
        followers: false,
      },
      count_used: randomCountReaction,
    },
  ];

  const collections = selectStore((store) => store.findCollections);
  const mutate = mutateStore();

  const [popup, setPopop] = createStore<{ isOpen: boolean; target: "create" | "help" }>({ isOpen: false, target: "create" });
  const [isLoading, setIsLoading] = createSignal(true);
  const [search, setSearch] = createSignal<string>("");
  const [regex, setRegex] = createSignal<RegExp>();
  const [resultSearching, setResultSearching] = createSignal<findCollectionsProps>([]);
  const debounced = debounce((value: string) => setSearch(value), 1000);

  const onClosePopup = () => setPopop("isOpen", false);
  const onSwitchPopup = (target: "create" | "help") => setPopop({ isOpen: true, target });

  onMount(() => {
    document.title = "Collections";

    setTimeout(() => {
      mutate("findCollections", _collections);
      setIsLoading(false);
    }, 1500);
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
    mutate("findCollections", []);
  });

  createEffect(() => {
    setRegex(new RegExp(search().split("").join(".*"), "i"));
  });

  createEffect(() => {
    const _collections = collections().filter((item) => regex()!.test(item.unicode)) as [];
    setResultSearching(_collections);
  });

  return (
    <>
      <SettingContainer
        title="Collections"
        class="flex flex-col w-full h-full gap-2"
        button={<ButtonAddNew setIsOpen={() => onSwitchPopup("create")} />}
      >
        <div class="flex w-full gap-3 items-center">
          <InputSearch onDebounced={debounced} placeholder="Search" have_border />
          <button
            class="flex max-md:hidden shrink-0 group/icon p-2 bg-blue-600 active:bg-blue-700 rounded-lg"
            onclick={() => onSwitchPopup("create")}
          >
            <Icons name="addNew" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
          </button>
        </div>
        <Switch>
          <Match when={isLoading()}>
            <div class="flex w-full h-full items-center justify-center">
              <Spinner />
            </div>
          </Match>
          <Match when={!isLoading()}>
            <Switch>
              <Match when={collections().length === 0}>
                <div class="flex flex-col w-full h-full items-center justify-center">
                  <Show
                    when={search().trim().length > 0}
                    fallback={<span class="text-sm text-[var(--text-secondary-hover)]">You doesn't have any collection</span>}
                  >
                    <span class="text-sm text-[var(--text-secondary-hover)]">Search '{search()}'</span>
                    <span class="text-normal text-[var(--text-secondary-hover)]">Not found</span>
                  </Show>
                </div>
              </Match>
              <Match when={collections().length !== 0}>
                <For each={resultSearching()}>{(collection) => <CollectionCard {...collection} />}</For>
                <Show when={resultSearching().length >= 10}>
                  <FetchNextPage count={resultSearching().length} limit={10} max={10} onGenerate={() => {}} />
                </Show>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </SettingContainer>
      <PopupContainer is_open={popup.isOpen}>
        <Switch>
          <Match when={popup.target === "create"}>
            <CreateCollectionPopup onSwitchPopup={onSwitchPopup} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "help"}>
            <CollectionHelperPopup onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default PageCollections;
