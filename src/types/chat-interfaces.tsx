import { userPropsBase } from "~/types/user-interfaces";

export interface getConversationProps {
  _id: string;
  user: userPropsBase;
  last_message: {
    _id: string;
    sender: userPropsBase;
    file: {
      file_type: string;
    } | null;
    get_html: string;
    get_text: string;
    is_read: boolean;
    createdAt: Date;
  } | null;
  count_unread: number;
  createdAt: Date;
}

export interface getMessageProps {
  _id: string;
  sender: userPropsBase;
  file: {
    file_type: string;
    src: string;
  } | null;
  get_html: string;
  get_text: string;
  is_read: boolean;
  createdAt: Date;
}

export type findConversationsProps = getConversationProps[];
export type findMessagesProps = getMessageProps[];
