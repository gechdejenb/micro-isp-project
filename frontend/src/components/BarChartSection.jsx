import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BarChartSection = ({ data, barData }) => {
  return (
    <div className="col-span-6 space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-medium mb-4">Adipiscing</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Lorem" fill="#F97316" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Ipsum" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartSection;
