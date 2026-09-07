/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import {
  useGetAllSubscriptionPlansQuery,
  useToggleChangeStatusMutation,
} from "../../redux/Features/SubscriptionPlan/subscriptionPlanApi";
import { FiEdit, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import AddOrEditSubscriptionPlan from "../../components/SubscriptionPlanPage/AddOrEditSubscriptionPlan/AddOrEditSubscriptionPlan";
import Button from "../../components/reusable/Button/Button";

const SubscriptionPlan = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [keyword, setKeyword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading, isFetching } = useGetAllSubscriptionPlansQuery({
    skip,
    limit,
    keyword,
  });

  const [toggleChangeStatus, { isLoading: isToggling }] =
    useToggleChangeStatusMutation();

  const subscriptionPlans = data?.data?.data || [];

  const subscriptionPlanTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "name", label: "Plan Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "duration", label: "Duration" },
    { key: "consultations", label: "Consultations/month" },
    { key: "features", label: "Features" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" },
  ];

  const subscriptionPlanTableData = subscriptionPlans?.map(
    (plan: any, index: number) => ({
      _id: plan._id,
      sl: index + 1,

      name: (
        <p className="font-medium text-sm text-gray-800">
          {plan?.name || "N/A"}
        </p>
      ),

      description: (
        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
          {plan?.description || "N/A"}
        </p>
      ),

      price: (
        <p className="text-sm font-semibold text-gray-800">
          ₹{plan?.price || 0}
        </p>
      ),

      duration: (
        <p className="text-sm text-gray-700">{plan?.duration || 0} days</p>
      ),

      consultations: (
        <p className="text-sm text-gray-700">
          {plan?.numberOfConsultations || "N/A"}
        </p>
      ),

      features: (
        <div className="flex flex-col gap-2">
          {plan?.features?.map((feature: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full text-xs w-fit"
            >
              {feature}
            </span>
          ))}
        </div>
      ),

      status: (
        <button
          onClick={() => handleToggleStatus(plan)}
          disabled={isToggling}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            plan?.isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          } ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {plan?.isActive ? (
            <FiToggleRight className="w-4 h-4" />
          ) : (
            <FiToggleLeft className="w-4 h-4" />
          )}
          {plan?.isActive ? "Active" : "Inactive"}
        </button>
      ),

      createdAt: (
        <p className="text-sm text-gray-500">
          {plan?.createdAt ? formatDate(plan.createdAt) : "N/A"}
        </p>
      ),
    }),
  );

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  const handleToggleStatus = async (plan: any) => {
    try {
      await toggleChangeStatus(plan._id).unwrap();
      toast.success(
        `Plan ${plan?.isActive ? "deactivated" : "activated"} successfully!`,
      );
    } catch (error: any) {
      console.error("Error toggling status:", error);
      toast.error(error?.data?.message || "Failed to toggle status");
    }
  };

  const handleAddNew = () => {
    setModalType("add");
    setSelectedPlanId(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: any) => {
    setModalType("edit");
    setSelectedPlanId(plan._id);
    setIsModalOpen(true);
  };

  // Actions
  const actions: TableAction<any>[] = [
    {
      label: "Edit Plan",
      icon: <FiEdit className="inline mr-2" />,
      onClick: (row) => {
        handleEdit(row);
      },
    },
  ];

  const children = (
    <div className="flex items-center gap-3">
      <Button onClick={handleAddNew} label="Add New Plan" />
    </div>
  );

  return (
    <div>
      <Table<any>
        title={`Subscription Plans (${subscriptionPlans?.length || 0})`}
        description="Manage all subscription plans in the system"
        theads={subscriptionPlanTheads}
        data={subscriptionPlanTableData || []}
        actions={actions}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        children={children}
        // onAddNew={handleAddNew}
      />

      {/* Add/Edit Modal */}
      <AddOrEditSubscriptionPlan
        isAddOrEditSubscriptionPlanModalOpen={isModalOpen}
        setIsAddOrEditSubscriptionPlanModalOpen={setIsModalOpen}
        modalType={modalType}
        setModalType={setModalType}
        subscriptionPlanId={selectedPlanId}
      />
    </div>
  );
};

export default SubscriptionPlan;
