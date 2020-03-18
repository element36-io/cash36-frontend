export function handleError(error) {
  if (error.response) {
    const errorData = error.response.data;
    const statusCode = error.response.status;

    let errorMessage;

    if (Array.isArray(error.response.data)) {
      errorMessage = error.response.data.join(';');

      return Promise.reject(errorMessage);
    }

    if (errorData) {
      if (errorData.message) {
        errorMessage = `${errorData.message} (${statusCode})`;
      } else if (errorData.error_description) {
        errorMessage = `${errorData.error_description} (${statusCode})`;
      } else {
        errorMessage = `${errorData.error} (${statusCode})`;
      }

      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
