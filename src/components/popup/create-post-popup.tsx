import { useMatch } from "@solidjs/router";
import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import SelectFilePost from "~/components/form/select-file-post";
import AlertContainer from "~/containers/alert-container";
import ModalContainer from "~/containers/modal-container";
import PopupContainer from "~/containers/popup-container";
import PreviewPostMediaContainer from "~/containers/preview-post-media-container";
import { getRandomContents } from "~/data/content-data";
import ManagePost from "~/modules/manage-post";
import ManagePostMedia from "~/modules/manage-post-media";
import { mutateStore, selectStore } from "~/stores/manage";
import { getPostMediaProps } from "~/types/post-interfaces";
import { searchUsersProps } from "~/types/user-interfaces";

interface Props {
  onClose: () => void;
}

const CreatePostPopup: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();
  const match = useMatch(() => `/@${auth().username}`);

  const [isBussy, setIsBussy] = createSignal<boolean>(false);
  const [isOpenAlert, setIsOpenAlert] = createSignal<boolean>(false);
  const [tab, setTab] = createSignal<number>(0);

  const [value, setValue] = createStore<{
    get_html: string;
    get_text: string;
    is_active_comment: boolean;
    is_active_reaction: boolean;
    files: File[];
    file_options: { [key: string]: { image_effect?: string; image_ratio?: string; tagged: searchUsersProps[] } };
  }>({ get_html: "", get_text: "", is_active_comment: true, is_active_reaction: true, files: [], file_options: {} });

  const onSubmitCreatePost = () => {
    if (!Boolean(match())) return props.onClose();

    const media: getPostMediaProps[] = [];
    value.files.map((d) => {
      media.push({
        _id: `${Date.now()}`,
        file_type: d.type,
        image_effect: value.file_options[d.name].image_effect!,
        image_ratio: value.file_options[d.name].image_ratio!,
        is_cencored: false,
        src: URL.createObjectURL(d),
        tagged_users: value.file_options[d.name].tagged,
      });
    });

    mutate(
      "findPosts",
      produce((states) => {
        states.push({
          _id: `${Date.now()}`,
          author: {
            _id: auth()._id,
            avatar: auth().avatar,
            bio: auth().bio,
            count_followers: 0,
            count_following: 0,
            count_posts: 0,
            createdAt: new Date(),
            display: auth().display,
            is_verified: auth().is_verified,
            name: auth().name,
            username: auth().username,
            is_block: false,
            is_follow: false,
            is_mute: false,
          },
          get_html: getRandomContents("long").get_html,
          get_text: getRandomContents("long").get_text,
          media: media,
          collections: [
            {
              _id: "collection_1",
              src: `${import.meta.env.VITE_BASE_URL}/ractions.png`,
              speed_animation: 800,
              unicode: "sparklink",
              allow_used: {
                everyone: true,
                followers: false,
              },
              count_used: 0,
              is_used: false,
            },
          ],
          count_comments: 0,
          count_reports: 0,
          is_active_comment: true,
          is_active_reaction: true,
          is_ads: false,
          is_saved: false,
          createdAt: new Date(),
        });
      })
    );
  };

  const onCloseModal = () => {
    if (isOpenAlert() || isBussy()) return;
    if (value.files.length > 0 && !isOpenAlert()) return setIsOpenAlert(true);

    props.onClose();
  };

  const onBack = () => {
    if (value.files.length > 0 && tab() === 0) return setIsOpenAlert(true);
    setTab(tab() - 1);
  };

  const onNext = () => {
    setTab(tab() + 1);
  };

  return (
    <>
      <ModalContainer class="flex flex-col w-full h-full max-w-md max-h-[520px] md:max-h-[620px] animate-zoom-out" onClose={onCloseModal}>
        <div class="flex w-full p-3 items-center">
          <div class="flex w-full">
            <Show when={value.files.length > 0}>
              <button class="flex group/icon" onclick={onBack}>
                <Switch>
                  <Match when={tab() === 0}>
                    <Icons
                      name="cross"
                      class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                    />
                  </Match>
                  <Match when={tab() === 1}>
                    <Icons
                      name="arrow"
                      class="size-4 aspect-square rotate-270 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                    />
                  </Match>
                </Switch>
              </button>
            </Show>
          </div>
          <div class="flex justify-center shrink-0">
            <Switch>
              <Match when={!value.files.length} children={"Select files"} />
              <Match when={value.files.length > 0 && tab() === 0} children={"Manage media"} />
              <Match when={value.files.length > 0 && tab() === 1} children={"Configurate post"} />
            </Switch>
          </div>
          <div class="flex w-full justify-end">
            <Switch>
              <Match when={!value.files.length}>
                <button class="flex group/icon justify-end" onclick={onCloseModal}>
                  <Icons
                    name="cross"
                    class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                  />
                </button>
              </Match>
              <Match when={value.files.length > 0 && tab() === 0}>
                <button class="flex group/icon" onclick={onNext}>
                  <Icons
                    name="arrow"
                    class="size-4 aspect-square rotate-90 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
                  />
                </button>
              </Match>
              <Match when={value.files.length > 0 && tab() === 1}>
                <button
                  class="flex group/submit text-blue-600 active:text-blue-700 disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed justify-end"
                  onclick={onSubmitCreatePost}
                  disabled={!value.get_text.trim().length || !value.file_options || !value.files.length}
                >
                  Share
                </button>
              </Match>
            </Switch>
          </div>
        </div>
        <Switch>
          <Match when={!value.files.length}>
            <SelectFilePost setValue={setValue} />
          </Match>
          <Match when={value.files.length > 0 && tab() === 0}>
            <PreviewPostMediaContainer file_length={value.files.length}>
              <For each={value.files}>
                {(file) => <ManagePostMedia file={file} file_options={value.file_options} setIsBussy={setIsBussy} setValue={setValue} />}
              </For>
            </PreviewPostMediaContainer>
          </Match>
          <Match when={value.files.length > 0 && tab() === 1}>
            <ManagePost value={value} setValue={setValue} setIsBussy={setIsBussy} />
          </Match>
        </Switch>
      </ModalContainer>
      <PopupContainer is_open={isOpenAlert()}>
        <AlertContainer type_alert="warning" description="If you leave, your current progress won't be saved">
          <button
            class="flex w-full px-2 py-3 border-r border-solid border-[var(--border-secondary)] justify-center text-red-600 active:text-red-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={() => setIsOpenAlert(false)}
          >
            <span class="text-base">Cancel</span>
          </button>
          <button
            class="flex w-full px-2 py-3 justify-center text-sky-600 active:text-sky-700 disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
            onclick={() => props.onClose()}
          >
            <span class="text-base">Discard</span>
          </button>
        </AlertContainer>
      </PopupContainer>
    </>
  );
};

export default CreatePostPopup;
