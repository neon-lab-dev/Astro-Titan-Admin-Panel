/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateIdentityStatusMutation } from "../../../redux/Features/Astrologer/astrologerApi";
import Modal from "../../reusable/Modal/Modal";
import Textarea from "../../reusable/TextArea/TextArea";
import Button from "../../reusable/Button/Button";

type TFormData = {
  rejectedReason: string;
};

type TRejectIdentityStatusProps = {
  selectedAstrologerId: string | null;
  isRejectIdentityModalOpen: boolean;
  setIsRejectIdentityModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RejectIdentityStatus: React.FC<TRejectIdentityStatusProps> = ({
  selectedAstrologerId,
  isRejectIdentityModalOpen,
  setIsRejectIdentityModalOpen,
}) => {
  const [updateIdentityStatus, { isLoading }] =
    useUpdateIdentityStatusMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleRejectIdentityStatus = async (data: TFormData) => {
    try {
      const payload = {
        status: "rejected",
        rejectedReason: data.rejectedReason || null,
      };
      const response = await updateIdentityStatus({
        id: selectedAstrologerId,
        data: payload,
      }).unwrap();
      if (response.success) {
        toast.success(
          response.message || "User identity rejected successfully",
        );
        setIsRejectIdentityModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject user identity");
    }
  };
  return (
    <Modal
      isModalOpen={isRejectIdentityModalOpen}
      setIsModalOpen={setIsRejectIdentityModalOpen}
      heading={`Reject Identity`}
    >
      <form
        onSubmit={handleSubmit(handleRejectIdentityStatus)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Suspension Reason
           */}
          <Textarea
            label="Reason for Rejection"
            placeholder="Enter reason for rejection"
            error={errors.rejectedReason}
            {...register("rejectedReason", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" label="Reject" isLoading={isLoading} />
        </div>
      </form>
    </Modal>
  );
};

export default RejectIdentityStatus;
