// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import Table from "../../components/reusable/Table/Table";
// import { useNavigate } from "react-router-dom";

// const UserManagement = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     page: 1,
//     perPage: 10,
//     nickName: "",
//     email: "",
//     phoneNumber: "",
//     profileType: "",
//     proficiency: "",
//     status: "",
//   });

//   const columns: any = [
//     {
//       key: "nickName",
//       header: "Nickname",
//       render: (item: any) => (
//         <div className="font-medium text-gray-900">{item.nickName || "-"}</div>
//       ),
//     },
//     {
//       key: "firstName",
//       header: "Name",
//       render: (item: any) => (
//         <div>
//           {item.firstName} {item.lastName}
//         </div>
//       ),
//     },
//     {
//       key: "email",
//       header: "Email",
//       render: (item: any) => (
//         <div>{item.email && item.email.length > 0 ? item.email[0] : "-"}</div>
//       ),
//     },
//     {
//       key: "phoneNumber",
//       header: "Phone",
//       render: (item: any) => (
//         <div>
//           {item.phoneNumber &&
//           item.phoneNumber.length > 0 &&
//           item.phoneNumber[0]
//             ? item.phoneNumber[0]
//             : "-"}
//         </div>
//       ),
//     },
//     {
//       key: "city",
//       header: "City",
//     },
//     {
//       key: "country",
//       header: "Country",
//     },
//     {
//       key: "status",
//       header: "Status",
//       render: (item: any) => (
//         <span
//           className={`px-2 py-1 text-xs rounded-full ${
//             item.status === "ACTIVE"
//               ? "bg-green-100 text-green-800"
//               : "bg-yellow-100 text-yellow-800"
//           }`}
//         >
//           {item.status}
//         </span>
//       ),
//     },
//     {
//       key: "actions",
//       header: "Actions",
//       render: (item: any) => (
//         <button
//             onClick={() => navigate(`/dashboard/user/${item.id}`)}
//           className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition cursor-pointer"
//         >
//           View Details
//         </button>
//       ),
//     },
//   ];

//   const handleSearch = (searchTerm: string) => {
//     // Handle search logic
//   };

//   const handleFilterChange = () => {
//     // Handle filter change logic
//   };

//   const handleLimitChange = (limit: number) => {
//     // sdfsdf
//   };

//   const isLoading = false;

//   const data = {
//     data: {
//       total: 5,
//       items: [
//         {
//           id: "1",
//           nickName: "StarSeeker",
//           firstName: "Aarav",
//           lastName: "Sharma",
//           email: ["aarav@example.com"],
//           phoneNumber: ["9876543210"],
//           city: "Mumbai",
//           country: "India",
//           status: "ACTIVE",
//         },
//         {
//           id: "2",
//           nickName: "MoonChild",
//           firstName: "Emily",
//           lastName: "Johnson",
//           email: ["emily.j@example.com"],
//           phoneNumber: ["9123456780"],
//           city: "New York",
//           country: "USA",
//           status: "PENDING",
//         },
//         {
//           id: "3",
//           nickName: "CosmicGuru",
//           firstName: "Ravi",
//           lastName: "Mehta",
//           email: ["ravi.mehta@example.com"],
//           phoneNumber: ["9988776655"],
//           city: "Delhi",
//           country: "India",
//           status: "ACTIVE",
//         },
//         {
//           id: "4",
//           nickName: "ZodiacQueen",
//           firstName: "Sophia",
//           lastName: "Williams",
//           email: ["sophia.w@example.com"],
//           phoneNumber: ["9012345678"],
//           city: "London",
//           country: "UK",
//           status: "BLOCKED",
//         },
//         {
//           id: "5",
//           nickName: "AstroKnight",
//           firstName: "Liam",
//           lastName: "Brown",
//           email: ["liam.brown@example.com"],
//           phoneNumber: ["8899001122"],
//           city: "Sydney",
//           country: "Australia",
//           status: "ACTIVE",
//         },
//       ],
//     },
//   };
//   return (
//     <div>
//       <div className="">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Manage and view all users in the system
//           </p>
//         </div>

//         <Table
//           columns={columns}
//           data={data?.data?.items || []}
//           onSearch={handleSearch}
//           onFilterChange={handleFilterChange}
//           onLimitChange={handleLimitChange}
//           currentLimit={filters.perPage}
//           totalItems={data?.data?.total}
//           isLoading={isLoading}
//           placeholder="Search by name, email, or phone..."
//         />
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

const UserManagement = () => {
  return (
    <div>
      
    </div>
  );
};

export default UserManagement;
