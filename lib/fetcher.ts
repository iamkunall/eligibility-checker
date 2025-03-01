import useSWR from 'swr';

export const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`).then((res) =>
    res.json(),
  );
