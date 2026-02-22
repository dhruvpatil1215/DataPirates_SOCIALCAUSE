import json
import os

_schemes_cache = None

def load_schemes():
    """Loads schemes from the actual scheme.json file with caching."""
    global _schemes_cache
    if _schemes_cache is not None:
        return _schemes_cache

    base_dir = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(base_dir, "scheme.json")
    if not os.path.exists(path):
        path = os.path.join(base_dir, "schemes.json")
    
    if not os.path.exists(path):
        return []
        
    try:
        with open(path, "r", encoding='utf-8') as f:
            _schemes_cache = json.load(f)
            return _schemes_cache
    except Exception:
        return []

def get_chat_response(message: str):
    """
    Ranks and counts schemes based on live data in scheme.json.
    """
    msg = message.lower()
    schemes = load_schemes()
    
    if not schemes:
        return {"response": "I'm sorry, I couldn't load the schemes database right now."}

    # Keywords for different categories
    categories = {
        "farmer": ["farmer", "agriculture", "kisan", "crop", "farming"],
        "student": ["student", "scholarship", "education", "study", "college", "school"],
        "women": ["women", "female", "girl", "mother", "lady", "indira mahila"],
        "business": ["business", "msme", "startup", "entrepreneur", "industry", "textile", "incentive"],
        "labor": ["labor", "worker", "construction", "shramik"],
        "health": ["health", "medical", "hospital", "insurance", "bima"]
    }

    found_category = None
    for cat, keywords in categories.items():
        if any(k in msg for k in keywords):
            found_category = cat
            break

    if found_category:
        # Filter schemes matching the category keywords
        keywords = categories[found_category]
        matches = []
        for s in schemes:
            corpus = (s.get("scheme_name", "") + " " + s.get("details", "") + " " + s.get("tags", "")).lower()
            if any(k in corpus for k in keywords):
                matches.append(s)
        
        count = len(matches)
        if count > 0:
            top_3_names = [s.get("scheme_name") for s in matches[:3]]
            response_text = f"I found {count} {found_category} related schemes in the database. "
            response_text += f"Key ones include: {', '.join(top_3_names)}. "
            response_text += "You can use the Eligibility tool to check if you qualify for these!"
            return {"response": response_text}
        else:
            return {"response": f"I see you're asking about {found_category} schemes, but I couldn't find a direct match in the current dataset."}

    # Handle "How many" generic query
    if "how many" in msg and "scheme" in msg:
        return {"response": f"There are currently {len(schemes)} schemes available in our database. What specific area (like farming, education, or business) are you interested in?"}

    # Intent: Registration / How to use
    if any(k in msg for k in ["register", "sign up", "how to use", "steps", "tutorial"]):
        return {
            "response": (
                "To register and find schemes on Sahara AI, follow these steps:\n"
                "1. **Check Eligibility**: Go to the Eligibility section and enter your details (Age, State, Gender, Income).\n"
                "2. **Search via Chat**: Ask me about specific needs like 'farming' or 'scholarships'.\n"
                "3. **Verify Links**: If you have a scheme link, use our Scam Check tool to ensure it's an official .gov.in site.\n"
                "4. **Apply**: Click the 'Official URL' on any matched scheme to go to the government portal."
            )
        }

    # Default Response
    return {
        "response": "I can help you search through our database of government schemes. Try asking about 'farmer schemes', 'scholarships', or 'how do I register' to see what's available."
    }
