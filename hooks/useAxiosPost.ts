import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosPost = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (inputData: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/${url}`,
        inputData,
      );
      console.log('response', response.data);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useAxiosPost;
