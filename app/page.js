"use client";

import { useState } from "react";
import BrandForm from "@/components/BrandForm";
import BrandVoiceSummary from "@/components/BrandVoiceSummary";
import TweetCard from "@/components/TweetCard";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-900">
            🐦 AI Tweet Generator
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate 10 on-brand tweets for any brand in seconds
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            📋 Tell us about your brand
          </h2>
          <BrandForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 mb-8 text-sm">
            ❌ {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 animate-bounce">✨</div>
            <p className="text-gray-500 font-medium">
              Analyzing brand voice and generating tweets...
            </p>
            <p className="text-gray-400 text-sm mt-1">
              This usually takes 5-10 seconds
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div>
            {/* Brand Voice Summary */}
            <BrandVoiceSummary brandVoice={result.brandVoice} />

            {/* Tweets Grid */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🐦 Generated Tweets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {result.tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} index={tweet.id} />
              ))}
            </div>

            {/* Regenerate Button */}
            <div className="text-center mt-10">
              <button
                onClick={() => setResult(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors duration-200 text-sm"
              >
                🔄 Generate for Another Brand
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}