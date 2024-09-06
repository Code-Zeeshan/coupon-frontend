export const cacheBuster = (url) => {
  const timestamp = new Date().getTime();
  return `${url}?t=${timestamp}`;
};
