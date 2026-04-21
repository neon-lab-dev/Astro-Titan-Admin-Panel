/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import { useGetAllUsersQuery } from "../../redux/Features/User/userApi";
import { FiEye, FiSlash } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import SuspendUserModal from "../../components/SuspendUserModal/SuspendUserModal";
import { useActiveAccountMutation } from "../../redux/Features/Account/accountApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserManagement = () => {
  const navigate = useNavigate();
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
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    skip,
    page,
    limit,
    keyword,
  });

  const userTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "profilePicture", label: "Profile" },
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "gender", label: "Gender" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "placeOfBirth", label: "Place of Birth" },
    { key: "intents", label: "Intents" },
    { key: "country", label: "Country" },
    { key: "profileStatus", label: "Profile Status" },
    { key: "accountStatus", label: "Account Status" },
  ];

  console.log(data);

  const users = data?.data?.users || [];

  const userTableData = users?.map((user: any, index: number) => ({
    _id: user._id,
    userId: user.accountDetails?._id || user._id,

    sl: index + 1,

    profilePicture: user?.profilePicture ? (
      <img
        src={user?.profilePicture || "/default-avatar.png"}
        alt={`${user?.firstName} ${user?.lastName}`}
        className="w-12 h-12 rounded-full object-cover"
      />
    ) : (
      <FaUserCircle className="w-12 h-12 text-gray-400" />
    ),

    fullName: (
      <div className="font-medium">
        <Link to={`/dashboard/user/${user?._id}`} className="hover:underline">
          {user?.firstName} {user?.lastName}
        </Link>
        <p className="text-xs text-gray-500">
          {user?.gender === "male" ? "Male" : "Female"}
        </p>
      </div>
    ),

    email: (
      <p className="text-sm text-gray-700">
        {user?.accountDetails?.email || user?.email || "N/A"}
      </p>
    ),

    phoneNumber: (
      <p className="text-sm text-gray-700">
        {user?.phoneNumber || user?.accountDetails?.phoneNumber || "N/A"}
      </p>
    ),

    gender: (
      <span className="text-sm text-gray-700 capitalize">
        {user?.gender || "N/A"}
      </span>
    ),

    dateOfBirth: (
      <p className="text-sm text-gray-700">
        {user?.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString()
          : "N/A"}
      </p>
    ),

    timeOfBirth: (
      <p className="text-sm text-gray-700">{user?.timeOfBirth || "N/A"}</p>
    ),

    placeOfBirth: (
      <p className="text-sm text-gray-700">{user?.placeOfBirth || "N/A"}</p>
    ),

    intents: (
      <div className="flex flex-wrap gap-1">
        {user?.intents?.slice(0, 2)?.map((intent: string, idx: number) => (
          <span
            key={idx}
            className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
          >
            {intent}
          </span>
        ))}
        {user?.intents?.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            +{user.intents.length - 2}
          </span>
        )}
      </div>
    ),

    country: <p className="text-sm text-gray-700">{user?.country || "N/A"}</p>,

    profileStatus: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          user?.isProfileCompleted
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {user?.isProfileCompleted ? "Completed" : "Incomplete"}
      </span>
    ),

    accountStatus: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          user?.accountDetails?.isSuspended
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {user?.accountDetails?.isSuspended ? "Suspended" : "Active"}
      </span>
    ),
  }));

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => {
        navigate(`/dashboard/user/${row?._id}`);
      },
    },
    {
      label: "Suspend Account",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        setSelectedAccountId(row?.userId);
        setIsSuspendAccountModalOpen(true);
      },
    },
    {
      label: "Activate Account",
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
        success: "Account activated successfully!",
        error: "Failed to activate. Please try again.",
      });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to activate. Please try again.",
      );
    }
  };

  return (
    <div>
      <Table<any>
        title={`Users (${userTableData?.length || 0})`}
        description="Manage all users in the system"
        theads={userTheads}
        data={userTableData || []}
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

export default UserManagement;
