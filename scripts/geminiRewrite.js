const axios = require('axios');

module.exports = async function rewrite(original, ref1, ref2) {
    const prompt = `
    You are a professional content writer.
    Rewrite and enhance the following article using structure, tone, and SEO practices
    from the reference articles.

    Original:
    ${original}

    Reference 1: 
    ${ref1}

    Reference 2: 
    ${ref2}

    Return a polished blog article with headings and conclusion.
    `;

    const res = await axios.post(
        `https://generativelanguage.googleapis.com/vibeta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [{parts: [{text: prompt}] }]
        }
    );

    return res.data.candidates[0].content.parts[0].text;
};