import avatarOne from "~/assets/images/avatar/1.jpg";
import avatarTwo from "~/assets/images/avatar/2.jpg";
import avatarThree from "~/assets/images/avatar/3.jpg";
import avatarFour from "~/assets/images/avatar/4.jpg";
import avatarFive from "~/assets/images/avatar/5.jpg";
import avatarSix from "~/assets/images/avatar/6.jpg";
import avatarSeven from "~/assets/images/avatar/7.jpg";
import avatarEight from "~/assets/images/avatar/8.jpg";
import avatarNine from "~/assets/images/avatar/9.jpg";
import avatarTen from "~/assets/images/avatar/10.jpg";

import imageOne from "~/assets/images/images/1.webp";
import imageTwo from "~/assets/images/images/2.webp";
import imageThree from "~/assets/images/images/3.webp";
import imageFour from "~/assets/images/images/4.webp";
import imageFive from "~/assets/images/images/5.webp";
import imageSix from "~/assets/images/images/6.webp";
import imageSeven from "~/assets/images/images/7.webp";
import imageEight from "~/assets/images/images/8.webp";
import imageNine from "~/assets/images/images/9.webp";
import imageTen from "~/assets/images/images/10.webp";
import imageEleven from "~/assets/images/images/11.webp";
import imageTwelve from "~/assets/images/images/12.webp";
import imageThirteen from "~/assets/images/images/13.webp";
import imageFourteen from "~/assets/images/images/14.webp";
import imageFifteen from "~/assets/images/images/15.webp";
import imageSixteen from "~/assets/images/images/16.webp";
import imageSeventeen from "~/assets/images/images/17.webp";
import imageEighteen from "~/assets/images/images/18.webp";
import imageNineteen from "~/assets/images/images/19.webp";
import imageTwenty from "~/assets/images/images/20.webp";
import imageTwentyOne from "~/assets/images/images/21.webp";
import imageTwentyTwo from "~/assets/images/images/22.webp";
import imageTwentyThree from "~/assets/images/images/23.webp";
import imageTwentyEights from "~/assets/images/images/24.webp";
import imageTwentyFive from "~/assets/images/images/25.webp";
import imageTwentySix from "~/assets/images/images/26.webp";
import imageTwentySeven from "~/assets/images/images/27.webp";
import imageTwentyEight from "~/assets/images/images/28.webp";
import imageTwentyNine from "~/assets/images/images/29.webp";
import imageThirty from "~/assets/images/images/30.webp";
import imageThirtyOne from "~/assets/images/images/31.webp";
import imageThirtyTwo from "~/assets/images/images/32.webp";
import imageThirtyThree from "~/assets/images/images/33.webp";
import imageThirtyEights from "~/assets/images/images/34.webp";
import imageThirtyFive from "~/assets/images/images/35.webp";
import imageThirtySix from "~/assets/images/images/36.webp";
import imageThirtySeven from "~/assets/images/images/37.webp";
import imageThirtyEight from "~/assets/images/images/38.webp";
import imageThirtyNine from "~/assets/images/images/39.webp";
import imageForty from "~/assets/images/images/40.webp";
import imageReaction from "~/assets/images/images/reaction.png";

export const generateRandomAvatar = () => {
  const avatars = [avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, avatarSix, avatarSeven, avatarEight, avatarNine, avatarTen];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const generateRandomReaction = () => {
  const reactions = [imageReaction];
  return reactions[Math.floor(Math.random() * reactions.length)];
};

export const generateRandomImage = () => {
  const images = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight,
    imageNine,
    imageTen,
    imageEleven,
    imageTwelve,
    imageThirteen,
    imageFourteen,
    imageFifteen,
    imageSixteen,
    imageSeventeen,
    imageEighteen,
    imageNineteen,
    imageTwenty,
    imageTwentyOne,
    imageTwentyTwo,
    imageTwentyThree,
    imageTwentyEights,
    imageTwentyFive,
    imageTwentySix,
    imageTwentySeven,
    imageTwentyEight,
    imageTwentyNine,
    imageThirty,
    imageThirtyOne,
    imageThirtyTwo,
    imageThirtyThree,
    imageThirtyEights,
    imageThirtyFive,
    imageThirtySix,
    imageThirtySeven,
    imageThirtyEight,
    imageThirtyNine,
    imageForty,
  ];
  return images[Math.floor(Math.random() * images.length)];
};
