import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Clock } from "lucide-react";

const NetworkHistory = () => {
  const [loggedData, setLoggedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/logged-data');
        if (Array.isArray(response.data)) {
          setLoggedData(response.data);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate average values
  const avgBandwidth = (loggedData.reduce((acc, curr) => acc + curr.bandwidth, 0) / loggedData.length).toFixed(1);
  const avgLatency = (loggedData.reduce((acc, curr) => acc + curr.latency, 0) / loggedData.length).toFixed(1);
  const avgPacketLoss = (loggedData.reduce((acc, curr) => acc + curr.packet_loss, 0) / loggedData.length).toFixed(2);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium">Network History</h3>
        </div>
        <select className="text-sm border rounded px-2 py-1">
          <option>Last 6 Hours</option>
          <option>Last 12 Hours</option>
          <option>Last 24 Hours</option>
        </select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={loggedData}>
            <XAxis dataKey="timestamp" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFF",
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="bandwidth"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Bandwidth (%)"
            />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              name="Latency (ms)"
            />
            <Line
              type="monotone"
              dataKey="packet_loss"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              name="Packet Loss (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div>
          <div className="text-sm text-gray-500">Avg. Bandwidth</div>
          <div className="text-lg font-medium">{avgBandwidth}%</div>
          <div className="text-sm text-green-500">+12.5%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Avg. Latency</div>
          <div className="text-lg font-medium">{avgLatency}ms</div>
          <div className="text-sm text-red-500">+3.2ms</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Avg. Packet Loss</div>
          <div className="text-lg font-medium">{avgPacketLoss}%</div>
          <div className="text-sm text-yellow-500">±0.3%</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHistory;