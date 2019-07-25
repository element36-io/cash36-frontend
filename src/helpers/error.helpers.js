export function handleError (error) {
  if (error.response) {
    const errorData = error.response.data;

    if (errorData) {
      const errorMessage = `${errorData.status} ${errorData.error}`;

      return Promise.reject(errorMessage);
    }
    return Promise.reject(error.message);
  }

  return Promise.reject(error.message);
}
