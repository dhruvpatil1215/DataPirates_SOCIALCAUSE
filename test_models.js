const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function listModels() {
    const API_KEY = "AIzaSyDGdqTu3re3vdN5gWTWo5Lyl5CvaU_nTY0";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        if (data.models) {
            const usefulModels = data.models
                .filter(m => m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name.replace("models/", ""));
            console.log("Useful models:", usefulModels);
        } else {
            console.log("No models found or error:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
