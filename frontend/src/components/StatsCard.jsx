import { MoreVertical } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const StatsCard = ({ title, value, change, changeType, color, data }) => {
  const sparklineData = data || [
    { value: 40 },
    { value: 30 },
    { value: 45 },
    { value: 35 },
    { value: 50 },
    { value: 40 },
    { value: 35 },
  ];

  const colors = {
    purple: {
      main: "#6366F1",
      light: "#818CF8",
    },
    blue: {
      main: "#3B82F6",
      light: "#60A5FA",
    },
    yellow: {
      main: "#F59E0B",
      light: "#FBBF24",
    },
    red: {
      main: "#EF4444",
      light: "#F87171",
    },
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">{value}</span>
            <span
              className={`text-sm ${
                changeType === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              ({change})
            </span>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient
                id={`gradient-${title}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={selectedColor.main}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={selectedColor.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={selectedColor.main}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;
