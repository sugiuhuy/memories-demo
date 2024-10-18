import { Component, For, onMount } from "solid-js";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import Radio from "~/components/form/radio";
import Switcher from "~/components/form/switcher";
import { mutateStore } from "~/stores/manage";

interface Props {
  post_reactions: { private: boolean; on: boolean; off: boolean };
  post_comments: { private: boolean; on: boolean; off: boolean };
  comment_votes: { private: boolean; on: boolean; off: boolean };
  tagged_you: { private: boolean; on: boolean; off: boolean };
  mentioned_you: { private: boolean; on: boolean; off: boolean };
  is_request_following: boolean;
}

const ManagePushNotifications: Component<Props> = (props) => {
  const mutate = mutateStore();

  const [postReactions, setPostReactions] = createStore<{ private: boolean; on: boolean; off: boolean }>({ off: false, on: false, private: false });
  const [postComments, setpostComments] = createStore<{ private: boolean; on: boolean; off: boolean }>({ off: false, on: false, private: false });
  const [commentVotes, setCommentVotes] = createStore<{ private: boolean; on: boolean; off: boolean }>({ off: false, on: false, private: false });
  const [taggedYou, setTaggedYou] = createStore<{ private: boolean; on: boolean; off: boolean }>({ off: false, on: false, private: false });
  const [mentionedYou, setMentionedYou] = createStore<{ private: boolean; on: boolean; off: boolean }>({ off: false, on: false, private: false });
  const [followRequest, setFollowRequest] = createStore<{ is_request_following: boolean }>({ is_request_following: false });

  const onSubmitManagePushNotifications = (e: Event) => {
    e.preventDefault();

    mutate(
      "auth",
      produce((state) => {
        state!.push_notifications.comment_votes = commentVotes;
        state!.push_notifications.is_request_following = followRequest.is_request_following;
        state!.push_notifications.mentioned_you = mentionedYou;
        state!.push_notifications.post_comments = postComments;
        state!.push_notifications.post_reactions = postReactions;
        state!.push_notifications.tagged_you = taggedYou;
      })
    );
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, status: "success", message: "Setting has been saved" });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const initialValues: { name: "private" | "on" | "off"; title: string }[] = [
    { name: "off", title: "Off" },
    { name: "private", title: "From peoples i follow" },
    { name: "on", title: "From everyone" },
  ];

  const inputs: {
    title: string;
    category: "postReactions" | "postComments" | "commentVotes" | "taggedYou" | "mentionedYou";
    radio: typeof initialValues;
    value: any;
    setValue: SetStoreFunction<any>;
  }[] = [
    { title: "Post reactions", category: "postReactions", radio: initialValues, value: postReactions, setValue: setPostReactions },
    { title: "Post comments", category: "postComments", radio: initialValues, value: postComments, setValue: setpostComments },
    { title: "Comment votes", category: "commentVotes", radio: initialValues, value: commentVotes, setValue: setCommentVotes },
    { title: "Tags", category: "taggedYou", radio: initialValues, value: taggedYou, setValue: setTaggedYou },
    { title: "Mentions", category: "mentionedYou", radio: initialValues, value: mentionedYou, setValue: setMentionedYou },
  ];

  onMount(() => {
    setPostReactions(props.post_reactions);
    setpostComments(props.post_comments);
    setCommentVotes(props.comment_votes);
    setTaggedYou(props.tagged_you);
    setMentionedYou(props.mentioned_you);
    setFollowRequest("is_request_following", props.is_request_following);
  });

  return (
    <form onsubmit={onSubmitManagePushNotifications} class="flex flex-col w-full max-lg:p-2 gap-6">
      <For each={inputs}>
        {(item) => (
          <div class="flex flex-col w-full gap-2">
            <span class="flex flex-col w-full text-md">{item.title}</span>
            <div class="flex flex-col w-full p-5 gap-5 border border-solid border-[var(--border-primary)] rounded-lg">
              <For each={item.radio}>
                {(option) => (
                  <Radio {...option} position="right" checked={item.value[option.name]} value={item.value} setValue={item.setValue} is_submit />
                )}
              </For>
            </div>
          </div>
        )}
      </For>
      <div class="flex w-full items-center max-lg:p-2 lg:p-3 lg:border border-solid border-[var(--border-primary)] rounded-lg gap-2">
        <div class="flex flex-col w-full">
          <span class="text-md">Request follow</span>
          <span class="text-xs text-[var(--text-secondary)]">
            When you activate this feature, you will receive a notification to confirm someone wants to follow you.
          </span>
        </div>
        <Switcher name="is_request_following" value={followRequest} setValue={setFollowRequest} is_submit />
      </div>
    </form>
  );
};

export default ManagePushNotifications;
