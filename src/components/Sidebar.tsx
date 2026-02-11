import {
  LayoutDashboard,
  Users,
  Star,
  CreditCard,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Features/Auth/authSlice";

export function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "User Management",
      path: "/dashboard/user-management",
      icon: Users,
    },
    {
      label: "Astrologer Management",
      path: "/dashboard/astrologer-management",
      icon: Star,
    },
    {
      label: "Transactions & Payments",
      path: "/dashboard/transactions-payments",
      icon: CreditCard,
    },
    {
      label: "Content Management",
      path: "/dashboard/content-management",
      icon: FileText,
    },
    {
      label: "Platform Settings",
      path: "/dashboard/platform-settings",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen w-57 sticky top-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-center p-4">
        <Link to={"/dashboard"}>
          <img src={logo} alt="" className="w-14" />
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                item.path === location.pathname
                  ? "bg-blue-50 dark:bg-blue-900/20 text-yellow-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer w-full"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
