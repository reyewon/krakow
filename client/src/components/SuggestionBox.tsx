import { Activity } from "@/data/itinerary";

interface SuggestionBoxProps {
  suggestion: Activity;
}

export default function SuggestionBox({ suggestion }: SuggestionBoxProps) {
  if (suggestion.type !== 'suggestion') return null;

  return (
    <div className="suggestion-box bg-suggestion border border-gray-200 rounded-lg p-6">
      <h4 className="font-playfair text-lg font-semibold mb-3 text-gray-900">
        {suggestion.emoji} {suggestion.title}
      </h4>
      {suggestion.time && suggestion.location && (
        <p className="text-sm text-gray-600 mb-2">
          <strong>Time:</strong> {suggestion.time} • <strong>Location:</strong> {suggestion.location}
        </p>
      )}
      {suggestion.whyItFits && (
        <p className="mb-3">
          <strong>Why it fits you:</strong> {suggestion.whyItFits}
        </p>
      )}
      {suggestion.ambiance && (
        <p className="mb-3">
          <strong>Ambiance:</strong> {suggestion.ambiance}
        </p>
      )}
      {suggestion.recommendedDish && (
        <p className="mb-2">
          <strong>Recommended Dish:</strong> {suggestion.recommendedDish}
        </p>
      )}
      {suggestion.details && (
        <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: suggestion.details }} />
      )}
    </div>
  );
}
