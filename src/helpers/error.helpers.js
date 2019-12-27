export function handleError(error) {
  if (error.response) {
    console.log(error.response);

    const errorData = error.response.data;
    const statusCode = error.response.status;

    let errorMessage;
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
