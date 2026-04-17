/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import { useGetAllAstrologersQuery } from "../../redux/Features/Astrologer/astrologerApi";
import { FiEye, FiSlash } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import SuspendUserModal from "../../components/SuspendUserModal/SuspendUserModal";
import { useActiveAccountMutation } from "../../redux/Features/Account/accountApi";
import toast from "react-hot-toast";

const AstrologerManagement = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [keyword, setKeyword] = useState<string>("");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [isSuspendAccountModalOpen, setIsSuspendAccountModalOpen] =
    useState<boolean>(false);

  const [activeAccount] = useActiveAccountMutation();
  const { data, isLoading, isFetching } = useGetAllAstrologersQuery({
    skip,
    page,
    limit,
    keyword,
  });

  const astrologerTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "profilePicture", label: "Profile" },
    { key: "displayName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "experience", label: "Experience" },
    { key: "areaOfPractice", label: "Area of Practice" },
    { key: "consultLanguages", label: "Languages" },
    { key: "identityStatus", label: "Identity Status" },
    { key: "accountStatus", label: "Account Status" },
  ];

  const astrologers = data?.data?.astrologers || [];

  const astrologerTableData = astrologers?.map(
    (astrologer: any, index: number) => ({
      _id: astrologer._id,
      userId: astrologer.accountDetails._id,

      sl: index + 1,

      profilePicture: (
        <img
          src={astrologer?.profilePicture}
          alt={astrologer?.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
      ),

      displayName: (
        <div className="font-medium">
          <p>{astrologer?.displayName}</p>
          <p className="text-xs text-gray-500">
            {astrologer?.firstName} {astrologer?.lastName}
          </p>
        </div>
      ),

      email: (
        <p className="text-sm text-gray-700">
          {astrologer?.accountDetails?.email || astrologer?.email || "N/A"}
        </p>
      ),

      phoneNumber: (
        <p className="text-sm text-gray-700">
          {astrologer?.phoneNumber ||
            astrologer?.accountDetails?.phoneNumber ||
            "N/A"}
        </p>
      ),

      experience: (
        <p className="text-sm text-gray-700">
          {astrologer?.experience || "N/A"}
        </p>
      ),

      areaOfPractice: (
        <div className="flex flex-wrap gap-1">
          {astrologer?.areaOfPractice
            ?.slice(0, 2)
            ?.map((area: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {area}
              </span>
            ))}
          {astrologer?.areaOfPractice?.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{astrologer.areaOfPractice.length - 2}
            </span>
          )}
        </div>
      ),

      consultLanguages: (
        <div className="flex flex-wrap gap-1">
          {astrologer?.consultLanguages?.map((lang: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
      ),

      identityStatus: (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            astrologer?.identity?.status === "approved"
              ? "bg-green-100 text-green-700"
              : astrologer?.identity?.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {astrologer?.identity?.status || "N/A"}
        </span>
      ),

      accountStatus: (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            astrologer?.accountDetails?.isSuspended
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {astrologer?.accountDetails?.isSuspended ? "Suspended" : "Active"}
        </span>
      ),
    }),
  );

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => {
        const url = `/dashboard/astrologer/${row?.userId}`;
        window.open(url, "_blank");
      },
    },
    {
      label: "Suspend Account",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        console.log(row);
        setSelectedAccountId(row?.userId);
        setIsSuspendAccountModalOpen(true);
      },
    },
    {
      label: "Active Account",
      icon: <HiOutlineUserCircle className="inline mr-2" />,
      onClick: (row) => {
        handleActiveAccount(row?.userId);
      },
    },
  ];

  const handleActiveAccount = async (id: string) => {
    try {
      await toast.promise(activeAccount(id).unwrap(), {
        loading: "Loading...",
        success: "Account re-activated successfully!",
        error: "Failed to reactivate. Please try again.",
      });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to reactivate. Please try again.",
      );
    }
  };

  return (
    <div>
      <Table<any>
        title={`Astrologers (${astrologerTableData?.length || 0})`}
        description="Manage all astrologers in the system"
        theads={astrologerTheads}
        data={astrologerTableData || []}
        actions={actions}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />

      <SuspendUserModal
        selectedAccountId={selectedAccountId}
        isSuspendAccountModalOpen={isSuspendAccountModalOpen}
        setIsSuspendAccountModalOpen={setIsSuspendAccountModalOpen}
      />
    </div>
  );
};

export default AstrologerManagement;
