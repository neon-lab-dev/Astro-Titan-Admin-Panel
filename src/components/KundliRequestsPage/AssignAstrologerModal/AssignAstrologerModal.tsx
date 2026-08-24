/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllAstrologersQuery } from "../../../redux/Features/Astrologer/astrologerApi";
import { useAssignAstrologerMutation } from "../../../redux/Features/KundliRequests/kundliRequestsApi";
import Button from "../../reusable/Button/Button";
import Modal from "../../reusable/Modal/Modal";
import toast from "react-hot-toast";
import { FiUser, FiClock } from "react-icons/fi";
import { FaPhone, FaLanguage, FaTransgender } from "react-icons/fa";

const AssignAstrologerModal = ({
  isModalOpen,
  setIsModalOpen,
  requestId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  requestId: string;
}) => {
  const [assignAstrologer, { isLoading: isSubmitting }] =
    useAssignAstrologerMutation();
  const { data, isLoading } = useGetAllAstrologersQuery({});
  const astrologers = data?.data?.astrologers || [];

  const [selectedAstrologerId, setSelectedAstrologerId] = useState<
    string | null
  >(null);

  const handleAssignAstrologer = async () => {
    if (!selectedAstrologerId) {
      toast.error("Please select an astrologer");
      return;
    }

    try {
      const payload = {
        astrologerId: selectedAstrologerId,
      };
      const res = await assignAstrologer({
        id: requestId,
        data: payload,
      }).unwrap();
      if (res?.success) {
        setIsModalOpen(false);
        setSelectedAstrologerId(null);
        toast.success(res?.message || "Astrologer assigned successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to assign astrologer");
    }
  };

  // Table headers
  const tableHeaders = [
    "Select",
    "Astrologer",
    "Phone Number",
    "Experience",
    "Area of Practice",
    "Gender",
    "Languages",
  ];

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading="Assign Astrologer"
      width="w-[90%] sm:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[60%]"
    >
      <div className="space-y-4 mt-5">
        {/* Astrologers Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-500"></div>
                      Loading astrologers...
                    </div>
                  </td>
                </tr>
              ) : astrologers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No astrologers available
                  </td>
                </tr>
              ) : (
                astrologers.map((astrologer: any) => {
                  const isSelected = selectedAstrologerId === astrologer._id;
                  return (
                    <tr
                      key={astrologer._id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-yellow-50 border-l-4 border-yellow-500"
                          : ""
                      }`}
                      onClick={() => setSelectedAstrologerId(astrologer._id)}
                    >
                      {/* Select Radio Button */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="radio"
                          name="astrologerSelect"
                          checked={isSelected}
                          onChange={() =>
                            setSelectedAstrologerId(astrologer._id)
                          }
                          className="w-4 h-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>

                      {/* Astrologer Info */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {astrologer?.profilePicture ? (
                            <img
                              src={astrologer.profilePicture}
                              alt={astrologer.displayName || "Astrologer"}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                              <FiUser className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {astrologer?.displayName ||
                                `${astrologer?.firstName || ""} ${astrologer?.lastName || ""}`.trim() ||
                                "N/A"}
                            </p>
                            {astrologer?.accountId && (
                              <p className="text-xs text-gray-400">
                                ID: {astrologer.accountId}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phone Number */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaPhone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {astrologer?.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Experience */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FiClock className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {astrologer?.experience
                              ? `${astrologer.experience} years`
                              : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Area of Practice */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {astrologer?.areaOfPractice?.length > 0 ? (
                            astrologer.areaOfPractice
                              .slice(0, 2)
                              .map((area: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                >
                                  {area}
                                </span>
                              ))
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                          {astrologer?.areaOfPractice?.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{astrologer.areaOfPractice.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaTransgender className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 capitalize">
                            {astrologer?.gender || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Languages */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaLanguage className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {astrologer?.consultLanguages?.length > 0
                              ? astrologer.consultLanguages.join(", ")
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedAstrologerId(null);
            }}
            label="Cancel"
            variant="secondary"
            className="px-6"
          />
          <Button
            type="submit"
            onClick={handleAssignAstrologer}
            label="Assign Astrologer"
            isLoading={isSubmitting}
            disabled={!selectedAstrologerId || isSubmitting}
            className="px-6"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AssignAstrologerModal;
