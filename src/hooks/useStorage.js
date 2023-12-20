import { useState } from 'react';

export function useStorage(key, value, storageType = 'session') {
  const [state, setState] = useState(() => {
    let storage = false;

    if (storageType === 'local') {
      storage = localStorage.getItem(key);
    } else if (storageType === 'session') {
      storage = sessionStorage.getItem(key);
    }

    return storage ? JSON.parse(storage) : value;
  });

  const updateStroge = (v) => {
    if (storageType === 'local') {
      localStorage.setItem(key, JSON.stringify(v));
      setState(v);
    } else if (storageType === 'session') {
      sessionStorage.setItem(key, JSON.stringify(v));
      setState(v);
    }
  };

  return [state, updateStroge];
}
