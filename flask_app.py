from flask import (
    Flask,
    request,
    jsonify,
    render_template,
    send_from_directory,
)
import json
import os
from datetime import datetime

# Flask app with explicit static/templates folders
app = Flask(__name__, static_folder="static", template_folder="templates")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "backend", "reflections.json")


def load_reflections():
    """Read all reflections from JSON file."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []


def save_reflections(reflections):
    """Save reflections list back to JSON file."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(reflections, f, indent=4, ensure_ascii=False)


# -------------------------------
# PAGE ROUTES
# -------------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/journal")
def journal_page():
    return render_template("journal.html")


@app.route("/project")
def project_page():
    return render_template("project.html")


@app.route("/about")
def about_page():
    return render_template("about.html")


@app.route("/reflection")
def reflection_page():
    return render_template("form4.html")


# -------------------------------
# PWA SUPPORT ROUTES
# -------------------------------

@app.route("/manifest.json")
def manifest():
    """Serve web app manifest."""
    return send_from_directory(app.static_folder, "manifest.json", mimetype="application/json")


@app.route("/sw.js")
def service_worker():
    """Serve service worker from root scope."""
    return send_from_directory(app.static_folder, "sw.js", mimetype="application/javascript")


# -------------------------------
# API ROUTES
# -------------------------------

@app.route("/api/reflections", methods=["GET"])
def get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)


@app.route("/api/reflections", methods=["POST"])
def add_reflection():
    data = request.get_json()

    if not data or "name" not in data or "reflection" not in data:
        return jsonify({"error": "Name and reflection are required"}), 400

    new_reflection = {
        "name": data["name"],
        "date": datetime.now().strftime("%a %b %d %Y"),
        "reflection": data["reflection"],
    }

    reflections = load_reflections()
    reflections.append(new_reflection)
    save_reflections(reflections)

    return jsonify(new_reflection), 201


if __name__ == "__main__":
    app.run(debug=True)
