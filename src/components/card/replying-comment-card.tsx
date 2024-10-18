import { ParentComponent, Show } from "solid-js";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import Avatar from "~/components/media/avatar";
import { commentPropsBase } from "~/types/post-interfaces";
import transformContentPattern from "~/utilities/transform-content-pattern";

const ReplyingCommentCard: ParentComponent<commentPropsBase> = (props) => {
  return (
    <div class="flex w-full gap-1">
      <div class={`relative flex h-full shrink-0 ${props.children ? "ml-0 w-8" : "ml-2 w-10"}`}>
        <div
          class={`absolute bottom-0 right-0 border-t border-l border-solid border-[var(--border-secondary)] ${
            props.children ? "w-5 h-1/2" : "w-7 h-[calc(100%-0.8rem)]"
          }`}
        ></div>
      </div>
      <div class={`flex gap-2 overflow-hidden ${props.children ? "w-full items-center" : "w-full"}`}>
        <div class="flex w-full h-fit gap-2">
          <Avatar {...props.author} class="size-7 aspect-square text-sm rounded-lg" />
          <div class="flex w-full items-center overflow-hidden">
            <div class="inline-flex w-full overflow-hidden">
              <div class="truncate text-sm">
                <div class="inline-flex items-center p-0 m-0">
                  <a href={`/@${props.author.username}`} class="text-blue-600 active:text-blue-700">
                    {props.author.name}
                  </a>
                  <Show when={props.author.is_verified}>
                    <Tooltip text="Account verified" class="flex items-center justify-center ml-1">
                      <Icons name="verified" class="size-3 aspect-square shrink-0" />
                    </Tooltip>
                  </Show>
                </div>
                <div
                  class={`inline ml-2 text-[var(--text-secondary)] ${props.children ? "whitespace-line" : "whitespace-pre-line break-words"}`}
                  innerHTML={transformContentPattern(props.get_text)}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default ReplyingCommentCard;
