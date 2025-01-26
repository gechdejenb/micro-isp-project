import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import NetworkMetrics from "./components/NetworkMetrics";
import NetworkHistory from "./components/NetworkHistory";
import AIInsights from "./components/AIInsights";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#ebedef]">
      <Sidebar />
      <div className="flex-1">
        {/* <TopNav /> */}
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <a href="#" className="text-blue-500 hover:underline">
              Home
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Dashboard</span>
          </div>

          {/* Network Metrics */}
          <div className="mb-6">
            <NetworkMetrics />
          </div>

          {/* Network History */}
          <div className="mb-6">
            <NetworkHistory />
          </div>

          {/* AI Insights */}
          <div className="mb-6">
            <AIInsights />
          </div>

          {/* Social Media Section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#4267B2] text-white rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">f</div>
                <div className="text-sm opacity-80">facebook</div>
              </div>
            </div>
            <div className="bg-[#1DA1F2] text-white rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">t</div>
                <div className="text-sm opacity-80">twitter</div>
              </div>
            </div>
            <div className="bg-[#0A66C2] text-white rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">in</div>
                <div className="text-sm opacity-80">linkedin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
