import { getRandomContents } from "~/data/content-data";
import { generateRandomImage } from "~/data/file-images";
import { generateUsers } from "~/data/user-data";
import { findConversationsProps, findMessagesProps } from "~/types/chat-interfaces";
import { authProps, userPropsBase } from "~/types/user-interfaces";

export const generateChatConversations = (count: number) => {
  const conversations: findConversationsProps = [];
  for (let i = 0; i < count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const ramdomCountUnread = Math.floor(Math.random() * 40) + 1;
    const randomFileIndex = Math.floor(Math.random() * 40);

    const users = generateUsers() as authProps[];
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex] as userPropsBase;

    conversations.push({
      _id: `${Date.now()}-${i}`,
      user: user,
      last_message: {
        _id: `${Date.now()}-${i}`,
        sender: user,
        file: randomFileIndex === 0 ? null : { file_type: "image/webp" },
        get_html: getRandomContents("short").get_html,
        get_text: getRandomContents("short").get_text,
        is_read: false,
        createdAt: date,
      },
      count_unread: ramdomCountUnread,
      createdAt: date,
    });
  }

  return conversations;
};

export const generateChatMessages = (props: { count: number; includes: string[] }) => {
  const messages: findMessagesProps = [];
  for (let i = 0; i < props.count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const randomFileIndex = Math.floor(Math.random() * 40);

    const users = generateUsers() as authProps[];
    const randomUserIndex = Math.floor(Math.random() * props.includes.length);
    const user = users.find((user) => user._id === props.includes[randomUserIndex])! as userPropsBase;

    messages.push({
      _id: `${Date.now()}-${i}`,
      sender: user,
      file: randomFileIndex === 0 ? null : { file_type: "image/webp", src: generateRandomImage() },
      get_html: getRandomContents("short").get_html,
      get_text: getRandomContents("short").get_text,
      is_read: false,
      createdAt: date,
    });
  }

  return messages;
};
