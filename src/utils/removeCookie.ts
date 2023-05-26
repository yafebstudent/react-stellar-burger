import setCookie from './setCookie';
import { TRemoveCookie } from './types';

const removeCookie: TRemoveCookie = (tokenName) => {
  setCookie(tokenName, '', { expires: -1 });
};

export default removeCookie;
