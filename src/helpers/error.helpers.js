export function handleError (error) {
  if (error.response) {
    const errorData = error.response.data;
    let errorMessage;
    if (errorData) {
      errorMessage =
        errorData.message && errorData.message !== 'No message available'
          ? errorData.message
          : `${errorData.status} ${errorData.error}`;

      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
