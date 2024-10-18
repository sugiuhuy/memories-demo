export const MimeTypes = {
  images: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  videos: ["video/mp4", "video/x-matroska", "video/x-msvideo", "video/mpeg"],
};

export const accept = {
  all: MimeTypes.images.concat(MimeTypes.videos).join(", "),
  images: MimeTypes.images.join(", "),
  videos: MimeTypes.videos.join(", "),
};

export const imageEffectOptions: string[] = [
  "effect-normal",
  "effect-aden",
  "effect-amaro",
  "effect-brannan",
  "effect-brooklyn",
  "effect-clarendon",
  "effect-earlybird",
  "effect-gingham",
  "effect-hudson",
  "effect-inkwell",
  "effect-lofi",
  "effect-maven",
  "effect-perpetua",
  "effect-reyes",
  "effect-stinson",
  "effect-toaster",
  "effect-walden",
  "effect-valencia",
  "effect-xpro2",
];

export const imageRatio: string[] = ["cover", "fill", "contain"];
