import json
from datetime import datetime

reflection = input("Type your journal reflection: ").strip()
if not reflection:
    print("No reflection entered.")
    exit()

entry = {
    "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "text": reflection
}

filename = "reflections.json"
try:
    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)
except (FileNotFoundError, json.decoder.JSONDecodeError):
    data = []

data.append(entry)
with open(filename, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
print("Entry added.")
