import { TSetCookie } from './types';

const setCookie: TSetCookie = (tokenName, value, inputProps = {}) => {
  const properties = inputProps || {};

  let exp = properties.expires;

  if (typeof exp === 'number' && exp) {
    const d = new Date();

    d.setTime(d.getTime() + exp * 1000);
    exp = d;
    properties.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    properties.expires = (exp as Date).toUTCString();
  }
  const unencodedToken = encodeURIComponent(value);

  let updatedCookie = `${tokenName}=${unencodedToken}`;

  Object.keys(properties).forEach((propName) => {
    updatedCookie += `; ${propName}`;
    const propValue = properties[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });
  document.cookie = updatedCookie;
};

export default setCookie;
