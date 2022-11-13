import { GetServerSidePropsContext, NextPageContext } from 'next';
import cookies from 'next-cookies';
import { AppContext } from 'next/app';

export const setCookie = (
  key: string,
  value: string,
  expires: Date | string | number = 1
) => {
  if (process.browser) {
    document.cookie = `${key}=${value}; expires= ${expires || 1}; path=/`;
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

export const getCookie = (
  key: string,
  ctx?: NextPageContext | GetServerSidePropsContext
) => {
  if (ctx) {
    return cookies(ctx)[key];
  } else {
    let name = key + '=';
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
};
