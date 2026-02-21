const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'scheme.json');
const destPath = path.join(__dirname, 'src', 'data', 'schemesList.js');

try {
    const rawData = fs.readFileSync(srcPath, 'utf8');
    const allSchemes = JSON.parse(rawData);

    // Filter and map all entries
    const curatedSchemes = allSchemes.map((s, index) => {
        // Clean categories: Take the first part of a comma or slash separated list
        let category = "General";
        if (s.schemeCategory) {
            category = s.schemeCategory.split(/[,\/&]/)[0].trim();
        }

        return {
            id: index + 1,
            title: s.scheme_name.replace(/^"|"$/g, '').trim(),
            category: category,
            benefit: s.benefits && s.benefits.length > 80 ? s.benefits.substring(0, 77) + "..." : (s.benefits || "Govt Support"),
            description: s.details && s.details.length > 200 ? s.details.substring(0, 197) + "..." : (s.details || "Details not available.")
        };
    });

    const fileContent = `export const MOCK_SCHEMES = ${JSON.stringify(curatedSchemes, null, 4)};`;
    fs.writeFileSync(destPath, fileContent);
    console.log(`Successfully extracted ${curatedSchemes.length} schemes to ${destPath}`);

} catch (err) {
    console.error('Error processing schemes:', err);
}
