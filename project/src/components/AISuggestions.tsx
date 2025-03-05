import React from 'react';
import { Sparkles } from 'lucide-react';
import OpenAI from 'openai';
import { airports } from '../data/airports';

interface AISuggestionsProps {
  onSelectSuggestion: (from: string, to: string) => void;
}

export function AISuggestions({ onSelectSuggestion }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = React.useState<Array<{ from: string, to: string, reason: string }>>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generateSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const airportCodes = airports.map(airport => airport.code).join(', ');
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `You are a travel expert. Generate 3 flight route suggestions with reasons why someone might want to take this route. Only use airport codes from this list: ${airportCodes}. Include a mix of direct and multi-stop routes.`
        }, {
          role: "user",
          content: "Generate 3 interesting flight routes with compelling reasons for travel, considering factors like cultural experiences, business opportunities, or unique attractions."
        }],
        temperature: 0.7,
      });

      const suggestionsText = response.choices[0].message.content;
      const parsedSuggestions = parseSuggestionsFromAI(suggestionsText);
      setSuggestions(parsedSuggestions);
    } catch (err) {
      setError("Failed to generate suggestions. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseSuggestionsFromAI = (text: string): Array<{ from: string, to: string, reason: string }> => {
    const suggestions = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const match = line.match(/([A-Z]{3})\s*(?:to|-|→)\s*([A-Z]{3})/);
      if (match) {
        const [_, from, to] = match;
        const reason = line.split(':')[1]?.trim() || 'Interesting route!';
        suggestions.push({ from, to, reason });
      }
    }

    return suggestions.slice(0, 3);
  };

  return (
    <div className="mb-8">
      <button
        onClick={generateSuggestions}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        <Sparkles size={16} />
        <span>{loading ? 'Generating...' : 'Get AI Suggestions'}</span>
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4 space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectSuggestion(suggestion.from, suggestion.to)}
            >
              <div className="flex items-center gap-2 text-purple-600 font-medium">
                <Sparkles size={16} />
                {suggestion.from} → {suggestion.to}
              </div>
              <p className="mt-1 text-gray-600">{suggestion.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}