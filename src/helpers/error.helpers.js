export function handleError(error) {
  if (error.response) {
    const errorData = error.response.data;
    const statusCode = error.response.status;
    const statusText = error.response.statusText;
    
    let status="("+statusCode;
    if (statusText) status+=`: ${statusText})`
    else status+=")";

    let errorMessage;

    if (Array.isArray(error.response.data)) {
      errorMessage = `${error.response.data.join('; ')} ${status}`;
      return Promise.reject(errorMessage);
    }

    if (errorData) {
      if (errorData.message) {
        errorMessage = `${errorData.message} ${status}`;
      } else if (errorData.error_description) {
        errorMessage = `${errorData.error_description} ${status}`;
      } else if (errorData.error) {
        if (statusText)  errorMessage = `${errorData.error} ${status}`;
      } else {  // in case we dont have an error description we try to add it manually, otherwise it looks very ugly on UI
        if (error.response && error.response.status===404) {
          if (statusText) errorMessage = `Ressource (or user)  not found ${status}`;
        } else {
          errorMessage = `Error from server: ${status}`;
        }
      }

      return Promise.reject(errorMessage);
    }
  }

  return Promise.reject(error.message);
}
