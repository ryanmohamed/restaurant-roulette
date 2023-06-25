import { useState } from 'react';
import Cookies from 'universal-cookie';

/* 
    According to https://www.npmjs.com/package/universal-cookie 
    From RFC 6265 cookie options
*/
type CookieSetType = {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | "none" | "lax" | "strict";
}

const useCookie = (key: string, options: CookieSetType = {}): [any, (value: string, options: CookieSetType) => void, (options: CookieSetType) => void]  => {
  const cookies = new Cookies();
  const [item, setItemValue] = useState<string>(() => {
    // if cookie exists already
    if (cookies.get(key)) {
      return cookies.get(key);
    }
    return null;
  });

  const setValue = (value: string, options: CookieSetType) => {
    setItemValue(value);
    cookies.set(key, value, options);
  };

  const removeItem = (options: CookieSetType) => {
    cookies.remove(key);
  };

  return [item, setValue, removeItem];
};

export default useCookie;