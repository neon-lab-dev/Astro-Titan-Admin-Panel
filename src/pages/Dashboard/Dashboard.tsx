/* eslint-disable @typescript-eslint/no-explicit-any */
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import {
  Users,
  FileText,
  User,
  Briefcase,
  UserCheck,
  Users as GroupsIcon,
  Clock,
  CreditCard,
} from "lucide-react";


export interface DashboardCard {
  id: string;
  title: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
  endpoint: string;
  trend?: number;
  trendLabel?: string;
}

const Dashboard = () => {
  const dashboardCards: DashboardCard[] = [
    {
      id: "total-users",
      title: "Total Users",
      value: 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "total-posts",
      title: "Total Posts",
      value: 0,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      endpoint: "/api/admin/dashboard/posts",
    },
    {
      id: "individuals",
      title: "Individuals",
      value: 0,
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "professionals",
      title: "Professionals",
      value: 0,
      icon: Briefcase,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      trend: 12,
      trendLabel: "Pending requests",
      endpoint: "/api/admin/professional-requests",
    },
    {
      id: "skilled-users",
      title: "Skilled Users",
      value: 0,
      icon: UserCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      endpoint: "/api/admin/users/statistics",
    },
    {
      id: "groups",
      title: "Groups",
      value: 0,
      icon: GroupsIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      endpoint: "/api/admin/groups",
    },
    {
      id: "pending-verifications",
      title: "Pending Verifications",
      value: 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      endpoint: "/api/admin/professional-requests/pending",
    },
    {
      id: "active-subscriptions",
      title: "Active Subscriptions",
      value: 0,
      icon: CreditCard,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      endpoint: "/api/admin/subscriptions/statistics",
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
