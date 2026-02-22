const fs = require('fs');

async function translateText(text, targetLang) {
    if (!text || targetLang === 'en') return text;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        return data[0].map((item) => item[0]).join('');
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

async function translateData() {
    const rawData = fs.readFileSync('src/scheme.json', 'utf8');
    const schemes = JSON.parse(rawData);

    // Limit to 50 for performance and rate limits otherwise it will fail
    const limitedSchemes = schemes.slice(0, 50);

    const translatedSchemesHindi = [];

    console.log("Translating to Hindi...");
    for (let i = 0; i < limitedSchemes.length; i++) {
        const s = limitedSchemes[i];
        console.log(`Translating scheme ${i + 1}/${limitedSchemes.length}`);

        translatedSchemesHindi.push({
            ...s,
            scheme_name: await translateText(s.scheme_name, 'hi'),
            details: await translateText(s.details, 'hi'),
            benefits: await translateText(s.benefits, 'hi'),
            eligibility: await translateText(s.eligibility, 'hi'),
            application: await translateText(s.application, 'hi'),
            documents: await translateText(s.documents, 'hi'),
            schemeCategory: await translateText(s.schemeCategory, 'hi')
        });
        // Adding a slight delay to avoid rate limits
        await new Promise(r => setTimeout(r, 200));
    }

    fs.writeFileSync('src/data/schemesList_hi.json', JSON.stringify(translatedSchemesHindi, null, 2));
    console.log("Finished translating to Hindi!");
}

translateData();
