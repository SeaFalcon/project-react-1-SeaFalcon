const devServer = 'http://localhost:3000';
const prodServer = 'https://heavymetal-universe.herokuapp.com';

export async function fetchAlbums({ year, page, limit } = {}) {
  const url = `${prodServer}/albumoftheyear?year=${year}&page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchAvailableYears() {
  const url = `${prodServer}/yearlist`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
