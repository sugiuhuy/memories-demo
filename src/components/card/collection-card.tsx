import { Component, Match, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Reaction from "~/components/media/reaction";
import EditCollectionPopup from "~/components/popup/edit-collection-popup";
import DeleteCollectionPopup from "~/components/popup/delete-collection-popup";
import PopupContainer from "~/containers/popup-container";
import { getCollectionProps } from "~/types/user-interfaces";
import { formatNumber } from "~/utilities/formatter";

const CollectionCard: Component<getCollectionProps> = (props) => {
  const [popup, setPopup] = createStore<{ is_open: boolean; target: "delete" | "edit" }>({ is_open: false, target: "delete" });

  const onClosePopup = () => setPopup("is_open", false);
  const onSwitchPopup = (target: "delete" | "edit") => {
    setPopup(
      produce((state) => {
        state.is_open = true;
        state.target = target;
      })
    );
  };

  return (
    <>
      <div class="flex flex-col w-full p-2 gap-2 bg-[var(--bg-secondary)] outline outline-1 outline-[var(--border-secondary)] divide-y divide-solid divide-[var(--border-secondary)] rounded-lg">
        <div class="flex w-full gap-2 items-center">
          <div class="size-8 aspect-square p-2 bg-[var(--bg-primary)] rounded-lg">
            <Reaction {...props} />
          </div>
          <span>:{props.unicode}:</span>
        </div>
        <div class="flex w-full pt-1 gap-2 items-center justify-between">
          <span>{formatNumber(props.count_used)} people used</span>
          <div class="flex items-center gap-2">
            <button class="p-2 bg-red-600 active:bg-red-700 group/icon rounded-lg" onclick={() => onSwitchPopup("delete")}>
              <Icons name="trash" class="size-4 aspect-square text-neutral-50 group-active/icon:scale-95" />
            </button>
            <button class="p-2 bg-blue-600 active:bg-blue-700 group/icon rounded-lg" onclick={() => onSwitchPopup("edit")}>
              <Icons name="pen" type_pen="box" class="size-4 aspect-square text-neutral-50 group-active/icon:scale-95" />
            </button>
          </div>
        </div>
      </div>
      <PopupContainer is_open={popup.is_open}>
        <Switch>
          <Match when={popup.target === "delete"}>
            <DeleteCollectionPopup _id={props._id} onClose={onClosePopup} />
          </Match>
          <Match when={popup.target === "edit"}>
            <EditCollectionPopup {...props} onClose={onClosePopup} />
          </Match>
        </Switch>
      </PopupContainer>
    </>
  );
};

export default CollectionCard;
