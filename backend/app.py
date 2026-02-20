import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='/')
# Apply CORS to the entire app, allowing requests from any origin
CORS(app)

# Initialize the Groq client
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    logger.warning("GROQ_API_KEY is not set in the environment variables.")

client = Groq(
    api_key=api_key,
)

# Target-specific prompts in Korean
PROMPTS = {
    "Upward": "당신은 비즈니스 커뮤니케이션 전문가입니다. 사용자의 메시지를 상사에게 보고하기에 적합한 정중하고 격식 있는 말투로 변환해 주세요. 결론부터 명확하게 제시하며, 보고의 격식을 갖춘 정중한 격식체를 사용하세요.",
    "Lateral": "당신은 비즈니스 커뮤니케이션 전문가입니다. 사용자의 메시지를 타팀 동료에게 전달하기에 적합한 친절하고 상호 존중하는 말투로 변환해 주세요. 협업을 위한 요청 사항과 마감 기한을 명확히 전달하며, 협조적인 톤앤매너를 유지하세요.",
    "External": "당신은 비즈니스 커뮤니케이션 전문가입니다. 사용자의 메시지를 고객에게 전달하기에 적합한 극존칭과 전문성을 갖춘 말투로 변환해 주세요. 서비스 마인드와 신뢰감을 줄 수 있도록 정중하게 안내, 공지 또는 사과하는 형식을 갖추세요."
}

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/api/convert", methods=["POST"])
def convert_tone():
    """
    API endpoint to convert text tone using Groq AI.
    Implemented in Sprint 3.
    """
    data = request.get_json()
    if not data or "text" not in data or "target" not in data:
        return jsonify({"error": "Invalid input. 'text' and 'target' are required."}), 400

    original_text = data.get("text")
    target = data.get("target")

    if target not in PROMPTS:
        return jsonify({"error": f"Invalid target: {target}. Valid targets are {list(PROMPTS.keys())}"}), 400

    if not api_key:
        return jsonify({"error": "Backend API key is not configured."}), 500

    try:
        # Groq API call with the specified model
        completion = client.chat.completions.create(
            model="moonshotai/kimi-k2-instruct-0905",
            messages=[
                {"role": "system", "content": PROMPTS[target]},
                {"role": "user", "content": original_text}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        converted_text = completion.choices[0].message.content.strip()

        return jsonify({
            "original_text": original_text,
            "converted_text": converted_text,
            "target": target
        })

    except Exception as e:
        logger.error(f"Error during AI conversion: {str(e)}")
        return jsonify({"error": "말투 변환 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}), 500

if __name__ == "__main__":
    # Runs the app in debug mode on http://127.0.0.1:5000
    app.run(debug=True, port=5000)
