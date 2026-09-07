/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Modal from "../../reusable/Modal/Modal";
import Loader from "../../shared/Loader/Loader";
import TextInput from "../../reusable/TextInput/TextInput";
import Textarea from "../../reusable/TextArea/TextArea";
import Button from "../../reusable/Button/Button";
import toast from "react-hot-toast";
import {
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useGetSingleSubscriptionPlanByIdQuery,
} from "../../../redux/Features/SubscriptionPlan/subscriptionPlanApi";
import { X, Plus } from "lucide-react";

type TFormData = {
  name: string;
  description: string;
  price: string;
  duration: string;
  numberOfConsultations: string;
  features: string[];
};

type TAddOrEditSubscriptionPlanProps = {
  isAddOrEditSubscriptionPlanModalOpen: boolean;
  setIsAddOrEditSubscriptionPlanModalOpen: any;
  modalType: string;
  setModalType: any;
  subscriptionPlanId?: string;
};

const AddOrEditSubscriptionPlan: React.FC<TAddOrEditSubscriptionPlanProps> = ({
  isAddOrEditSubscriptionPlanModalOpen,
  setIsAddOrEditSubscriptionPlanModalOpen,
  modalType,
  setModalType,
  subscriptionPlanId,
}) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState<string>("");

  const { data, isLoading: isSinglePlanLoading } =
    useGetSingleSubscriptionPlanByIdQuery(subscriptionPlanId, {
      skip: !subscriptionPlanId,
    });

  const [createSubscriptionPlan, { isLoading: isCreating }] =
    useCreateSubscriptionPlanMutation();
  const [updateSubscriptionPlan, { isLoading: isUpdating }] =
    useUpdateSubscriptionPlanMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    const singlePlanData = data?.data || {};
    if (modalType === "edit" && singlePlanData && subscriptionPlanId) {
      setValue("name", singlePlanData?.name || "");
      setValue("description", singlePlanData?.description || "");
      setValue("price", singlePlanData?.price?.toString() || "");
      setValue("duration", singlePlanData?.duration?.toString() || "");
      setValue(
        "numberOfConsultations",
        singlePlanData?.numberOfConsultations?.toString() || ""
      );
      setFeatures(singlePlanData?.features || []);
    } else {
      reset();
      setFeatures([]);
      setFeatureInput("");
    }
  }, [modalType, data, reset, setValue, subscriptionPlanId]);

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSubmitSubscriptionPlan = async (data: TFormData) => {
    try {
      if (features.length === 0) {
        toast.error("Please add at least one feature");
        return;
      }

      const payload = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        duration: parseInt(data.duration),
        numberOfConsultations: data.numberOfConsultations,
        features: features,
      };

      if (modalType === "add") {
        await createSubscriptionPlan(payload).unwrap();
        toast.success("Subscription plan created successfully");
        setIsAddOrEditSubscriptionPlanModalOpen(false);
        reset();
        setFeatures([]);
        setFeatureInput("");
      } else {
        await updateSubscriptionPlan({
          id: subscriptionPlanId,
          data: payload,
        }).unwrap();
        toast.success("Subscription plan updated successfully");
        setIsAddOrEditSubscriptionPlanModalOpen(false);
        reset();
        setFeatures([]);
        setFeatureInput("");
      }
    } catch (error: any) {
      console.error("Error submitting subscription plan:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      isModalOpen={isAddOrEditSubscriptionPlanModalOpen}
      setIsModalOpen={setIsAddOrEditSubscriptionPlanModalOpen}
      heading={`${modalType === "add" ? "Create" : "Update"} Subscription Plan`}
    >
      <div className="relative">
        {isSinglePlanLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50 h-[80vh]">
            <Loader size="lg" />
            <span className="mt-2 text-gray-600">Loading plan details...</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSubmitSubscriptionPlan)}
          className="flex flex-col gap-6 font-Nunito mt-5"
        >
          <div className="flex flex-col gap-6">
            {/* Plan Name */}
            <TextInput
              label="Plan Name"
              placeholder="Enter plan name (e.g., Basic, Premium)"
              error={errors.name}
              {...register("name", { required: "Plan name is required" })}
            />

            {/* Description */}
            <Textarea
              label="Description"
              placeholder="Describe what this subscription plan offers"
              rows={3}
              error={errors.description}
              {...register("description", {
                required: "Description is required",
              })}
            />

            {/* Pricing & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Price (₹)"
                type="number"
                placeholder="Enter price in INR"
                error={errors.price}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be greater than 0" },
                  validate: (value) =>
                    parseFloat(value) > 0 || "Price must be greater than 0",
                })}
              />

              <TextInput
                label="Duration (Days)"
                type="number"
                placeholder="Enter duration in days"
                error={errors.duration}
                {...register("duration", {
                  required: "Duration is required",
                  min: { value: 1, message: "Duration must be at least 1 day" },
                  validate: (value) =>
                    parseInt(value) >= 1 || "Duration must be at least 1 day",
                })}
              />
            </div>

            {/* Number of Consultations */}
            <TextInput
              label="Number of Consultations"
              placeholder="e.g., 5, Unlimited, etc."
              error={errors.numberOfConsultations}
              {...register("numberOfConsultations", {
                required: "Number of consultations is required",
              })}
            />

            {/* Features - Dynamic Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Features <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter a feature (e.g., 24/7 Support)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Features List */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {features.length === 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  Add at least one feature for this subscription plan
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              label="Cancel"
              type="button"
              variant="secondary"
              className="py-1.75 w-full md:w-fit"
              onClick={() => {
                setIsAddOrEditSubscriptionPlanModalOpen(false);
                setModalType("add");
                reset();
                setFeatures([]);
                setFeatureInput("");
              }}
            />
            <Button
              type="submit"
              label={modalType === "add" ? "Create Plan" : "Update Plan"}
              variant="primary"
              className="py-1.75 w-full md:w-fit"
              isLoading={isCreating || isUpdating}
              isDisabled={isCreating || isUpdating || features.length === 0}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddOrEditSubscriptionPlan;