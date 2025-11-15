from flask import Flask, request, jsonify
from datetime import datetime
import json
import os

app = Flask(__name__)

DATA_FILE = "reflections.json"


@app.route("/get-reflections", methods=["GET"])
def get_reflections():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        data = []
    return jsonify(data)


@app.route("/add-reflection", methods=["POST"])
def add_reflection():
    body = request.get_json()
    reflection = body.get("text", "").strip()

    if not reflection:
        return jsonify({"error": "Reflection text required"}), 400

    entry = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "text": reflection
    }

    # Read old data
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        data = []

    # Append and save
    data.append(entry)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return jsonify({"message": "Saved", "entry": entry}), 200


if __name__ == "__main__":
    app.run()
