export const truncateString = (string, numOfChars) => {
  if (string.length <= numOfChars) return string;

  const truncatedString = string.substring(0, numOfChars);
  return `${truncatedString}...`;
};
