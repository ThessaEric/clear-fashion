const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-grid-container .grid__item')
    .map((i, element) => {
      const name = $(element)
        .find('.full-unstyled-link')
        .text()
        .trim()
        .replace(/\s/g, ' ')
        .split('         ')[0];
      const price = parseInt(
        $(element)
          .find('.money')
          .text()
          .split('€')[1]
      );
      
      return {name, price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();
      const products = parse(body);
      
      //json file
      jsonString = JSON.stringify(products, null, 2);
      fs.writeFileSync('circleSport_products.json', jsonString)
      return products;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
