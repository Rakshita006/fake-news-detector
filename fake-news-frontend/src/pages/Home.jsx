import { useState } from "react";
import TextInput from "../components/TextInput";
import ResultCard from "../components/ResultCard";

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [articles,setArticles]=useState([])
  const [analyzedText,setAnalyzedText]=useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const suspiciousWords = [
  "breaking",
  "shocking",
  "secret",
  "confirmed",
  "exclusive",
  "urgent",
  "alert",
  "exposed",
  "truth",
  "revealed"
];

const fetchRealNews=async(text)=>{
    try {
      const res=await fetch(`${API_URL}/real-news`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    const data=await res.json()
    setArticles(data.articles)
    } catch (error) {
       console.error("Error fetching news:", err);
    }
}

  const highlightText=(text)=>{
    const words=text.split(" ")

    return words?.map((word,index)=>{
       const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");

       if (suspiciousWords.includes(cleanWord)) {
      return (
        <span key={index} className="text-red-500 font-semibold">
          {word}{" "}
        </span>
      );
    }

    return word + " ";
    })
  }

  const analyzeNews = async () => {
    if (!text) return;

    if (text.length < 100) {
      alert("Please enter a longer news article for better accuracy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      setAnalyzedText(text)
      setResult(data.prediction);
      await fetchRealNews(text)
      setConfidence(data.confidence);
      setExplanation(data.explanation);
    } catch (error) {
      console.error(error);
      setResult("Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        📰 Fake News Detector
      </h1>

      <TextInput
        text={text}
        setText={setText}
        onAnalyze={analyzeNews}
        loading={loading}
      />

      <ResultCard
        result={result}
        confidence={confidence}
        explanation={explanation}
        text={analyzedText} 
        highlightText={highlightText}
        articles={articles}
      />
    </div>
  );
}

export default Home;
