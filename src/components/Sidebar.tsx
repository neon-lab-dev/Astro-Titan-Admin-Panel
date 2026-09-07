import {
  LayoutDashboard,
  Users,
  Star,
  // CreditCard,
  // FileText,
  LogOut,
  ShoppingBag,
  Flower2,
  ShoppingCart,
  Sparkles,
  StarIcon,
  FileText,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.webp";
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
      label: "Products",
      path: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      label: "Product Orders",
      path: "/dashboard/product-orders",
      icon: ShoppingCart,
    },
    {
      label: "Pooja",
      path: "/dashboard/puja",
      icon: Flower2,
    },
    {
      label: "Pooja Bookings",
      path: "/dashboard/pooja-bookings",
      icon: StarIcon,
    },

    {
      label: "Consultations",
      path: "/dashboard/consultations",
      icon: Sparkles,
    },
    {
      label: "Kundli Requests",
      path: "/dashboard/kundli-requests",
      icon: StarIcon,
    },

    // {
    //   label: "Transactions & Payments",
    //   path: "/dashboard/transactions-payments",
    //   icon: CreditCard,
    // },
    {
      label: "Subscription Plan",
      path: "/dashboard/subscription-plan",
      icon: FileText,
    },
  ];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen w-60 sticky top-0 left-0 bg-[#715700] border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center p-4">
        <Link to={"/dashboard"}>
          <img src={logo} alt="" className="w-14" />
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-[#715700]">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                item.path === location.pathname
                  ? "bg-blue-50 text-yellow-600"
                  : "text-gray-300 hover:text-yellow-600 hover:bg-gray-100"
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
          className="flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d4af37] hover:bg-[#d4af37]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer w-full"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
