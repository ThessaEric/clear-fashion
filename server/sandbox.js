/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('C:/Users/thess/WebApp/clear-fashion/server/eshops/dedicatedbrand');
const montli = require('C:/Users/thess/WebApp/clear-fashion/server/eshops/Montlimart');
const circle = require('C:/Users/thess/WebApp/clear-fashion/server/eshops/CircleSport');

const montlimart='https://www.montlimart.com/99-vetements'
const circleSport='https://shop.circlesportswear.com/collections/collection-homme'
const dedicated='https://www.dedicatedbrand.com/en/men/news'

async function sandbox (eshop = montlimart) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montli.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
