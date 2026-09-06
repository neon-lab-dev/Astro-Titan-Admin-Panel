/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import { useGetAllPujaBookingsQuery } from "../../redux/Features/PujaBooking/pujaBookingApi";
import { FiEye } from "react-icons/fi";
import Modal from "../../components/reusable/Modal/Modal";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const PujaBookings = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching } = useGetAllPujaBookingsQuery({
    skip,
    limit,
    keyword,
    status,
  });

  const bookings = data?.data?.data || [];

  const bookingTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "user", label: "User" },
    { key: "pujaName", label: "Pooja Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "preferredDate", label: "Preferred Date" },
    { key: "status", label: "Status" },
  ];

  const bookingTableData = bookings?.map((booking: any, index: number) => ({
    _id: booking._id,
    sl: index + 1,

    user: (
      <Link
        to={`/dashboard/user/${booking?.userId?._id}`}
        className="font-medium text-sm underline"
      >
        {booking?.userId?.firstName || "N/A"} {booking?.userId?.lastName || ""}
      </Link>
    ),

    pujaName: (
      <Link
        to={`/dashboard/puja/${booking?.pujaId?._id}`}
        className="underline text-sm text-blue-600"
      >
        {booking?.pujaId?.name || "N/A"}
      </Link>
    ),

    phoneNumber: (
      <p className="text-sm text-gray-700">{booking?.phoneNumber || "N/A"}</p>
    ),

    preferredDate: (
      <p className="text-sm text-gray-700">
        {booking?.preferredDate ? formatDate(booking.preferredDate) : "N/A"}
      </p>
    ),

    status: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          booking?.status === "completed" || booking?.status === "ended"
            ? "bg-green-100 text-green-700"
            : booking?.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : booking?.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : booking?.status === "ongoing"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
        }`}
      >
        {booking?.status || "N/A"}
      </span>
    ),
  }));

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  const handleViewDetails = (booking: any) => {
    const fullData = bookings.find((b: any) => b._id === booking._id);
    setSelectedBooking(fullData);
    setIsDetailModalOpen(true);
  };

  // Actions
  const actions: TableAction<any>[] = [
    {
      label: "View Details",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => {
        handleViewDetails(row);
      },
    },
  ];

  // Filters
  const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Ended", value: "ended" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const children = (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input input-sm px-3 py-2 border border-gray-300 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
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
    <div>
      <Table<any>
        title={`Pooja Bookings (${bookingTableData?.length || 0})`}
        description="Manage all pooja bookings in the system"
        theads={bookingTheads}
        data={bookingTableData || []}
        actions={actions}
        children={children}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />

      {/* Detail Modal */}
      <Modal
        isModalOpen={isDetailModalOpen}
        setIsModalOpen={setIsDetailModalOpen}
        heading="Puja Booking Details"
      >
        {selectedBooking && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Preferred Date</p>
                <p className="font-medium">
                  {selectedBooking?.preferredDate
                    ? formatDate(selectedBooking.preferredDate)
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booked At</p>
                <p className="font-medium">
                  {selectedBooking?.createdAt
                    ? formatDate(selectedBooking.createdAt)
                    : "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Purpose of Puja</p>
                <p className="font-medium p-3 bg-gray-50 rounded-md">
                  {selectedBooking?.purposeOfPuja || "No purpose specified"}
                </p>
              </div>
              {selectedBooking?.intent && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Intent</p>
                  <p className="font-medium capitalize">
                    {selectedBooking?.intent}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PujaBookings;
