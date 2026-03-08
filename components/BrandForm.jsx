export default function BrandForm({ onSubmit, loading }) {
  const objectives = [
    "Brand Awareness",
    "Product Promotion",
    "Engagement",
    "Lead Generation",
    "Community Building",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      brandName: e.target.brandName.value,
      industry: e.target.industry.value,
      objective: e.target.objective.value,
      productInfo: e.target.productInfo.value,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Brand Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Brand Name
        </label>
        <input
          type="text"
          name="brandName"
          placeholder="e.g. Nike, Apple, Zomato"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Industry / Category
        </label>
        <input
          type="text"
          name="industry"
          placeholder="e.g. Fashion, Food & Beverage, Tech"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Campaign Objective */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Campaign Objective
        </label>
        <select
          name="objective"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
        >
          {objectives.map((obj) => (
            <option key={obj} value={obj}>
              {obj}
            </option>
          ))}
        </select>
      </div>

      {/* Product Info */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          About the Brand / Products
        </label>
        <textarea
          name="productInfo"
          rows={4}
          placeholder="e.g. We sell premium running shoes designed for professional athletes. Our products focus on performance, durability and style."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm"
      >
        {loading ? "✨ Generating Tweets..." : "🚀 Generate Tweets"}
      </button>
    </form>
  );
}