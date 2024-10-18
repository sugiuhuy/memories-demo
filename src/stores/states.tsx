import { findArticleGroupingsProps } from "~/types/article-interfaces";
import { findConversationsProps, findMessagesProps } from "~/types/chat-interfaces";
import { findNotificationsProps } from "~/types/notification-interfaces";
import { findCommentProps, findPostsProps } from "~/types/post-interfaces";
import { authProps, findCollectionsProps, getProfileProps, getUserRequest, searchUsersProps } from "~/types/user-interfaces";

export interface stateInterface {
  entries: string[];
  theme: "dark" | "light" | "auto";
  toasts: { id: number; status: "success" | "info" | "danger" | "warning"; message: string }[];
  appear_urls: { title: string; url: string; appear_on: { register_form: boolean; client_footer: boolean; client_settings: boolean } }[];
  auth: authProps | null;
  getProfile: getProfileProps | null;
  searchUsers: searchUsersProps[];
  findUserTags: searchUsersProps[];
  findManageUsers: searchUsersProps[];
  findFollowUsers: searchUsersProps[];
  findCollections: findCollectionsProps;
  userSuggestions: searchUsersProps[];
  verifyRequest: getUserRequest | null;
  findNotifications: findNotificationsProps;
  findPosts: findPostsProps;
  findComments: findCommentProps;
  findConversations: findConversationsProps;
  findMessages: findMessagesProps;
  findArticleGroupings: findArticleGroupingsProps[];
}

export const states: stateInterface = {
  entries: [],
  theme: localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")!) : "auto",
  toasts: [],
  appear_urls: [],
  auth: null,
  getProfile: null,
  searchUsers: [],
  findUserTags: [],
  findManageUsers: [],
  findFollowUsers: [],
  findCollections: [],
  userSuggestions: [],
  verifyRequest: null,
  findNotifications: [],
  findPosts: [],
  findComments: [],
  findConversations: [],
  findMessages: [],
  findArticleGroupings: [],
};
