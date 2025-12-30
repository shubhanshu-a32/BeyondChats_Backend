const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrape(url) {
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);

    let text = "";
    $("p").each((_, el) => {
        text += $(el).text() + "\n";
    });

    return text.slice(0, 5000);
}