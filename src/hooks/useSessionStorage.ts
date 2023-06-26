import { useState, useEffect } from "react";

const useSessionStorage = () => {
  const [session, setSession] = useState<Storage | null>(() => {
    // if cookie exists already
    if (sessionStorage) {
      return sessionStorage;
    }
    return null;
  });
  return [session];
}

export default useSessionStorage;