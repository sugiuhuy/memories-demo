import { Match, ParentComponent, Show, splitProps, Switch } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import { userPropsBase } from "~/types/user-interfaces";

interface Props extends userPropsBase {
  class: string;
  avatar_class: string;
  no_navigate?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}

const UserCardContainer: ParentComponent<Props> = (props) => {
  const [_other, _props] = splitProps(props, ["children", "class", "avatar_class", "target"]);

  return (
    <div class={_other.class}>
      <Avatar {..._props} class={_other.avatar_class} />
      <div class="flex w-full flex-col max-w-full overflow-hidden">
        <div class="flex items-center">
          <div class="inline-flex items-center whitespace-nowrap max-w-full overflow-hidden">
            <Switch>
              <Match when={!props.no_navigate}>
                <a href={`/@${_props.username}`} class="truncate text-blue-600 active:text-blue-700" target={_other.target} draggable={false}>
                  {_props.name}
                </a>
              </Match>
              <Match when={props.no_navigate}>
                <span class="truncate">{_props.name}</span>
              </Match>
            </Switch>
            <Show when={_props.is_verified}>
              <Tooltip text="Account is verified" class="flex ml-1">
                <Icons name="verified" class="size-4 aspect-square shrink-0" />
              </Tooltip>
            </Show>
          </div>
        </div>
        <div class="inline-flex items-center whitespace-nowrap overflow-hidden max-w-full">
          <span class="truncate text-[var(--text-secondary-hover)] text-sm">@{_props.username}</span>
        </div>
      </div>
      {_other.children}
    </div>
  );
};

export default UserCardContainer;
