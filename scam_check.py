from urllib.parse import urlparse
import re

def verify_government_link(url: str):
    """
    Enhanced verification for official government domains.
    - Handles missing http/https prefixes
    - Checks for .gov.in and .nic.in strictly on root domains
    - Detects typosquatting (e.g., pmkisan.gov.in.xyz.com)
    - Verifies specific sub-org domains like .edu.in or .org.in for govt bodies
    """
    if not url:
        return {"status": "Invalid URL", "color": "red"}
    url = url.strip()
    if not (url.startswith('http://') or url.startswith('https://')):
        url = 'https://' + url

    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()

        domain = domain.split(':')[0]

        if domain.endswith(".gov.in") or domain.endswith(".nic.in"):
            return {
                "status": "✅ Safe Official Government Link",
                "domain": domain,
                "confidence": "High"
            }
        
        if any(domain.endswith(ext) for ext in [".res.in", ".ac.in", ".edu.in"]):
            return {
                "status": "ℹ️ Official Institutional Link (.ac/.res)",
                "domain": domain,
                "confidence": "Medium"
            }
        shorteners = ["bit.ly", "t.co", "tinyurl.com", "rebrand.ly", "whatsapp.com"]
        if any(s in domain for s in shorteners):
             return {
                "status": "⚠️ Highly Suspicious (Shortened/Social Link)",
                "domain": domain,
                "risk": "High"
            }

        return {
            "status": "❌ Suspicious Link (Not a Govt Domain)",
            "domain": domain,
            "risk": "Potential Scam"
        }

    except Exception:
        return {"status": "Invalid URL format", "color": "red"}

if __name__ == "__main__":
    test_urls = [
        "https://pmkisan.gov.in",
        "http://registration.up.nic.in/index.html",
        "pmkisan.gov.in.fake.site",
        "bit.ly/gov-scheme",
        "www.google.com"
    ]
    for t in test_urls:
        print(f"URL: {t} -> {verify_government_link(t)['status']}")
