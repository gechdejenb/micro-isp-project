import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, Clock } from "lucide-react";

const AIInsights = () => {
  const [insights, setInsights] = useState({
    recommendations: [],
    predicted_peak_times: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial AI insights
  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ai-insights');
        console.log('peak times ', response.data);
        setInsights({
          recommendations: [response.data.insights], // Map "insights" to "recommendations"
          predicted_peak_times: [], // Add an empty array for predicted_peak_times
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, []);

  // Connect to SSE for real-time network data
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/api/stream-network-data');
    console.log('eventSource ', eventSource);
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setInsights((prev) => ({
        ...prev,
        recommendations: [...prev.recommendations, `New recommendation based on ${newData.bandwidth}Mbps bandwidth.`],
      }));
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Cleanup on unmount
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium">AI Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {insights.recommendations?.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-purple-500 font-medium">{index + 1}</span>
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
          {insights.predicted_peak_times?.map((time, index) => (
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