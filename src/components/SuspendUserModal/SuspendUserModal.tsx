/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../reusable/Button/Button";
import Modal from "../reusable/Modal/Modal";
import Textarea from "../reusable/TextArea/TextArea";
import { useSuspendAccountMutation } from "../../redux/Features/Account/accountApi";

type TFormData = {
  suspensionReason: string;
  password: string;
};

type TSuspendUserModalProps = {
  selectedAccountId: string | null;
  isSuspendAccountModalOpen: boolean;
  setIsSuspendAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuspendUserModal: React.FC<TSuspendUserModalProps> = ({
  selectedAccountId,
  isSuspendAccountModalOpen,
  setIsSuspendAccountModalOpen,
}) => {
  const [suspendAccount, { isLoading }] = useSuspendAccountMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSuspendAccount = async (data: TFormData) => {
    try {
      const payload = {
        suspensionReason: data.suspensionReason,
      };
      const response = await suspendAccount({
        userId: selectedAccountId,
        data: payload,
      }).unwrap();
      if (response.success) {
        toast.success(response.message || "User suspended successfully");
        setIsSuspendAccountModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to suspend user");
    }
  };
  return (
    <Modal
      isModalOpen={isSuspendAccountModalOpen}
      setIsModalOpen={setIsSuspendAccountModalOpen}
      heading={`Suspend Account`}
    >
      <form
        onSubmit={handleSubmit(handleSuspendAccount)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Suspension Reason
           */}
          <Textarea
            label="Reason for Suspension"
            placeholder="Enter reason for suspension"
            error={errors.suspensionReason}
            {...register("suspensionReason", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            label="Suspend"
            isLoading={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
};

export default SuspendUserModal;
