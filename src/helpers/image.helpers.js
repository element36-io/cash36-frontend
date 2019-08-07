export const checkIfUrlContainsImage = async imageUrl => {
  if (!imageUrl) return;
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};
