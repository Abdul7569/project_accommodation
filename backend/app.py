from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_bot import chatbot_response  # ✅ Import the response function

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please type something."})

    response = chatbot_response(user_message)  # ✅ Now this will work!
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
