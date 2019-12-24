export function handleError(error) {
  if (error.response) {
    const errorData = error.response.data;
    const statusCode = error.response.status;

    let errorMessage;
    if (errorData) {
      if (errorData.message) {
        errorMessage = `${statusCode} ${errorData.message}`;
      } else if (errorData.error_description) {
        errorMessage = `${statusCode} ${errorData.error_description}`;
      } else {
        errorMessage = `${statusCode} ${errorData.error}`;
      }

      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
