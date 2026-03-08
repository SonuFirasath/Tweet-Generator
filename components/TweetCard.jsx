export default function TweetCard({ tweet, index }) {
  const styleColors = {
    Conversational: "bg-blue-100 text-blue-700",
    Promotional: "bg-purple-100 text-purple-700",
    Witty: "bg-yellow-100 text-yellow-700",
    Informative: "bg-green-100 text-green-700",
  };

  const styleEmojis = {
    Conversational: "💬",
    Promotional: "🚀",
    Witty: "😄",
    Informative: "💡",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 font-semibold text-sm">#{index}</span>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            styleColors[tweet.style] || "bg-gray-100 text-gray-600"
          }`}
        >
          {styleEmojis[tweet.style]} {tweet.style}
        </span>
      </div>
      <p className="text-gray-800 text-sm leading-relaxed">{tweet.tweet}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-300 text-xs">
          {tweet.tweet.length} / 280 chars
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(tweet.tweet)}
          className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
        >
          Copy 📋
        </button>
      </div>
    </div>
  );
}