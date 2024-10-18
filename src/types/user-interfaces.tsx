export interface userPropsBase {
  _id: string;
  display: { initial: string; color: string };
  avatar: string | null;
  username: string;
  name: string;
  is_verified: boolean;
}

export interface authProps extends userPropsBase {
  bio: string;
  allow_mentioned_from: { private: boolean; on: boolean; off: boolean };
  allow_tagged_from: { private: boolean; on: boolean; off: boolean };
  push_notifications: {
    post_reactions: { private: boolean; on: boolean; off: boolean };
    post_comments: { private: boolean; on: boolean; off: boolean };
    comment_votes: { private: boolean; on: boolean; off: boolean };
    tagged_you: { private: boolean; on: boolean; off: boolean };
    mentioned_you: { private: boolean; on: boolean; off: boolean };
    is_request_following: boolean;
  };
  count_username_changed: number;
  is_admin: boolean;
  is_private: boolean;
  is_show_suggestions: boolean;
  count_unread_notifications: number;
  count_unread_messages: number;
  token: string;
  exp_token: number;
  have_request_verified: boolean;
  level_admin: "owner" | "moderator" | "journalist" | "none";
}

export interface searchUsersProps extends userPropsBase {
  is_block?: boolean;
  is_follow?: boolean;
  is_mute?: boolean;
  is_personalize?: boolean;
  is_tagged?: boolean;
}

export interface getProfileProps extends userPropsBase {
  bio: string;
  createdAt: Date;
  count_following: number;
  count_followers: number;
  count_posts: number;
  is_block: boolean;
  is_follow: boolean;
  is_mute: boolean;
  is_personalize: boolean;
  is_request_following: boolean;
  is_show_suggestions: boolean;
  suggestions: searchUsersProps[];
}

export interface getCollectionProps {
  _id: string;
  src: string;
  speed_animation: number;
  unicode: string;
  allow_used: {
    everyone: boolean;
    followers: boolean;
  };
  count_used: number;
}

export interface getUserRequest {
  _id: string;
  user: userPropsBase;
  title: string;
  description: string;
  type: "activation" | "reset_password" | "verifying_account";
}

export type findCollectionsProps = getCollectionProps[];
