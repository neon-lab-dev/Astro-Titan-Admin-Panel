/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "../../components/reusable/Table/Table";

const SubscriptionPlan = () => {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    name: "",
    status: "",
  });

  const columns: any = [
    {
      key: "name",
      header: "Plan Name",
      render: (item: any) => (
        <div className="font-medium text-gray-900">{item.name}</div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: any) => (
        <div className="font-medium">₹ {item.price}</div>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      render: (item: any) => <div>{item.duration} Days</div>,
    },
    {
      key: "features",
      header: "Features",
      render: (item: any) => (
        <ul className="text-sm text-gray-600 list-disc ml-4">
          {item.features.map((f: string, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const handleSearch = (searchTerm: string) => {
    // handle search
  };

  const handleFilterChange = () => {
    // handle filter
  };

  const handleLimitChange = (limit: number) => {
    // handle limit
  };

  const isLoading = false;

  const data = {
    data: {
      total: 3,
      items: [
        {
          id: "1",
          name: "Basic Plan",
          price: 199,
          duration: 30,
          features: ["5 Consultations", "Basic Horoscope", "Email Support"],
          status: "ACTIVE",
        },
        {
          id: "2",
          name: "Standard Plan",
          price: 499,
          duration: 90,
          features: [
            "15 Consultations",
            "Detailed Horoscope",
            "Priority Support",
          ],
          status: "ACTIVE",
        },
        {
          id: "3",
          name: "Premium Plan",
          price: 999,
          duration: 180,
          features: [
            "Unlimited Consultations",
            "Personal Astrologer",
            "24/7 Support",
          ],
          status: "INACTIVE",
        },
      ],
    },
  };

  return (
    <div>
      <div className="">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Subscription Plans
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all subscription plans
            </p>
          </div>

          <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition">
            + Add New Plan
          </button>
        </div>

        <Table
          columns={columns}
          data={data?.data?.items || []}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onLimitChange={handleLimitChange}
          currentLimit={filters.perPage}
          totalItems={data?.data?.total}
          isLoading={isLoading}
          placeholder="Search by plan name..."
        />
      </div>
    </div>
  );
};

export default SubscriptionPlan;