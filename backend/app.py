import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
# from groq import Groq

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='/')
# Apply CORS to the entire app, allowing requests from any origin
CORS(app)

# Initialize the Groq client
# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/api/convert", methods=["POST"])
def convert_tone():
    """
    API endpoint to convert text tone.
    For Sprint 1, this returns a dummy response.
    """
    data = request.get_json()
    if not data or "text" not in data or "target" not in data:
        return jsonify({"error": "Invalid input. 'text' and 'target' are required."}), 400

    original_text = data.get("text")
    target = data.get("target")

    # Sprint 1: Return a simple, dummy response based on the target
    dummy_response = f"This is a dummy converted text for '{original_text}' addressing '{target}'."
    
    # The actual Groq API call will be implemented in a later sprint.
    # For now, we simulate a successful response.
    
    return jsonify({
        "original_text": original_text,
        "converted_text": dummy_response,
        "target": target
    })

if __name__ == "__main__":
    # Runs the app in debug mode on http://127.0.0.1:5000
    app.run(debug=True, port=5000)
