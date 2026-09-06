/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import { useGetAllConsultationsQuery } from "../../redux/Features/Consultation/consultationApi";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import { MdPhoneInTalk, MdVideoCall } from "react-icons/md";
import Modal from "../../components/reusable/Modal/Modal";
import { formatDate } from "../../utils/formatDate";

const Consultations = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [status, setStatus] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching } = useGetAllConsultationsQuery({
    skip,
    limit,
    status,
    method,
  });

  const consultations = data?.data?.data || [];

  const consultationTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "user", label: "User" },
    { key: "astrologer", label: "Astrologer" },
    { key: "method", label: "Method" },
    { key: "consultationFor", label: "Consultation For" },
    { key: "status", label: "Status" },
    { key: "bookedAt", label: "Booked At" },
    { key: "slotDate", label: "Slot Date" },
  ];

  const consultationTableData = consultations?.map(
    (consultation: any, index: number) => ({
      _id: consultation._id,
      sl: index + 1,

      user: (
        <div className="flex items-center gap-2">
          <img
            src={consultation?.user?.profilePicture}
            alt={consultation?.user?.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-sm">
            {consultation?.user?.fullName || "N/A"}
          </span>
        </div>
      ),

      astrologer: (
        <div className="flex items-center gap-2">
          <img
            src={consultation?.astrologer?.profilePicture}
            alt={consultation?.astrologer?.displayName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm">
              {consultation?.astrologer?.displayName || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {consultation?.astrologer?.firstName}{" "}
              {consultation?.astrologer?.lastName}
            </p>
          </div>
        </div>
      ),

      method: (
        <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#a37d00] rounded-full text-xs font-medium capitalize">
          {consultation?.method === "call" ? (
            <MdPhoneInTalk className="text-sm" />
          ) : consultation?.method === "video" ? (
            <MdVideoCall className="text-sm" />
          ) : (
            <FiMessageSquare className="text-sm" />
          )}
          {consultation?.method || "N/A"}
        </span>
      ),

      consultationFor: (
        <span className="text-sm text-gray-700">
          {consultation?.consultationFor || "N/A"}
        </span>
      ),

      status: (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            consultation?.status === "completed" ||
            consultation?.status === "ended"
              ? "bg-green-100 text-green-700"
              : consultation?.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : consultation?.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : consultation?.status === "ongoing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
          }`}
        >
          {consultation?.status || "N/A"}
        </span>
      ),

      bookedAt: (
        <p className="text-sm text-gray-700">
          {consultation?.createdAt ? formatDate(consultation.createdAt) : "N/A"}
        </p>
      ),

      slotDate: (
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">
            {consultation?.slotId?.date
              ? formatDate(consultation.slotId.date)
              : "N/A"}
          </p>
          {consultation?.bookedSlot && (
            <p className="text-xs text-gray-500">
              {consultation.bookedSlot.startTime} -{" "}
              {consultation.bookedSlot.endTime}
            </p>
          )}
        </div>
      ),
    }),
  );

  const handleViewDetails = (consultation: any) => {
    const fullData = consultations.find((c: any) => c._id === consultation._id);
    setSelectedConsultation(fullData);
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
    { label: "Status-All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Completed", value: "ended" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const methodOptions = [
    { label: "Method-All", value: "" },
    { label: "Call", value: "call" },
    { label: "Chat", value: "chat" },
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

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="input input-sm px-3 py-2 border border-gray-300 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
      >
        {methodOptions.map((option) => (
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
        title={`Consultations (${consultationTableData?.length || 0})`}
        description="Manage all consultations in the system"
        theads={consultationTheads}
        data={consultationTableData || []}
        actions={actions}
        children={children}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        limit={limit}
        setLimit={setLimit}
      />

      {/* Detail Modal */}
      <Modal
        isModalOpen={isDetailModalOpen}
        setIsModalOpen={setIsDetailModalOpen}
        heading="Consultation Details"
        width="w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%]"
      >
        {selectedConsultation && (
          <div className="flex flex-col gap-6 font-Nunito mt-5">
            {/* User Section */}
            <div className="border-b border-neutral-300 pb-4">
              <h3 className="font-semibold text-lg mb-3">User Information</h3>
              <div className="flex items-center gap-3">
                <img
                  src={selectedConsultation?.user?.profilePicture}
                  alt={selectedConsultation?.user?.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {selectedConsultation?.user?.fullName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Account ID: {selectedConsultation?.user?.accountId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Astrologer Section */}
            <div className="border-b border-neutral-300 pb-4">
              <h3 className="font-semibold text-lg mb-3">
                Astrologer Information
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={selectedConsultation?.astrologer?.profilePicture}
                  alt={selectedConsultation?.astrologer?.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {selectedConsultation?.astrologer?.displayName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedConsultation?.astrologer?.firstName}{" "}
                    {selectedConsultation?.astrologer?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Account ID:{" "}
                    {selectedConsultation?.astrologer?.accountId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div className="border-b border-neutral-300 pb-4">
              <h3 className="font-semibold text-lg mb-3">
                Consultation Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Method</p>
                  <p className="font-medium capitalize">
                    {selectedConsultation?.method || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize inline-block ${
                      selectedConsultation?.status === "completed" ||
                      selectedConsultation?.status === "ended"
                        ? "bg-green-100 text-green-700"
                        : selectedConsultation?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedConsultation?.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : selectedConsultation?.status === "ongoing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {selectedConsultation?.status || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Consultation For</p>
                  <p className="font-medium">
                    {selectedConsultation?.consultationFor || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked At</p>
                  <p className="font-medium">
                    {selectedConsultation?.createdAt
                      ? formatDate(selectedConsultation.createdAt)
                      : "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Slot Date & Time</p>
                  <p className="font-medium">
                    {selectedConsultation?.slotId?.date
                      ? formatDate(selectedConsultation.slotId.date)
                      : "N/A"}
                    {selectedConsultation?.bookedSlot &&
                      ` , ${selectedConsultation.bookedSlot.startTime} - ${selectedConsultation.bookedSlot.endTime}`}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Request Message</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-md">
                    {selectedConsultation?.requestMessage || "No message"}
                  </p>
                </div>
              </div>
            </div>

            {/* Call Session */}
            {selectedConsultation?.callSession && (
              <div className="border-b border-neutral-300 pb-4">
                <h3 className="font-semibold text-lg mb-3">
                  Call Session Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Session Name</p>
                    <p className="font-medium">
                      {selectedConsultation?.callSession?.sessionName || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {selectedConsultation?.recommendations && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
                <div
                  className="p-4 bg-blue-50 rounded-md prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: selectedConsultation.recommendations,
                  }}
                />
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Consultations;
