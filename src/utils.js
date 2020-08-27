export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function get(key) {
  return (obj) => obj[key];
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
export function getHashParams() {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function requestSpotifyUserInfomation({ accessToken, state, storedState }) {
  if (accessToken && (state == null || state !== storedState)) {
    throw new Error('There was an error during the authentication');
  }

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();

  return result;
}

export function removeSpecialCharacters(str) {
  // const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
  const reg = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/gi;
  // 특수문자 검증
  if (reg.test(str)) {
    // 특수문자 제거후 리턴
    return str.replace(reg, '');
  }
  // 특수문자가 없으므로 본래 문자 리턴
  return str;
}

export const month = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};
