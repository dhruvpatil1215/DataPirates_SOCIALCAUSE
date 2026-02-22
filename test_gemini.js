
async function test() {
    const API_KEY = "AIzaSyBjPZgMQEFnPd93SAg92eW2vTObhOMdSEg";
    const text = "hey";
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are Sahara AI Assistant, an expert on Indian government schemes. Help the user with their query: ${text}. Give short, clear, helpful answers.` }] }],
            }),
        }
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

test();
