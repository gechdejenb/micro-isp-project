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
  // Dummy data simulating logged network data
  const loggedData = [
    { bandwidth: 50, latency: 15, packet_loss: 0.5, timestamp: "12:00" },
    { bandwidth: 60, latency: 20, packet_loss: 1.0, timestamp: "13:00" },
    { bandwidth: 75, latency: 18, packet_loss: 0.8, timestamp: "14:00" },
    { bandwidth: 65, latency: 25, packet_loss: 1.2, timestamp: "15:00" },
    { bandwidth: 80, latency: 22, packet_loss: 1.5, timestamp: "16:00" },
    { bandwidth: 70, latency: 19, packet_loss: 0.9, timestamp: "17:00" },
  ];

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
          <div className="text-lg font-medium">66.7%</div>
          <div className="text-sm text-green-500">+12.5%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Avg. Latency</div>
          <div className="text-lg font-medium">19.8ms</div>
          <div className="text-sm text-red-500">+3.2ms</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Avg. Packet Loss</div>
          <div className="text-lg font-medium">0.98%</div>
          <div className="text-sm text-yellow-500">±0.3%</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHistory;
