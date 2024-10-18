import { getRandomContents } from "~/data/content-data";
import generatePostMedia from "~/data/post-media-data";
import { generateContentAuthor, generateRandomContentAuthor } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import { findCommentProps, findPostsProps } from "~/types/post-interfaces";
import { generateRandomReaction } from "./file-images";

export const generatePosts = (props: { count: number; author?: string }) => {
  const posts: findPostsProps = [];
  const today = new Date();

  for (let i = 1; i <= props.count; i++) {
    const randomCountComment = Math.floor(Math.random() * 50) + 1;
    const randomCountReaction = Math.floor(Math.random() * userNames.length) + 1;

    const date = new Date(today);
    date.setDate(today.getDate() - i);

    posts.push({
      _id: `${Date.now()}-${i}`,
      author: props.author ? generateContentAuthor(props.author)! : generateRandomContentAuthor(),
      get_html: getRandomContents("long").get_html,
      get_text: getRandomContents("long").get_text,
      media: generatePostMedia(),
      collections: [
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
          is_used: false,
        },
      ],
      count_comments: randomCountComment,
      count_reports: 0,
      is_active_comment: true,
      is_active_reaction: true,
      is_ads: false,
      is_saved: false,
      createdAt: date,
    });
  }

  return posts;
};

export const generateComments = (count: number) => {
  const comments: findCommentProps = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const randomCountVoteUp = Math.floor(Math.random() * userNames.length) + 1;
    const randomCountVoteDown = Math.floor(Math.random() * userNames.length) + 1;
    const randomCommentIndex = Math.floor(Math.random() * comments.length);

    const date = new Date(today);
    date.setDate(today.getDate() - i);

    comments.push({
      _id: `${Date.now()}-${i}`,
      replying: randomCommentIndex === 0 ? null : comments[randomCommentIndex],
      author: generateRandomContentAuthor(),
      get_html: getRandomContents("medium").get_html,
      get_text: getRandomContents("medium").get_text,
      vote: {
        up: { count: randomCountVoteUp, is_voted: false },
        down: { count: randomCountVoteDown, is_voted: false },
      },
      createdAt: date,
    });
  }

  return comments;
};
