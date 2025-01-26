import { Brain, Clock } from "lucide-react";

const AIInsights = () => {
  // Dummy data simulating AI insights
  const insights = {
    recommendations: [
      "Increase bandwidth during peak hours (12:00 PM - 3:00 PM).",
      "Optimize routing for reduced latency.",
    ],
    predicted_peak_times: ["12:00 PM - 3:00 PM", "6:00 PM - 9:00 PM"],
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium">AI Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {insights.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-purple-500 font-medium">
                  {index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600">{rec}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium">Predicted Peak Times</h3>
        </div>
        <div className="space-y-4">
          {insights.predicted_peak_times.map((time, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">{time}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
