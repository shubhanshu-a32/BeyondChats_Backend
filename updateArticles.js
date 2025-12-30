require("dotenv").config();
const axios = require("axios");

const googleSearch = require("./googleSearch");
const scrape = require("./scrapeContent");
const rewrite = require("./geminiRewrite");

(async () => {
  const { data: articles } = await axios.get(process.env.API_BASE_URL);

  for (let article of articles) {
    if (article.isUpdated) continue;

    console.log("🔍 Searching:", article.title);

    const results = await googleSearch(article.title);
    const ref1 = await scrape(results[0].link);
    const ref2 = await scrape(results[1].link);

    const newContent = await rewrite(article.content, ref1, ref2);

    await axios.post(process.env.API_BASE_URL, {
      title: article.title + " (Updated)",
      content: newContent + `
      
References:
1. ${results[0].link}
2. ${results[1].link}
      `,
      isUpdated: true,
      references: [results[0].link, results[1].link]
    });

    console.log("✅ Updated article published");
  }
})();