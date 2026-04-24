/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import {
  useGetAllProductOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/Features/ProductOrders/productOrdersApi";
import { FiTruck, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { MdOutlinePending, MdCancel, MdDeliveryDining } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";

const ProductOrders = () => {
  //   const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [keyword, setKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useGetAllProductOrdersQuery({
    page,
    limit,
    skip,
    keyword,
    status: statusFilter,
  });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders = data?.data?.productOrders || [];
  const meta = data?.data?.meta || {};

  // Calculate KPI metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order: any) => order.status === "pending",
  ).length;
  const shippedOrders = orders.filter(
    (order: any) => order.status === "shipped",
  ).length;
  const cancelledOrders = orders.filter(
    (order: any) => order.status === "cancelled",
  ).length;

  const orderTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "customer", label: "Customer" },
    { key: "items", label: "Items" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "orderDate", label: "Order Date" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle className="w-3 h-3" />;
      case "shipped":
        return <FiTruck className="w-3 h-3" />;
      case "pending":
        return <MdOutlinePending className="w-3 h-3" />;
      case "cancelled":
        return <MdCancel className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const orderTableData = orders?.map((order: any, index: number) => ({
    _id: order._id,
    sl: index + 1,
    customer: (
      <div>
        <p className="text-sm font-medium text-gray-900">
          {order.userId?.firstName} {order.userId?.lastName}
        </p>
        <p className="text-xs text-gray-500">{order.userId?.email}</p>
        <p className="text-xs text-gray-500">{order.userId?.phoneNumber}</p>
      </div>
    ),
    items: (
      <div>
        <p className="text-sm text-gray-700">
          {order.orderedItems?.length || 0} items
        </p>
        <p className="text-xs text-gray-500">
          {order.orderedItems
            ?.map((item: any) => `${item.name} (x${item.quantity})`)
            .join(", ")}
        </p>
      </div>
    ),
    totalAmount: (
      <div className="flex items-center gap-1">
        <HiOutlineCurrencyRupee className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold text-gray-900">
          {order.totalAmount?.toLocaleString()}
        </span>
      </div>
    ),
    status: (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
          order.status,
        )}`}
      >
        {getStatusIcon(order.status)}
        {order.status}
      </span>
    ),
    orderDate: (
      <p className="text-sm text-gray-700">{formatDate(order.createdAt)}</p>
    ),
  }));

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const payload = {
      status,
    };
    try {
      await toast.promise(
        updateOrderStatus({ id: orderId, data: payload }).unwrap(),
        {
          loading: `Updating order status...`,
          success: `Order ${status} successfully!`,
          error: "Failed to update order status.",
        },
      );
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order status.");
    }
  };

  // Action Menu
  const actions: TableAction<any>[] = [
    // {
    //   label: "View Details",
    //   icon: <FiEye className="inline mr-2" />,
    //   onClick: (row) => {
    //     navigate(`/dashboard/product-orders/${row?._id}`);
    //   },
    // },
    {
      label: "Mark as Shipped",
      icon: <FiTruck className="inline mr-2" />,
      onClick: (row) => {
        handleUpdateStatus(row?._id, "shipped");
      },
    },
    {
      label: "Cancel Order",
      icon: <FiXCircle className="inline mr-2" />,
      onClick: (row) => {
        handleUpdateStatus(row?._id, "cancelled");
      },
    },
  ];

  // Status filter options
  const statusOptions = [
    { label: "All Orders", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const children = (
    <div className="flex items-center gap-3">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2 border border-gray-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalOrders}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MdDeliveryDining className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {pendingOrders}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <MdOutlinePending className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Shipped Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Shipped</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {shippedOrders}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiTruck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {cancelledOrders}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <MdCancel className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <Table<any>
        title={`Orders (${totalOrders})`}
        description="Manage all product orders in the system"
        theads={orderTheads}
        data={orderTableData || []}
        actions={actions}
        children={children}
        totalPages={meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default ProductOrders;
