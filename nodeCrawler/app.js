const express = require('express');

const albumInfomations = require('./crawling_data/AlbumOfTheYear[1970-2020].json');

const app = express();

const PORT = process.env.PORT || 3000;

function filterAlbums(page, limit) {
  return (album) => album.rank > limit * (page - 1)
    && album.rank <= limit * (page - 1) + limit;
}

function makeJsonResult({
  albumCount, limit, pageNumber, albums, year,
}) {
  return {
    status: 'ok',
    status_message: 'Query was successful',
    data: {
      albumCount,
      limit,
      pageNumber,
      year,
      albums,
    },
  };
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  next();
});

app.get('/albumoftheyear', (req, res) => {
  const { year = new Date().getFullYear(), page = 1, limit = 20 } = req.query;

  const albums = albumInfomations[year];

  const pageCount = Math.ceil(albums.length / limit);

  const filteredAlbums = pageCount >= page
    ? albums.filter(filterAlbums(+page, +limit))
    : [];

  const result = makeJsonResult({
    albumCount: albums.length,
    limit,
    pageNumber: page,
    albums: filteredAlbums,
    year,
  });

  console.log('requested!');

  res.json(result);
});

app.listen(PORT, () => { console.log('listening 3000 port...'); });
