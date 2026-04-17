/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import {
  FaStar,
  FaCertificate,
  FaGlobe,
  FaCalendarAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaVenusMars,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";
import { MdLocalPhone, MdVerified } from "react-icons/md";
import { useGetSingleAstrologerQuery } from "../../redux/Features/Astrologer/astrologerApi";
import { useParams } from "react-router-dom";
import { IMAGES } from "../../assets";
import Button from "../../components/reusable/Button/Button";
import SuspendUserModal from "../../components/SuspendUserModal/SuspendUserModal";
import { useActiveAccountMutation } from "../../redux/Features/Account/accountApi";
import toast from "react-hot-toast";
import LogoLoader from "../../components/shared/LogoLoader/LogoLoader";

const AstrologerDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"about" | "reviews">("about");
  const { data, isLoading } = useGetSingleAstrologerQuery(id);
  const [activeAccount] = useActiveAccountMutation();
  const [isSuspendAccountModalOpen, setIsSuspendAccountModalOpen] =
    useState<boolean>(false);

  const astrologerData = data?.data || {};

  const reviews = [
    {
      id: 1,
      userName: "Priya Sharma",
      rating: 5,
      date: "2024-03-15",
      comment: "Very accurate predictions! Helped me with career decisions.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      likes: 12,
      replies: 2,
    },
    {
      id: 2,
      userName: "Rajesh Kumar",
      rating: 4,
      date: "2024-03-10",
      comment: "Good experience, knowledgeable astrologer.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      likes: 8,
      replies: 1,
    },
    {
      id: 3,
      userName: "Sneha Patel",
      rating: 5,
      date: "2024-03-05",
      comment: "Amazing session! Very detailed analysis of my horoscope.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      likes: 15,
      replies: 3,
    },
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const getIdentityStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700";
      case "pending":
        return "bg-yellow-50 text-yellow-700";
      case "rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getIdentityStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <FaClock className="w-3.5 h-3.5" />;
      case "rejected":
        return <FaTimesCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? "text-yellow-400" : "text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating = 4.7;
  const totalReviews = 128;

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

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <LogoLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Photo */}
      <div className="relative h-64">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <img
          src={IMAGES.ctaBgImg}
          alt=""
          className="absolute h-24 md:h-64 2xl:h-90 object-cover top-0 w-full"
        />
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 hover:bg-white px-3 py-2 rounded-lg shadow-md transition-colors z-10"
        >
          <IoArrowBack className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Profile Picture & Basic Info */}
        <div className="bg-white rounded-xl shadow-sm -mt-16 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={astrologerData?.profilePicture || "/default-avatar.png"}
                  alt={`${astrologerData?.firstName} ${astrologerData?.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {parseInt(astrologerData?.experience) >= 10 && (
                  <div className="absolute -bottom-1 -right-1 bg-yellow-600 rounded-full p-1.5 border-2 border-white">
                    <FaCertificate className="w-4 h-4 text-white" />
                  </div>
                )}
                {astrologerData?.isIdentityVerified && (
                  <div className="absolute -top-1 right-2 bg-blue-500 rounded-full p-1 border-2 border-white">
                    <MdVerified className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Name & Stats */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {astrologerData?.displayName ||
                      `${astrologerData?.firstName} ${astrologerData?.lastName}`}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getIdentityStatusColor(
                      astrologerData?.identity?.status,
                    )}`}
                  >
                    {getIdentityStatusIcon(astrologerData?.identity?.status)}
                    {astrologerData?.identity?.status}
                  </span>
                  {astrologerData?.accountDetails?.isSuspended && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                      <FaTimesCircle className="w-3.5 h-3.5" />
                      Suspended
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">
                  {astrologerData?.firstName} {astrologerData?.lastName} •{" "}
                  {astrologerData?.gender === "male" ? "Male" : "Female"}
                </p>

                {/* Rating & Experience Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold">{averageRating}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      ({totalReviews} reviews)
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {astrologerData?.experience}+ years experience
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <FaGlobe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {astrologerData?.consultLanguages?.length || 0} Languages
                    </span>
                  </div>
                </div>

                {/* Suspension Info Message */}
                {astrologerData?.accountDetails?.isSuspended && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FaTimesCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Account Suspended
                        </p>
                        {astrologerData?.accountDetails?.suspensionReason && (
                          <p className="text-xs text-red-700 mt-1">
                            Reason:{" "}
                            {astrologerData.accountDetails.suspensionReason}
                          </p>
                        )}
                        <p className="text-xs text-red-600 mt-1">
                          Suspended on:{" "}
                          {new Date(
                            astrologerData?.accountDetails?.updatedAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {!astrologerData?.accountDetails?.isSuspended ? (
                    // Show Suspend button if not suspended
                    <Button
                      onClick={() => setIsSuspendAccountModalOpen(true)}
                      label="Suspend Account"
                    />
                  ) : (
                    // Show Withdraw Suspension button if suspended
                    <Button
                      onClick={() =>
                        handleWithdrawSuspension(
                          astrologerData?.accountDetails?._id,
                        )
                      }
                      label="Withdraw Suspension"
                    />
                  )}

                  {!astrologerData?.isIdentityVerified && (
                    <Button
                      // onClick={() => setIsApproveIdentityModalOpen(true)}
                      label="Approve Identity"
                      variant="primary"
                    />
                  )}

                  {astrologerData?.identity?.status === "pending" && (
                    <Button
                      // onClick={() => setIsRejectIdentityModalOpen(true)}
                      label="Reject Identity"
                      variant="secondary"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("about")}
                className={`py-3 px-1 font-medium text-sm transition-colors relative ${
                  activeTab === "about"
                    ? "text-yellow-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                About
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-3 px-1 font-medium text-sm transition-colors relative ${
                  activeTab === "reviews"
                    ? "text-yellow-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reviews ({totalReviews})
                {activeTab === "reviews" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* About Tab */}
          {activeTab === "about" && (
            <>
              {/* Bio Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Bio
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {astrologerData?.bio || "No bio provided"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Professional Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-sm text-gray-900">
                          {astrologerData?.accountDetails?.email || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MdLocalPhone className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Phone Number
                        </p>
                        <p className="text-sm text-gray-900">
                          {astrologerData?.phoneNumber || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaVenusMars className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Gender
                        </p>
                        <p className="text-sm text-gray-900 capitalize">
                          {astrologerData?.gender || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Country
                        </p>
                        <p className="text-sm text-gray-900">
                          {astrologerData?.country || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaStar className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Area of Practice
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {astrologerData?.areaOfPractice?.map(
                            (spec: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                              >
                                {spec}
                              </span>
                            ),
                          ) || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaGlobe className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {astrologerData?.consultLanguages?.map(
                            (lang: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                              >
                                {lang}
                              </span>
                            ),
                          ) || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaIdCard className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Identity Documents
                        </p>
                        <div className="flex gap-3 mt-1">
                          {astrologerData?.identity?.frontSide && (
                            <button
                              onClick={() =>
                                window.open(
                                  astrologerData.identity.frontSide,
                                  "_blank",
                                )
                              }
                              className="text-xs text-yellow-600 font-semibold underline"
                            >
                              Front Side
                            </button>
                          )}
                          {astrologerData?.identity?.backSide && (
                            <button
                              onClick={() =>
                                window.open(
                                  astrologerData.identity.backSide,
                                  "_blank",
                                )
                              }
                              className="text-xs text-yellow-600 font-semibold underline"
                            >
                              Back Side
                            </button>
                          )}
                        </div>
                        {astrologerData?.identity?.rejectedReason && (
                          <p className="text-xs text-red-600 mt-1">
                            Rejection: {astrologerData.identity.rejectedReason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {averageRating}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(Math.floor(averageRating))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on {totalReviews} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = {
                        5: 75,
                        4: 15,
                        3: 5,
                        2: 3,
                        1: 2,
                      }[star];
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm">{star}</span>
                            <FaStar className="w-3 h-3 text-yellow-400" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <div className="flex gap-4">
                      <img
                        src={review.avatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.userName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-xs text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <SuspendUserModal
        selectedAccountId={id as string}
        isSuspendAccountModalOpen={isSuspendAccountModalOpen}
        setIsSuspendAccountModalOpen={setIsSuspendAccountModalOpen}
      />
    </div>
  );
};

export default AstrologerDetails;
