/* eslint-disable @typescript-eslint/no-explicit-any */
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import {
  Users,
  Star,
  BadgeCheck,
  Clock,
  CreditCard,
  DollarSign,
  AlertCircle,
  FileText,
  CheckCircle,
  EyeOff,
} from 'lucide-react';


type DashboardCard = {
  id: string;
  title: string;
  value: number;
  icon: any;
  path: string;
  color: string;
  bgColor: string;
};

const Dashboard = () => {
const dashboardCards: DashboardCard[] = [
  // User Management Cards
  {
    id: "total-users",
    title: "Total Users",
    value: 0,
    icon: Users,
    path: "/dashboard/user-management",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  
  // Astrologer Management Cards
  {
    id: "total-astrologers",
    title: "Total Astrologers",
    value: 0,
    icon: Star,
    path: "/dashboard/astrologer-management",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "verified-astrologers",
    title: "Verified Astrologers",
    value: 0,
    icon: BadgeCheck,
    path: "/dashboard/astrologer-management",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "pending-astrologers",
    title: "Pending Astrologers",
    value: 0,
    icon: Clock,
    path: "/dashboard/astrologer-management",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },

  // Transactions & Payments Cards
  {
    id: "total-transactions",
    title: "Total Transactions",
    value: 0,
    icon: CreditCard,
    path: "/dashboard/transactions-payments",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    id: "revenue-today",
    title: "Revenue Today",
    value: 0,
    icon: DollarSign,
    path: "/dashboard/transactions-payments",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "pending-payments",
    title: "Pending Payments",
    value: 0,
    icon: AlertCircle,
    path: "/dashboard/transactions-payments",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },

  // Content Management Cards
  {
    id: "total-content",
    title: "Total Content",
    value: 0,
    icon: FileText,
    path: "/dashboard/content-management",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    id: "published-content",
    title: "Published Content",
    value: 0,
    icon: CheckCircle,
    path: "/dashboard/content-management",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    id: "pending-reviews",
    title: "Pending Reviews",
    value: 0,
    icon: EyeOff,
    path: "/dashboard/content-management",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

  return (
    <div>
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((data) => (
            <OverviewCard key={data.id} data={data} isLoading={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
