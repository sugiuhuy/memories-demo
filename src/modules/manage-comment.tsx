import { Component, createEffect, Setter, Show } from "solid-js";
import { produce, SetStoreFunction } from "solid-js/store";
import Icons from "~/assets/icons";
import ReplyingCommentCard from "~/components/card/replying-comment-card";
import TiptapText from "~/components/form/tiptap-text";
import { mutateStore, selectStore } from "~/stores/manage";
import { commentPropsBase } from "~/types/post-interfaces";

interface Props {
  replying_comment: commentPropsBase | null;
  setReplyingComment: Setter<commentPropsBase | null>;
  value: { post_id: string; replying: string | null; get_html: string; get_text: string };
  setValue: SetStoreFunction<{ post_id: string; replying: string | null; get_html: string; get_text: string }>;
}

const ManageComment: Component<Props> = (props) => {
  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const onClearValue = () => {
    props.setReplyingComment(null);
    props.setValue(
      produce((state) => {
        state.get_html = "";
        state.get_text = "";
        state.replying = null;
      })
    );
  };

  const onSubmitComment = (e: Event) => {
    e.preventDefault();

    mutate(
      produce((state) => {
        const index = state.findPosts.findIndex((d) => d._id === props.value.post_id);
        if (index === -1) return;
        state.findPosts[index].count_comments++;

        state.findComments.unshift({
          _id: `${Date.now()}`,
          replying: props.replying_comment,
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
          get_html: props.value.get_html,
          get_text: props.value.get_text,
          vote: {
            up: { count: 0, is_voted: false },
            down: { count: 0, is_voted: false },
          },
          createdAt: new Date(),
        });
      })
    );
    onClearValue();
  };

  createEffect(() => {
    if (props.replying_comment) {
      props.setValue("replying", props.replying_comment._id);
    }
  });

  return (
    <>
      <Show when={props.replying_comment}>
        <ReplyingCommentCard {...props.replying_comment!}>
          <button
            class="flex p-1.5 h-fit shrink-0 group/icon bg-red-600 active:bg-red-700 rounded-lg mt-1"
            onclick={() => props.setReplyingComment(null)}
          >
            <Icons name="trash" class="size-3 aspect-square shrink-0 group-active/icon:scale-95" />
          </button>
        </ReplyingCommentCard>
      </Show>
      <form onsubmit={onSubmitComment} class="flex w-full gap-3 items-center">
        <div class="flex w-full max-h-32 p-2 bg-[var(--bg-secondary)] outline outline-1 outline-[var(--border-primary)] rounded-lg overflow-hidden">
          <div class="flex w-full h-full max-h-32 overflow-hidden">
            <div class="w-full h-full max-h-32 overflow-auto">
              <TiptapText
                value={props.value}
                setValue={props.setValue}
                maxlength={150}
                placeholder="write comment..."
                auto_focuse={false}
                clear_content={!props.value.get_text.trim().length}
              />
            </div>
          </div>
        </div>
        <div class="flex h-full items-end">
          <button
            class="flex shrink-0 enabled:group/icon mb-2 disabled:cursor-not-allowed disabled:text-[var(--text-secondary-hover)]"
            disabled={!props.value.post_id.trim().length || !props.value.get_text.trim().length}
          >
            <Icons name="paperPlane" class="size-5 aspect-square shrink-0 group-active/icon:scale-95" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageComment;
