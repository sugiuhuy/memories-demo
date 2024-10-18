import { Component, For } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Tooltip from "~/components/common/tooltip";
import { mutateStore } from "~/stores/manage";
import { commentPropsBase } from "~/types/post-interfaces";
import { formatNumber } from "~/utilities/formatter";

const CommentVoting: Component<commentPropsBase> = (props) => {
  const mutate = mutateStore();

  const onSubmitVoteComment = (vote: "up" | "down") => {
    mutate(
      "findComments",
      (states) => states._id === props._id,
      "vote",
      produce((state) => {
        const currentVote = state.up.is_voted ? "up" : state.down.is_voted ? "down" : null;
        if (currentVote && state[currentVote].is_voted) {
          state[currentVote].count--;
          state[currentVote].is_voted = false;
        }

        if (state[vote].is_voted) {
          state[vote].is_voted = false;
          return state[vote].count--;
        }

        state[vote].is_voted = true;
        state[vote].count++;
      })
    );
  };

  const inputs: { name: "up" | "down" }[] = [{ name: "up" }, { name: "down" }];

  return (
    <For each={inputs}>
      {(input) => (
        <button
          class={`flex disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed group/icon ${
            props.vote[input.name].is_voted ? (input.name === "up" ? "text-blue-600" : "text-rose-600") : "text-[var(--text-secondary-hover)]"
          }`}
          onclick={() => onSubmitVoteComment(input.name)}
        >
          <Tooltip text="Vote up" class={`flex gap-1 items-center ${input.name === "up" ? "flex-row-reverse" : "flex-row"}`}>
            <Icons name="vote" type_vote={input.name} class="size-4 shrink-0 group-active/icon:scale-95" is_active />
            <span class="text-sm">{formatNumber(props.vote[input.name].count)}</span>
          </Tooltip>
        </button>
      )}
    </For>
  );
};

export default CommentVoting;
