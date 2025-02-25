import useSWR from 'swr';

export const fetcher = (url: string) =>
  fetch(`http://localhost:8080/api/${url}`).then((res) => res.json());
