import { Menu, Bell, Home, Sun, User } from "lucide-react";

const TopNav = () => {
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Menu size={20} className="text-gray-500" />
        </button>
        {/* <div className="flex items-center gap-6 text-gray-600">
          <button className="hover:text-gray-900">Dashboard</button>
          <button className="hover:text-gray-900">Users</button>
          <button className="hover:text-gray-900">Settings</button>
        </div> */}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Bell size={20} className="text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Home size={20} className="text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Sun size={20} className="text-gray-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
