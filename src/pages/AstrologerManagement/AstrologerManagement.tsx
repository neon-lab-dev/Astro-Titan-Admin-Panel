/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table from "../../components/reusable/Table/Table";
import { useNavigate } from "react-router-dom";

const AstrologerManagement = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    name: "",
    email: "",
    phoneNumber: "",
    expertise: "",
    experience: "",
    status: "",
  });

  const columns: any = [
    {
      key: "name",
      header: "Name",
      render: (item: any) => (
        <div className="font-medium text-gray-900">
          {item.firstName} {item.lastName}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item: any) => (
        <div>{item.email && item.email.length > 0 ? item.email[0] : "-"}</div>
      ),
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (item: any) => (
        <div>
          {item.phoneNumber &&
          item.phoneNumber.length > 0 &&
          item.phoneNumber[0]
            ? item.phoneNumber[0]
            : "-"}
        </div>
      ),
    },
    {
      key: "expertise",
      header: "Expertise",
    },
    {
      key: "experience",
      header: "Experience",
      render: (item: any) => <div>{item.experience} yrs</div>,
    },
    {
      key: "city",
      header: "City",
    },
    {
      key: "country",
      header: "Country",
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : item.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <button
         onClick={() => navigate(`/dashboard/astrologer/${item.id}`)}
          className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition cursor-pointer"
        >
          View Details
        </button>
      ),
    },
  ];

  const handleSearch = (searchTerm: string) => {
    // Handle search logic
  };

  const handleFilterChange = () => {
    // Handle filter change logic
  };

  const handleLimitChange = (limit: number) => {
    // Handle limit logic
  };

  const isLoading = false;

  const data = {
    data: {
      total: 5,
      items: [
        {
          id: "1",
          firstName: "Rajesh",
          lastName: "Verma",
          email: ["rajesh.astro@example.com"],
          phoneNumber: ["9876501234"],
          expertise: "Vedic Astrology",
          experience: 10,
          city: "Varanasi",
          country: "India",
          status: "ACTIVE",
        },
        {
          id: "2",
          firstName: "Ananya",
          lastName: "Sen",
          email: ["ananya.sen@example.com"],
          phoneNumber: ["9123409876"],
          expertise: "Tarot Reading",
          experience: 6,
          city: "Kolkata",
          country: "India",
          status: "PENDING",
        },
        {
          id: "3",
          firstName: "Michael",
          lastName: "Smith",
          email: ["michael.astro@example.com"],
          phoneNumber: ["9988771122"],
          expertise: "Numerology",
          experience: 8,
          city: "Los Angeles",
          country: "USA",
          status: "ACTIVE",
        },
        {
          id: "4",
          firstName: "Sara",
          lastName: "Williams",
          email: ["sara.w@example.com"],
          phoneNumber: ["9011223344"],
          expertise: "Palmistry",
          experience: 5,
          city: "London",
          country: "UK",
          status: "BLOCKED",
        },
        {
          id: "5",
          firstName: "Arjun",
          lastName: "Kapoor",
          email: ["arjun.k@example.com"],
          phoneNumber: ["8899112233"],
          expertise: "KP Astrology",
          experience: 12,
          city: "Delhi",
          country: "India",
          status: "ACTIVE",
        },
      ],
    },
  };

  return (
    <div>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Astrologers
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view all astrologers in the system
          </p>
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
          placeholder="Search by name, email, or expertise..."
        />
      </div>
    </div>
  );
};

export default AstrologerManagement;