/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoArrowBack, IoMailOutline } from "react-icons/io5";
import {
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaVenusMars,
  FaGlobe,
} from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { useGetSingleUserByIdQuery } from "../../redux/Features/User/userApi";
import { useParams } from "react-router-dom";
import { useActiveAccountMutation } from "../../redux/Features/Account/accountApi";
import toast from "react-hot-toast";
import SuspendUserModal from "../../components/SuspendUserModal/SuspendUserModal";
import Button from "../../components/reusable/Button/Button";
import LogoLoader from "../../components/shared/LogoLoader/LogoLoader";

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserByIdQuery(id);
  const [activeAccount] = useActiveAccountMutation();
  const [isSuspendAccountModalOpen, setIsSuspendAccountModalOpen] =
    useState<boolean>(false);

  const userData = data?.data || {};
  const isSuspended = userData?.accountId?.isSuspended || false;

  const handleGoBack = () => {
    window.history.back();
  };

  const handleWithdrawSuspension = async (id: string) => {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
      return (
        <div className="h-[80vh] flex items-center justify-center">
          <LogoLoader />
        </div>
      );
    }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <IoArrowBack className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Users</span>
            </button>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  {/* Profile Picture */}
                  <div className="shrink-0">
                    {userData?.profilePicture ? (
                      <img
                        src={userData.profilePicture}
                        alt={`${userData?.firstName} ${userData?.lastName}`}
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h1 className="text-2xl font-semibold text-gray-900">
                        {userData?.firstName || "N/A"} {userData?.lastName}
                      </h1>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isSuspended
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {isSuspended ? (
                          <FaTimesCircle className="w-3 h-3" />
                        ) : (
                          <FaCheckCircle className="w-3 h-3" />
                        )}
                        {isSuspended ? "Suspended" : "Active"}
                      </span>
                      {userData?.isProfileCompleted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                          <FaCheckCircle className="w-3 h-3" />
                          Profile Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 capitalize">
                      {userData?.gender === "male" ? "Male" : "Female"} • Member
                      since {formatDate(userData?.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {!isSuspended ? (
                    <Button
                      onClick={() => setIsSuspendAccountModalOpen(true)}
                      label="Suspend Account"
                    />
                  ) : (
                    <Button
                      onClick={() =>
                        handleWithdrawSuspension(userData?.accountId?._id)
                      }
                      label="Withdraw Suspension"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Suspension Alert */}
          {isSuspended && userData?.accountId?.suspensionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <FaExclamationTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Account Suspended
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    Reason: {userData.accountId.suspensionReason}
                  </p>
                  {userData.accountId.updatedAt && (
                    <p className="text-xs text-red-600 mt-1">
                      Suspended on: {formatDate(userData.accountId.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <IoMailOutline className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="text-sm text-gray-900">
                        {userData?.accountId?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="text-sm text-gray-900">
                        {userData?.phoneNumber ||
                          userData?.accountId?.phoneNumber ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Birth Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Birth Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                      <MdOutlineDateRange className="w-3 h-3" />
                      Date of Birth
                    </p>
                    <p className="text-sm text-gray-900">
                      {formatDate(userData?.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                      <FaClock className="w-3 h-3" />
                      Time of Birth
                    </p>
                    <p className="text-sm text-gray-900">
                      {userData?.timeOfBirth || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      Place of Birth
                    </p>
                    <p className="text-sm text-gray-900">
                      {userData?.placeOfBirth || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              {userData?.intents && userData.intents.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Interests & Intentions
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.intents.map((intent: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {intent}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaUserCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm text-gray-900">
                        {userData?.firstName} {userData?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaVenusMars className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm text-gray-900 capitalize">
                        {userData?.gender || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaGlobe className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Country</p>
                      <p className="text-sm text-gray-900">
                        {userData?.country || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Account Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Account Created</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(userData?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(userData?.updatedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Role</p>
                    <p className="text-sm text-gray-900 capitalize">
                      {userData?.accountId?.role || "User"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      <SuspendUserModal
        selectedAccountId={userData?.accountId?._id as string}
        isSuspendAccountModalOpen={isSuspendAccountModalOpen}
        setIsSuspendAccountModalOpen={setIsSuspendAccountModalOpen}
      />
    </>
  );
};

export default UserDetails;
