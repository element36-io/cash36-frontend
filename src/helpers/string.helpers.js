export const truncateString = (string, numOfChars) => {
  if (string.length <= numOfChars) return string;

  const truncatedString = string.substring(0, numOfChars);
  return `${truncatedString}...`;
};

export const truncateBlockchainAddress = (string, numOfChars) => {
  if (string.length <= numOfChars) return string;

  const firstPart = string.substring(0, 6);
  const secondPart = string.substring(string.length - 4, string.length);

  return `${firstPart}...${secondPart}`;
};
