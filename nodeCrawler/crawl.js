const fs = require('fs');

const axios = require('axios');
const cheerio = require('cheerio');

const cliProgress = require('cli-progress');
const _colors = require('colors');

let html = '';
const albumInfomation = {};
let pages = [];

async function getHtml(year, page = 1) {
  try {
    return await axios.get(`https://www.metalkingdom.net/best-metal-albums-of-${year}/${page}`);
  } catch (error) {
    console.error(error);
  }
}

async function getPages(year) {
  html = await getHtml(year);

  const $ = cheerio.load(html.data);

  const pages = [];

  $('#main-content-new > div > div.list-bottom-so > span.ovix-2').each(function (index, elem) {
    pages.push($(this).find('a').text());
  });

  await getAlbumOfTheYear(year);

  return pages;
}

// create new container
const multibar = new cliProgress.MultiBar({
  format: `{year}, page: {page} Progress |${_colors.cyan('{bar}')}| {percentage}% || {value}/{total} albums`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  clearOnComplete: true,
  stopOnComplete: true,
});// , cliProgress.Presets.shades_grey);

const multibars = {};

async function getAlbumOfTheYear(year, page = 1) {
  if (page !== 1) {
    html = await getHtml(year, page);
  }

  const $ = cheerio.load(html.data);

  multibars[year].push(multibar.create($('#talt > tbody > tr').length, 0, { year, page }));

  $('#talt > tbody > tr').each(function (index, elem) {
    const artist = $(this).find('td > .taac1 > a').attr('title');
    const album = $(this).find('td > .taac2 > a > strong > span').text();

    albumInfomation[year].push(
      {
        rank: $(this).find('td.c1 > strong > span').text(),
        coverArtThumbNail: $(this).find('td.c2 > a > img').attr('data-src'),
        coverArtMedium:
          `/album/cover/${$(this).find('td.c2 > a > img')
            .attr('data-src').substr(14)
            .slice(0, -4)}-${artist.split(' ').join('-')}-${album.split(' ').join('-')}.jpg`,
        coverArtLarge:
          `/album-cover-artwork/${$(this).find('td.c2 > a > img')
            .attr('data-src').substr(14)
            .slice(0, -4)}-${artist.split(' ').join('-')}-${album.split(' ').join('-')}.jpg`,
        detailUrl: $(this).find('td.c2 > a').attr('href'),
        artist,
        album: $(this).find('td > .taac2').text(),
        releaseDate: $(this).find('td.c3 > span').text(),
        rating: $(this).find('td > b').text(),
        votes: $(this).find('td:nth-child(7)').text(),
        reviews: $(this).find('td:last-child').text(),
      },
    );

    // multibars[year][page - 1].update(index + 1);
  });

  const timer = setInterval(() => {
    for (let i = 0; i < multibars[year].length; i++) {
      const bar = multibars[year][i];

      if (bar.value < bar.total) {
        bar.increment();
      }
    }

    if (multibar.isActive === false) {
      clearInterval(timer);
      // console.log('Complete!');
    }
  }, 100);
}

const startYear = 2000;
const endYear = new Date().getFullYear();

async function doCrawling() {
  for (let i = startYear; i <= endYear; i++) {
    albumInfomation[i] = [];
    multibars[i] = [];
    pages = await getPages(i);

    for (let j = 0; j < pages.length; j++) {
      await getAlbumOfTheYear(i, pages[j]);
    }
  }

  fs.writeFile(
    `AlbumOfTheYear[${startYear}-${endYear}].json`, JSON.stringify(albumInfomation), 'utf8',
    (err) => {
      if (err) throw err;
      // console.log('complete');
    },
  );
}

doCrawling();
