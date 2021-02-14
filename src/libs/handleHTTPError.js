export const handleHTTPError = (response) => {
  if (response.status !== 'success') {
    return Promise.reject(response);
  }
  return response;
};
