const axios = require("axios");
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Article = require('../models/Article');
const scrapeContent = require('./scrapeContent');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/beyondchats';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

(async () => {
    try {
        console.log("Fetching blog list...");
        const { data } = await axios.get("https://beyondchats.com/blogs/");
        const $ = cheerio.load(data);

        const targets = [];
        const seenUrls = new Set();


        $("a").each((_, el) => {
            let href = $(el).attr("href");
            if (!href) return;


            if (href.startsWith("/")) {
                href = `https://beyondchats.com${href}`;
            }


            if (href.includes("/blogs/") && href !== "https://beyondchats.com/blogs/" && href !== "https://beyondchats.com/blogs") {
                if (seenUrls.has(href)) return;
                seenUrls.add(href);

                const title = $(el).text().trim();

                if (title && title.length > 5 && !title.toLowerCase().includes("read more")) {
                    targets.push({ title, url: href });
                }
            }
        });

        console.log(`Found ${targets.length} potential articles.`);
        const articlesToScrape = targets.slice(0, 5);

        for (const meta of articlesToScrape) {
            const { title, url } = meta;

            const existingArticle = await Article.findOne({ url });
            if (existingArticle) {
                console.log(`Skipping duplicate: ${title}`);
                continue;
            }

            console.log(`Scraping content for: ${title}`);
            try {
                const content = await scrapeContent(url);
                if (!content || content.length < 50) {
                    console.warn(`Content too short for ${title}, skipping.`);
                    continue;
                }

                await Article.create({
                    title,
                    url,
                    content,
                    isUpdated: true
                });
                console.log(`Saved: ${title}`);
            } catch (err) {
                console.error(`Failed to scrape ${url}:`, err.message);
            }
        }
        console.log("✅ Scraping completed");
    } catch (err) {
        console.error("Script failed:", err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
})();