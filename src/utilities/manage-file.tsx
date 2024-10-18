import { MimeTypes } from "~/configurations/file-config";

export function filterFiles(payload: File[]) {
  const fileType: { unknown: number; image: number; video: number } = payload.reduce(
    (media, file) => {
      if (MimeTypes.images.includes(file.type)) {
        media.image++;
      } else if (MimeTypes.videos.includes(file.type)) {
        media.video++;
      } else {
        media.unknown++;
      }
      return media;
    },
    { image: 0, video: 0, unknown: 0 }
  );

  return fileType;
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
