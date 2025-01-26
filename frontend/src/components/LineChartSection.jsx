import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const LineChartSection = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pageviewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E5E7EB"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFF",
            border: "none",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="visits"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#10B981" }}
        />
        <Line
          type="monotone"
          dataKey="unique"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#3B82F6" }}
        />
        <Line
          type="monotone"
          dataKey="pageviews"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#F59E0B" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartSection;
