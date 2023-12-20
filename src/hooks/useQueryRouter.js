import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useQueryRouter() {
  const { query } = useRouter();
  const [params, setParams] = useState(query);

  useEffect(() => {
    setParams(query);
  }, [query]);

  return [params, setParams];
}
