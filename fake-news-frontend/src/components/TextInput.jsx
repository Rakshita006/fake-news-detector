function TextInput({ text, setText, onAnalyze, loading }) {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-sm text-gray-500 mb-2">
        ⚠️ For best results, paste a full news article (not a single sentence)
      </p>
      <textarea
        className="w-full p-4 border rounded-lg shadow-md"
        rows="6"
        placeholder="Paste news article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={onAnalyze}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default TextInput;
