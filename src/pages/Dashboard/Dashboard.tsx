/* eslint-disable @typescript-eslint/no-explicit-any */
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import {
  Users,
  Star,
  Clock,
  Calendar,
  ShoppingBag,
  Sparkles,
  Moon,
} from 'lucide-react';
import { useGetAdminStatsQuery } from "../../redux/Features/Admin/adminApi";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

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
  const { data, isLoading } = useGetAdminStatsQuery({});
  const stats = data?.data?.data || {};
  const overview = stats?.overview || {};
  const pending = stats?.pending || {};
  const charts = stats?.charts || {};

  console.log(stats);

  const dashboardCards: DashboardCard[] = [
    // User Management Cards
    {
      id: "total-users",
      title: "Total Users",
      value: overview?.totalUsers || 0,
      icon: Users,
      path: "/dashboard/user-management",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    
    // Astrologer Management Cards
    {
      id: "total-astrologers",
      title: "Total Astrologers",
      value: overview?.totalAstrologers || 0,
      icon: Star,
      path: "/dashboard/astrologer-management",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "total-consultations",
      title: "Total Consultations",
      value: overview?.totalConsultations || 0,
      icon: Moon,
      path: "/dashboard/consultations",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "total-products",
      title: "Total Products",
      value: overview?.totalProducts || 0,
      icon: ShoppingBag,
      path: "/dashboard/products",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },

    // Pending Items
    {
      id: "pending-orders",
      title: "Pending Orders",
      value: pending?.orders || 0,
      icon: Clock,
      path: "/dashboard/orders",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: "pending-pooja-bookings",
      title: "Pending Pooja Bookings",
      value: pending?.poojaBookings || 0,
      icon: Sparkles,
      path: "/dashboard/puja-bookings",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "pending-kundli",
      title: "Pending Kundli Requests",
      value: pending?.kundliRequests || 0,
      icon: Calendar,
      path: "/dashboard/kundli-requests",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      id: "listed-poojas",
      title: "Listed Poojas",
      value: overview?.listedPoojas || 0,
      icon: Star,
      path: "/dashboard/puja-management",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  // Generate full year data (January to December)
  const generateFullYearData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get data from API
    const apiData = charts?.consultations || [];
    const kundliData = charts?.kundliRequests || [];
    const ordersData = charts?.orders || [];
    
    // Create map for quick lookup
    const consultationMap: { [key: string]: number } = {};
    const kundliMap: { [key: string]: number } = {};
    const ordersMap: { [key: string]: number } = {};
    
    apiData.forEach((item: any) => {
      consultationMap[item.month] = item.count;
    });
    
    kundliData.forEach((item: any) => {
      kundliMap[item.month] = item.count;
    });
    
    ordersData.forEach((item: any) => {
      ordersMap[item.month] = item.count;
    });
    
    // Generate full year data
    return months.map(month => ({
      month,
      consultations: consultationMap[month] || 0,
      kundliRequests: kundliMap[month] || 0,
      orders: ordersMap[month] || 0,
    }));
  };

  const fullYearData = generateFullYearData();

  // Get color based on value for progress bars
  const getColorClass = (value: number) => {
    if (value === 0) return 'bg-gray-200';
    if (value < 3) return 'bg-blue-500';
    if (value < 5) return 'bg-green-500';
    if (value < 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((card) => (
            <OverviewCard key={card.id} data={card} isLoading={isLoading} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Consultations Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Consultations Overview</h3>
              <p className="text-sm text-gray-500">Monthly consultation bookings</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Consultations</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={fullYearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
                formatter={(value: any) => [`${value} consultations`, 'Count']}
              />
              <Area 
                type="monotone" 
                dataKey="consultations" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Progress bars for each month */}
          <div className="mt-4 grid grid-cols-12 gap-1">
            {fullYearData.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getColorClass(item.consultations)}`}
                    style={{ width: `${Math.min((item.consultations / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kundli Requests Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Kundli Requests Overview</h3>
              <p className="text-sm text-gray-500">Monthly kundli requests</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Kundli Requests</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={fullYearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
                formatter={(value: any) => [`${value} requests`, 'Count']}
              />
              <Area 
                type="monotone" 
                dataKey="kundliRequests" 
                stroke="#ec4899" 
                fill="#ec4899" 
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Progress bars for each month */}
          <div className="mt-4 grid grid-cols-12 gap-1">
            {fullYearData.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getColorClass(item.kundliRequests)}`}
                    style={{ width: `${Math.min((item.kundliRequests / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Orders Overview</h3>
              <p className="text-sm text-gray-500">Monthly product orders</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={fullYearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
                formatter={(value: any) => [`${value} orders`, 'Count']}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Progress bars for each month */}
          <div className="mt-4 grid grid-cols-12 gap-1">
            {fullYearData.map((item) => (
              <div key={item.month} className="flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getColorClass(item.orders)}`}
                    style={{ width: `${Math.min((item.orders / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;