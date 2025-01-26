import {
  Home,
  Type,
  Square,
  PieChart,
  FileText,
  Bell,
  Layout,
  FileCode,
  Star,
  Box,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-60 min-h-screen bg-[#1e2022] text-gray-400">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-xl">
            <span className="text-blue-500">AC</span>MT
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-blue-500 bg-blue-500/10 px-3 py-2 rounded">
            <Home size={18} />
            <span className="text-sm font-medium">Dashboard</span>
            {/* <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
              NEW
            </span> */}
          </div>
        </div>

        {/* <div className="mb-6">
          <div className="text-xs font-semibold text-gray-500 mb-2">THEME</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Type size={18} />
              <span className="text-sm">Typography</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Square size={18} />
              <span className="text-sm">Colors</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-500 mb-2">
            COMPONENTS
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Square size={18} />
              <span className="text-sm">Base</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Box size={18} />
              <span className="text-sm">Buttons</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <PieChart size={18} />
              <span className="text-sm">Charts</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <FileText size={18} />
              <span className="text-sm">Forms</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Star size={18} />
              <span className="text-sm">Icons</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Bell size={18} />
              <span className="text-sm">Notifications</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <Layout size={18} />
              <span className="text-sm">Widgets</span>
              <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                NEW
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-500 mb-2">EXTRAS</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <FileText size={18} />
              <span className="text-sm">Pages</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded cursor-pointer">
              <FileCode size={18} />
              <span className="text-sm">Docs</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2 px-3 py-2 text-blue-400 hover:bg-gray-800 rounded cursor-pointer">
            <Star size={18} />
            <span className="text-sm font-medium">Try CoreUI PRO</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;