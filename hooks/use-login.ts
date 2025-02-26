import useSWR from 'swr';

export function useSectorsData() {
  const { data, error, isLoading } = useSWR('/api/sectors', fetcher);

  return {
    data,
    isError: error,
    isLoading,
  };
}
