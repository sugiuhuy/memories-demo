import { getRandomBio } from "~/data/user-bio-data";
import { generateRandomAvatar } from "~/data/file-images";
import { userNames } from "~/data/user-name-data";
import { contentAuthorProps } from "~/types/post-interfaces";
import { authProps, getProfileProps, searchUsersProps, userPropsBase } from "~/types/user-interfaces";
import generateColor from "~/utilities/generate-color";

export const generateUsers = (count?: number) => {
  const users: authProps[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const randomCountUnreadNotifications = Math.floor(Math.random() * 100) + 1;
    const randomCountUnreadMessages = Math.floor(Math.random() * 200) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      is_verified: randomNumber > Math.floor(11 / 2),
      bio: getRandomBio(),
      allow_mentioned_from: { private: false, on: true, off: false },
      allow_tagged_from: { private: false, on: true, off: false },
      push_notifications: {
        post_reactions: { private: false, on: true, off: false },
        post_comments: { private: false, on: true, off: false },
        comment_votes: { private: false, on: true, off: false },
        tagged_you: { private: false, on: true, off: false },
        mentioned_you: { private: false, on: true, off: false },
        is_request_following: false,
      },
      count_username_changed: 0,
      is_admin: false,
      is_private: false,
      is_show_suggestions: false,
      count_unread_notifications: randomCountUnreadNotifications,
      count_unread_messages: randomCountUnreadMessages,
      token: "token",
      exp_token: 0,
      have_request_verified: false,
      level_admin: "none",
    });
  }

  return count ? users[count] : users;
};

export const generateTaggedUsers = (count: number) => {
  const users: userPropsBase[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      is_verified: randomNumber > Math.floor(11 / 2),
    });
  }

  const shuffledUsers = users.sort(() => 0.5 - Math.random());
  return shuffledUsers.slice(0, count);
};

export const generateRandomContentAuthor = (): contentAuthorProps => {
  const users = generateUsers() as authProps[];
  const randomIndex = Math.floor(Math.random() * users.length);

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100) + 1;

  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - randomIndex);

  return {
    _id: users[randomIndex]._id,
    name: users[randomIndex].name,
    avatar: users[randomIndex].avatar,
    username: users[randomIndex].username,
    bio: users[randomIndex].bio,
    count_followers: randomCountFollowing,
    count_following: randomCountFollowers,
    count_posts: randomCountPosts,
    createdAt: date,
    display: users[randomIndex].display,
    is_verified: users[randomIndex].is_verified,
    is_block: false,
    is_follow: false,
    is_mute: false,
  };
};

export const generateContentAuthor = (_id: string): contentAuthorProps | null => {
  const users = generateUsers() as authProps[];
  const index = users.findIndex((u) => u._id === _id);
  if (index === -1) return null;

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100) + 1;

  return {
    _id: users[index]._id,
    name: users[index].name,
    avatar: users[index].avatar,
    username: users[index].username,
    bio: users[index].bio,
    count_followers: randomCountFollowing,
    count_following: randomCountFollowers,
    count_posts: randomCountPosts,
    createdAt: new Date(),
    display: users[index].display,
    is_verified: users[index].is_verified,
    is_block: false,
    is_follow: false,
    is_mute: false,
  };
};

export const generateSearchUsers = (props: { count: number; is_action?: boolean; exclude?: string }) => {
  const users: searchUsersProps[] = [];
  for (let i = 0; i < userNames.length; i++) {
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const resultString = userNames[i].replace(/\s+/g, "").toLowerCase();

    if (users.find((user: any) => user._id === resultString) || users.find((user: any) => user._id === props.exclude)) continue;
    users.push({
      _id: resultString,
      display: { initial: userNames[i].charAt(0).toUpperCase(), color: generateColor() },
      avatar: generateRandomAvatar(),
      username: resultString,
      name: userNames[i],
      is_verified: randomNumber > Math.floor(11 / 2),
      is_block: props.is_action,
      is_follow: props.is_action,
      is_mute: props.is_action,
      is_personalize: props.is_action,
      is_tagged: props.is_action,
    });
  }

  const shuffledUsers = users.sort(() => 0.5 - Math.random());
  return shuffledUsers.slice(0, props.count);
};

export const generateProfile = (props: { username: string; count_suggestions: number }): getProfileProps | null => {
  const users = generateUsers() as authProps[];
  const index = users.findIndex((u) => u.username === props.username);
  if (index === -1) return null;

  const randomCountFollowing = Math.floor(Math.random() * users.length) + 1;
  const randomCountFollowers = Math.floor(Math.random() * users.length) + 1;
  const randomCountPosts = Math.floor(Math.random() * 100);

  const randomIndex = Math.floor(Math.random() * users.length);
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - randomIndex);

  return {
    _id: users[index]._id,
    display: users[randomIndex].display,
    name: users[index].name,
    avatar: users[index].avatar,
    username: users[index].username,
    bio: users[index].bio,
    is_verified: users[index].is_verified,
    createdAt: date,
    count_following: randomCountFollowing,
    count_followers: randomCountFollowers,
    count_posts: randomCountPosts,
    is_block: false,
    is_follow: false,
    is_mute: false,
    is_personalize: false,
    is_request_following: false,
    is_show_suggestions: true,
    suggestions: generateSearchUsers({ count: props.count_suggestions, is_action: false, exclude: users[index]._id }),
  };
};
