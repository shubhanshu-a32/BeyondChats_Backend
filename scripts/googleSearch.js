const axios = require('axios');

module.exports = async function searchGoogle(query) {
    const res = axios.get("https://serpapi.com/search", {
        params: {
            q: query,
            api_key: process.env.SERP_API_KEY,
            num: 5
        }
    });

    return res.data.organic_results
    .filter(r => r.link && r.source != "BeyondChats")
    .slice(0, 2);
};