/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import {
  FiEye,
  FiUser,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiPending,
  FiPaperclip,
  FiFile,
} from "react-icons/fi";
import { MdCategory, MdAssignment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllKundliRequestsQuery } from "../../redux/Features/KundliRequests/kundliRequestsApi";
import type { TKundliRequest } from "../../types/kundliRequest.type";
import { formatDate } from "../../utils/formatDate";
import AssignAstrologerModal from "../../components/KundliRequestsPage/AssignAstrologerModal/AssignAstrologerModal";
import toast from "react-hot-toast";

const KundliRequests = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [requestType, setRequestType] = useState<string>("");
  const [isAssignAstrologerModalOpen, setIsAssignAstrologerModalOpen] =
    useState<boolean>(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useGetAllKundliRequestsQuery({
    skip: (page - 1) * limit,
    page,
    limit,
    requestType,
  });

  const kundliTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "requestType", label: "Request Type" },
    { key: "attachments", label: "Attachments" }, // New column for attachments
    { key: "user", label: "User Details" },
    { key: "kundliType", label: "Kundli Type" },
    { key: "birthDetails", label: "Birth Details" },
    { key: "astrologer", label: "Astrologer" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" },
  ];

  const kundlis = data?.data?.data || [];

  // Helper function to format time
  const formatTime = (time: string) => {
    if (!time) return "N/A";
    try {
      // Assuming time is in HH:mm format
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return time;
    }
  };

  // Helper to get status color
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return statusColors[status] || "bg-gray-100 text-gray-700";
  };

  // Helper to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <FiPending className="w-3.5 h-3.5" />;
      case "accepted":
        return <FiCheckCircle className="w-3.5 h-3.5" />;
      case "completed":
        return <FiCheckCircle className="w-3.5 h-3.5" />;
      case "cancelled":
        return <FiXCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  // Helper to open file in new tab
  const openFileInNewTab = (fileUrl: string) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const kundliTableData = kundlis?.map(
    (kundli: TKundliRequest, index: number) => ({
      _id: kundli._id,

      sl: index + 1,

      requestType: (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            kundli.requestType === "generateKundli"
              ? "bg-purple-50 text-purple-700"
              : "bg-indigo-50 text-indigo-700"
          }`}
        >
          <FiFileText className="w-3 h-3" />
          {kundli.requestType === "generateKundli" ? "Generate" : "Analyze"}
        </span>
      ),

      attachments: (
        <div className="flex flex-col gap-1">
          {/* Show attachment button only for analyzeKundli */}
          {kundli.requestType === "analyzeKundli" && (
            <button
              onClick={() => {
                if (kundli?.existingKundliFiles?.length > 0) {
                  // Open the first attachment or show all
                  openFileInNewTab(kundli?.existingKundliFiles[0]);
                } else {
                  toast.error("No attachment available");
                }
              }}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors w-fit"
              title="View attachment"
            >
              <FiPaperclip className="w-3 h-3" />
              {kundli.existingKundliFiles?.length > 0
                ? `Attachment (${kundli.existingKundliFiles.length})`
                : "No Attachment"}
            </button>
          )}

          {/* Show report button if reportUrl exists */}
          {kundli.reportUrl && (
            <button
              onClick={() => openFileInNewTab(kundli?.reportUrl)}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-md text-xs font-medium transition-colors w-fit"
              title="View report"
            >
              <FiFile className="w-3 h-3" />
              View Report
            </button>
          )}

          {/* Show multiple attachments if there are more than one */}
          {kundli.requestType === "analyzeKundli" &&
            kundli.existingKundliFiles?.length > 1 && (
              <button
                onClick={() => {
                  // Open all attachments or show a dropdown
                  const files = kundli.existingKundliFiles || [];
                  if (files.length > 0) {
                    // Open first file in new tab
                    openFileInNewTab(files[0]);
                  }
                }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md text-xs font-medium transition-colors"
              >
                <FiPaperclip className="w-3 h-3" />
                View All ({kundli.existingKundliFiles.length})
              </button>
            )}
        </div>
      ),

      user: (
        <div>
          <div className="font-medium text-sm">
            <Link
              to={`/dashboard/user/${kundli.userId?._id}`}
              className="hover:text-yellow-600 hover:underline transition-colors capitalize"
            >
              {kundli.userName}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{kundli.userPhoneNumber}</p>
          <p className="text-xs text-gray-400">
            Gender:{" "}
            {kundli.userGender?.charAt(0).toUpperCase() +
              kundli.userGender?.slice(1) || "N/A"}
          </p>
          {kundli.userNotes && (
            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              Notes: {kundli.userNotes}
            </p>
          )}
        </div>
      ),

      kundliType: (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-medium capitalize">
          <MdCategory className="w-3 h-3" />
          {kundli.kundliType?.replace(/([A-Z])/g, " $1").trim() || "N/A"}
        </span>
      ),

      birthDetails: (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-xs">
            <FiCalendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-700">
              {formatDate(kundli.dateOfBirth) || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <FiClock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-700">
              {formatTime(kundli.timeOfBirth)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <FiMapPin className="w-3 h-3 text-gray-400" />
            <span
              className="text-gray-700 truncate max-w-30"
              title={kundli.placeOfBirth}
            >
              {kundli.placeOfBirth || "N/A"}
            </span>
          </div>
        </div>
      ),

      astrologer: (
        <div>
          {kundli.astrologerId ? (
            <div className="flex items-center gap-2">
              {kundli.astrologerId?.profilePicture ? (
                <img
                  src={kundli.astrologerId.profilePicture}
                  alt={kundli.astrologerId.displayName || "Astrologer"}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <FiUser className="w-4 h-4 text-gray-400" />
                </div>
              )}
              <div>
                <Link
                  to={`/dashboard/astrologer/${kundli.astrologerId._id}`}
                  className="text-sm font-medium hover:underline block"
                >
                  {kundli.astrologerId?.displayName ||
                    `${kundli.astrologerId?.firstName || ""} ${kundli.astrologerId?.lastName || ""}`.trim() ||
                    "Not Assigned"}
                </Link>
                {kundli.isAssigned && (
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-medium">
                    Assigned
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Not Assigned</span>
          )}
        </div>
      ),

      status: (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(kundli.status)}`}
        >
          {getStatusIcon(kundli.status)}
          {kundli.status?.charAt(0).toUpperCase() + kundli.status?.slice(1) ||
            "N/A"}
        </span>
      ),

      createdAt: (
        <div className="text-sm text-gray-600">
          {formatDate(kundli.createdAt)}
          {kundli.completedAt && (
            <p className="text-xs text-green-600 mt-0.5">
              Completed: {formatDate(kundli.completedAt)}
            </p>
          )}
          {kundli.cancelledAt && (
            <p className="text-xs text-red-600 mt-0.5">
              Cancelled: {formatDate(kundli.cancelledAt)}
            </p>
          )}
        </div>
      ),
    }),
  );

  // Action Menu
  const actions: TableAction<TKundliRequest>[] = [
    {
      label: "View Details",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => {
        navigate(`/dashboard/kundli/${row._id}`);
      },
    },
    {
      label: "Assign Astrologer",
      icon: <MdAssignment className="inline mr-2" />,
      onClick: (row) => {
        setRequestId(row._id);
        setIsAssignAstrologerModalOpen(true);
      },
    },
  ];

  const children = (
    <div className="flex items-center gap-3">
      <select
        value={requestType}
        onChange={(e) => setRequestType(e.target.value)}
        className="input input-sm px-3 py-2 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
      >
        <option value="">All Request Types</option>
        <option value="generateKundli">Generate Kundli</option>
        <option value="analyzeKundli">Analyze Kundli</option>
      </select>
    </div>
  );

  return (
    <div>
      <Table<TKundliRequest>
        title={`Kundli Requests (${kundliTableData?.length || 0})`}
        description="Manage all Kundli requests in the system"
        theads={kundliTheads}
        data={kundliTableData || []}
        actions={actions}
        children={children}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        limit={limit}
        setLimit={setLimit}
      />

      {isAssignAstrologerModalOpen && (
        <AssignAstrologerModal
          isModalOpen={isAssignAstrologerModalOpen}
          setIsModalOpen={setIsAssignAstrologerModalOpen}
          requestId={requestId as string}
        />
      )}
    </div>
  );
};

export default KundliRequests;
