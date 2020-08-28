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

export function getSearchParams() {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.search.substring(1);

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
  // if (accessToken && (state == null || state !== storedState)) {
  //   throw new Error('There was an error during the authentication');
  // }

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();

  return result;
}

export async function requestSpotifyAccessToken({ code }) {
  const clientId = '396ba6712d884275a62181d646dd0125'; // Your client id
  const clientSecret = '0c26e2f3bf09430aba9222b44ae3716d'; // Your secret
  const redirectUri = `http://localhost:${8080}`; // Your redirect uri

  const url = 'https://accounts.spotify.com/api/token';

  const authOptions = {
    method: 'POST',
    headers: {
      // Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
  };

  const response = await fetch(url, authOptions);
  const result = await response.json();

  console.log(result);

  const hash = Object.entries(result).map((queryString) => queryString.join('=')).join('&');

  window.location.assign(`/#${hash}`);

  // return result;
}

export async function requestSpotifyRefreshToken({ refreshToken }) {
  const clientId = '396ba6712d884275a62181d646dd0125'; // Your client id
  const clientSecret = '0c26e2f3bf09430aba9222b44ae3716d'; // Your secret

  const url = 'https://accounts.spotify.com/api/token';

  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  };

  const response = await fetch(url, authOptions);
  const result = await response.json();

  console.log(result);

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
