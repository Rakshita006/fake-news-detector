function ResultCard({
  result,
  confidence,
  explanation,
  text,
  highlightText,
  articles,
}) {
  if (!result) return null;

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-semibold">
        Result:{" "}
        <span className={result === "Fake" ? "text-red-500" : "text-green-500"}>
          {result}
        </span>
      </h2>

      <p className="mt-2 text-lg">
        Confidence: <strong>{confidence}%</strong>
      </p>

      {/* 🔥 Confidence Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mt-3 transition-all duration-500">
        <div
          className={`h-4 rounded-full ${
            result === "Fake" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${confidence}%` }}
        ></div>
      </div>

      <p className="mt-4 text-gray-600">{explanation}</p>

      <h3 className="font-semibold mb-2">
        🔍 Highlighted Analysis (AI Detected Patterns):
      </h3>

      <div className="mt-6 text-left bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Analyzed Text:</h3>
        <p>{highlightText(text)}</p>
      </div>

      {articles && articles.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="font-semibold mb-2">📰 Related Real News:</h3>
          <ul className="list-disc ml-5">
            {articles.map((a, i) => (
              <li key={i}>
                <a
                  href={a.url}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
