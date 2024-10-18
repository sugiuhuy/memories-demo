import { generateRandomImage } from "~/data/file-images";
import { generateTaggedUsers } from "~/data/user-data";
import { imageEffectOptions } from "~/configurations/file-config";
import { getPostMediaProps } from "~/types/post-interfaces";

const generatePostMedia = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const maxNumber = 40;
  const media: getPostMediaProps[] = [];

  while (media.length < randomNumber) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    if (!media.find((item) => item._id === `media_${randomNumber}`)) {
      const randomTaggedUsers = Math.floor(Math.random() * 7) + 1;
      const randomIndex = Math.floor(Math.random() * imageEffectOptions.length);

      media.push({
        _id: `media_${randomNumber}`,
        file_type: "image/webp",
        src: generateRandomImage(),
        image_effect: imageEffectOptions[randomIndex],
        image_ratio: "cover",
        tagged_users: generateTaggedUsers(randomTaggedUsers),
        is_cencored: false,
      });
    }
  }

  return media;
};

export default generatePostMedia;
