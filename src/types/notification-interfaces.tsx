import { userPropsBase } from "~/types/user-interfaces";

export interface getNotificationProps {
  _id: string;
  sender: userPropsBase;
  type_interaction: "user" | "post";
  url: string;
  message: string;
  is_read: boolean;
  is_request_following: boolean;
  createdAt: Date;
}

export type findNotificationsProps = getNotificationProps[];
