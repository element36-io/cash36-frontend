export function handleError(error) {
  if (error.response) {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    const statusText = error.response.statusText;
    

    let errorMessage;

    if (Array.isArray(error.response.data)) {
      errorMessage = `${error.response.data.join('; ')} (${statusCode}: ${statusText})`;
      return Promise.reject(errorMessage);
    }

    if (errorData) {
      if (errorData.message) {
        errorMessage = `${errorData.message} (${statusCode}: ${statusText})`;
      } else if (errorData.error_description) {
        errorMessage = `${errorData.error_description} (${statusCode}: ${statusText}))`;
      } else if (errorData.error)
        errorMessage = `${errorData.error} (${statusCode}: ${statusText}))`;
      } else {
        if (error.respnse.status=404) {
          errorMessage = `Ressource (or user)  not found (${statusCode}: ${statusText}))`;
        } else {
          errorMessage = `Error from server: (${statusCode}: ${statusText}))`;
        }
      }

      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
