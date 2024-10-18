import { getCollectionProps, userPropsBase } from "~/types/user-interfaces";

export interface contentAuthorProps {
  _id: string;
  display: { initial: string; color: string };
  avatar: string | null;
  username: string;
  name: string;
  bio: string;
  is_verified: boolean;
  is_block?: boolean;
  is_follow?: boolean;
  is_mute?: boolean;
  count_following: number;
  count_followers: number;
  count_posts: number;
  createdAt: Date;
}

export interface getPostProps {
  _id: string;
  author: contentAuthorProps;
  get_html: string;
  get_text: string;
  media: getPostMediaProps[];
  collections: getAuthorCollectionProps[];
  count_comments: number;
  count_reports: number;
  is_active_comment: boolean;
  is_active_reaction: boolean;
  is_ads: boolean;
  is_saved: boolean;
  createdAt: Date;
}

export interface getPostMediaProps {
  _id: string;
  file_type: string;
  src: string;
  image_effect: string;
  image_ratio: string;
  tagged_users: userPropsBase[];
  is_cencored: boolean;
}

export interface getAuthorCollectionProps extends getCollectionProps {
  is_used: boolean;
}

export interface commentPropsBase {
  _id: string;
  author: contentAuthorProps;
  get_html: string;
  get_text: string;
  vote: {
    up: { count: number; is_voted: boolean };
    down: { count: number; is_voted: boolean };
  };
  createdAt: Date;
}

export interface getCommentProps extends commentPropsBase {
  replying: commentPropsBase | null;
}

export interface getPostAdsProps {
  _id: string;
  author: userPropsBase;
  get_html: string;
  get_text: string;
  media: {
    _id: string;
    file_type: string;
    src: string;
    image_effect: string;
    image_ratio: string;
    is_cencored: boolean;
  }[];
  is_ads: boolean;
  ads_id: string;
  url: string;
  campaign: "application" | "shop" | "trafic";
  is_expired: boolean;
}

export type findPostsProps = getPostProps[];
export type findCommentProps = getCommentProps[];
