export default function BrandVoiceSummary({ brandVoice }) {
  const items = [
    {
      label: "Tone",
      value: brandVoice.tone,
      emoji: "🎨",
      color: "bg-purple-50 border-purple-200",
      labelColor: "text-purple-600",
    },
    {
      label: "Target Audience",
      value: brandVoice.targetAudience,
      emoji: "🎯",
      color: "bg-blue-50 border-blue-200",
      labelColor: "text-blue-600",
    },
    {
      label: "Content Themes",
      value: brandVoice.contentThemes,
      emoji: "📌",
      color: "bg-yellow-50 border-yellow-200",
      labelColor: "text-yellow-600",
    },
    {
      label: "Personality",
      value: brandVoice.personality,
      emoji: "✨",
      color: "bg-green-50 border-green-200",
      labelColor: "text-green-600",
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🧠 Brand Voice Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border p-4 ${item.color}`}
          >
            <p className={`text-xs font-bold uppercase mb-1 ${item.labelColor}`}>
              {item.emoji} {item.label}
            </p>
            <p className="text-gray-700 text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}