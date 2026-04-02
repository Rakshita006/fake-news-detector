# 📰 Fake News Detector with AI

An intelligent web application that detects whether a news article is **Real or Fake** using Machine Learning, with explainability, confidence score, and real news verification.

---

## 🚀 Features

- 🧠 ML-based Fake News Detection
- 📊 Confidence Score with visual bar
- 🔍 Keyword Highlighting (important words influencing prediction)
- 📰 Real News Verification (via News API)
- ⚡ Fast & responsive UI (React + Vite)
- 🌐 Full-stack project (Frontend + Backend)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Python
- Flask
- Flask-CORS

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression / Naive Bayes

### APIs
- NewsAPI (for real news verification)

---

## 📂 Project Structure
fake-news-detector/
│
├── fake-news-frontend/ # React frontend
├── fake-news-ml/ # Flask backend + ML model
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Rakshita006/fake-news-detector.git
cd fake-news-detector

2️⃣ Backend Setup
cd fake-news-ml
pip install -r requirements.txt
python app.py

3️⃣ Frontend Setup
cd fake-news-frontend
npm install
npm run dev

Environment Variables

Create a .env file in backend:

NEWS_API_KEY=your_api_key_here

How it Works
User enters news text
ML model predicts:
Fake ❌ or Real ✅
Displays:
Confidence score
Highlighted keywords
Fetches related real news articles
📦 Dataset
Fake and Real News Dataset (Kaggle)
