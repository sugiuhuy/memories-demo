import { getRandomContents } from "~/data/content-data";
import { generateUsers } from "~/data/user-data";
import { getNotificationProps } from "~/types/notification-interfaces";
import { authProps } from "~/types/user-interfaces";

const generateNotifications = (props: { count: number; exclude: string }) => {
  const notifications: getNotificationProps[] = [];
  for (let i = 0; i < props.count; i++) {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const users = generateUsers() as authProps[];
    users.filter((u) => u._id !== props.exclude);

    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];

    const types = ["post", "user"];
    const randomIndexType = Math.floor(Math.random() * types.length);

    notifications.push({
      _id: `${Date.now()}-${i}`,
      sender: {
        _id: user._id,
        avatar: user.avatar,
        display: user.display,
        is_verified: user.is_verified,
        name: user.name,
        username: user.username,
      },
      url: "/",
      type_interaction: types[randomIndexType] as "post" | "user",
      message: getRandomContents("short").get_text,
      is_read: false,
      is_request_following: false,
      createdAt: date,
    });
  }

  return notifications;
};

export default generateNotifications;
