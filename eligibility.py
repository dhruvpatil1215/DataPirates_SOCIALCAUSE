import json
import os

def load_schemes():
    """Loads schemes from the local schemes.json file with absolute path logic."""
    try:
        # Get the directory where this file (eligibility.py) is located
        base_dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(base_dir, "schemes.json")
        
        if not os.path.exists(path):
            print(f"DEBUG: File not found at {path}")
            return []
            
        with open(path, "r", encoding='utf-8') as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"DEBUG: Error in load_schemes: {e}")
        return []

def check_eligibility(user_data):
    """
    Simplified eligibility logic to ensure results are returned.
    """
    schemes = load_schemes()
    if not schemes:
        return []

    eligible_schemes = []
    
    # Normalize inputs
    u_age = int(user_data.get("age", 0))
    u_income = int(user_data.get("income", 0))
    u_state = str(user_data.get("state", "any")).lower().strip()
    u_gender = str(user_data.get("gender", "any")).lower().strip()
    u_occ = str(user_data.get("occupation", "any")).lower().strip()

    wildcards = ["any", "all", "none", ""]

    for scheme in schemes:
        # Age check
        min_age = scheme.get("min_age", 0)
        max_age = scheme.get("max_age", 120)
        if not (min_age <= u_age <= max_age):
            continue
            
        # Income check
        max_income = scheme.get("max_income", 9999999)
        if u_income > max_income:
            continue
            
        # State check
        s_state = str(scheme.get("state", "any")).lower().strip()
        if s_state not in wildcards and u_state not in wildcards:
            if s_state != u_state:
                continue
                
        # Gender check
        s_gender = str(scheme.get("gender", "any")).lower().strip()
        if s_gender not in wildcards and u_gender not in wildcards:
            if s_gender != u_gender:
                continue

        # Occupation check
        s_occ = str(scheme.get("occupation", "any")).lower().strip()
        if s_occ not in wildcards and u_occ not in wildcards:
            if s_occ != u_occ:
                continue

        eligible_schemes.append(scheme)
    
    return eligible_schemes[:10]

if __name__ == "__main__":
    # Test case matching the user's input
    test_input = {
        "age": 12,
        "income": 20000,
        "state": "all",
        "gender": "female",
        "occupation": "student"
    }
    print(f"Running standalone test with: {test_input}")
    res = check_eligibility(test_input)
    print(f"Found {len(res)} schemes")
    for r in res:
        print(f"- {r.get('name')}")
