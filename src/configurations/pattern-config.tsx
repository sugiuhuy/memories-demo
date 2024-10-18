export const pattern = {
  number: /\d+/g,
  alphanumeric: /^[A-Za-z0-9]*$/g,
  alphanumericSpace: /^[a-zA-Z0-9 ]*$/g,
  username: /@(\w+)/g,
  hastag: /#(\w+)/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  url: /(https?:\/\/[^\s]+)/g,
};
