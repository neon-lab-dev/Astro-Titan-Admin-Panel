// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import Table from "../../components/reusable/Table/Table";

// const TransactionsAndPayments = () => {
//   const [filters, setFilters] = useState({
//     page: 1,
//     perPage: 10,
//     userName: "",
//     email: "",
//     transactionId: "",
//   });

//   const columns: any = [
//     {
//       key: "transactionId",
//       header: "Transaction ID",
//       render: (item: any) => (
//         <div className="font-medium text-gray-900">
//           {item.transactionId}
//         </div>
//       ),
//     },
//     {
//       key: "userName",
//       header: "User Name",
//     },
//     {
//       key: "email",
//       header: "Email",
//       render: (item: any) => (
//         <div>{item.email && item.email.length > 0 ? item.email[0] : "-"}</div>
//       ),
//     },
//     {
//       key: "amount",
//       header: "Amount",
//       render: (item: any) => (
//         <div className="font-medium">₹ {item.amount}</div>
//       ),
//     },
//     {
//       key: "date",
//       header: "Date",
//     },
//     {
//       key: "status",
//       header: "Status",
//       render: () => (
//         <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//           PAID
//         </span>
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
//     // Handle limit logic
//   };

//   const isLoading = false;

//   const data = {
//     data: {
//       total: 5,
//       items: [
//         {
//           id: "1",
//           transactionId: "TXN123456",
//           userName: "Aarav Sharma",
//           email: ["aarav@example.com"],
//           amount: 499,
//           date: "2026-03-15",
//         },
//         {
//           id: "2",
//           transactionId: "TXN123457",
//           userName: "Emily Johnson",
//           email: ["emily.j@example.com"],
//           amount: 299,
//           date: "2026-03-14",
//         },
//         {
//           id: "3",
//           transactionId: "TXN123458",
//           userName: "Ravi Mehta",
//           email: ["ravi.mehta@example.com"],
//           amount: 999,
//           date: "2026-03-13",
//         },
//         {
//           id: "4",
//           transactionId: "TXN123459",
//           userName: "Sophia Williams",
//           email: ["sophia.w@example.com"],
//           amount: 199,
//           date: "2026-03-12",
//         },
//         {
//           id: "5",
//           transactionId: "TXN123460",
//           userName: "Liam Brown",
//           email: ["liam.brown@example.com"],
//           amount: 699,
//           date: "2026-03-11",
//         },
//       ],
//     },
//   };

//   return (
//     <div>
//       <div className="">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Transactions & Payments
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             View all transactions and payment records
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
//           placeholder="Search by transaction ID, user, or email..."
//         />
//       </div>
//     </div>
//   );
// };

// export default TransactionsAndPayments;

const TransactionsAndPayments = () => {
  return (
    <div>
      
    </div>
  );
};

export default TransactionsAndPayments;