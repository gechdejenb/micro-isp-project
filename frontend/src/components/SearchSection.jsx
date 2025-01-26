import { Search } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const SearchSection = ({ data }) => {
  return (
    <div className="col-span-3 bg-white rounded-xl p-6 shadow-sm">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Commodo</h4>
          <p className="text-sm text-gray-500">Sed diam nonummy nibh euismod</p>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLorem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="Lorem"
              stroke="#4F46E5"
              fill="url(#colorLorem)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIpsum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="Ipsum"
              stroke="#F97316"
              fill="url(#colorIpsum)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SearchSection;
