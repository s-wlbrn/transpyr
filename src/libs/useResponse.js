import { useCallback, useState } from 'react';

const initialState = {
  error: false,
  message: null,
};

export const useResponse = () => {
  const [response, setResponse] = useState(initialState);

  const createResponse = useCallback((object) => {
    const newResponse = { ...initialState };
    newResponse.message = object.message;
    newResponse.error = false;

    if (object instanceof Error) {
      newResponse.error = true;

      if (object.name === 'ValidationError') {
        newResponse.message = object.errors.join('\r\n');
      }
    }

    setResponse(newResponse);
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(initialState);
  }, []);

  return {
    response,
    createResponse,
    clearResponse,
  };
};
