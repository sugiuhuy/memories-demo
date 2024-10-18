export function formatNumber(number: number) {
  if (number >= 1e9) return (number / 1e9).toFixed(1) + "b";
  if (number >= 1e6) return (number / 1e6).toFixed(1) + "m";
  if (number >= 1e3) return (number / 1e3).toFixed(1) + "k";
  return number.toString();
}

export function formatFileSize(number: number) {
  if (number === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const bytes = 1024;
  const match = Math.floor(Math.log(number) / Math.log(bytes));

  return parseFloat((number / Math.pow(bytes, match)).toFixed(2)) + " " + sizes[match];
}

export function spaceNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
