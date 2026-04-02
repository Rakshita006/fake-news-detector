from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv


load_dotenv()

API_KEY=os.getenv("NEWS_API_KEY")
app = Flask(__name__)
CORS(app)

# Load model + vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))



@app.route("/real-news", methods=["POST"])
def real_news():
    text = request.json["text"]

    # Use only first 100 chars (better query)
    query = " ".join(text.split()[:10])

    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}"

    response = requests.get(url)
    data = response.json()

    articles = []
    for article in data.get("articles", [])[:5]:
        articles.append({
            "title": article["title"],
            "url": article["url"]
        })

    return jsonify({"articles": articles})

@app.route("/")
def home():
    return "Fake News Detector API is running!"

def generate_explanation(data,prediction):
    if prediction == 0:
        return "This text shows patterns commonly found in misleading or sensational news."
    else:
        return "This text appears similar to factual and well-structured news articles."

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["text"]

    vect = vectorizer.transform([data])
    prediction = model.predict(vect)[0]
    probability = model.predict_proba(vect)[0]
    
    confidence = probability[prediction] * 100

    explanation = generate_explanation(data, prediction)

    result = "Real" if prediction == 1 else "Fake"

    return jsonify({
        "prediction": result,
        "confidence": round(confidence, 2),
        "explanation":explanation
    })

if __name__ == "__main__":
    app.run(debug=True)