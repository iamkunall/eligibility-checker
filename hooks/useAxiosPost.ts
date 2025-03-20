import { useState } from 'react';
import axios from 'axios';

const useAxiosPost = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (inputData: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${url}`,
        inputData,
      );
      setData(response.data);
    } catch (error: any) {
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useAxiosPost;
