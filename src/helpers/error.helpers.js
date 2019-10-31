export function handleError (error) {
  if (error.response) {
    const errorData = error.response.data;
    let errorMessage;
    if (errorData) {
      errorMessage = `${errorData.status} ${errorData.error}`;
      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
