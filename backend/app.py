import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
# from groq import Groq

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Apply CORS to the entire app, allowing requests from any origin
CORS(app)

# Initialize the Groq client
# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )

@app.route("/")
def index():
    # A simple health check or welcome page
    return "Welcome to the BizTone Converter API!"

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
    app.run(debug=True)
