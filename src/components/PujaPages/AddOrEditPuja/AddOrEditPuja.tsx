/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Modal from "../../reusable/Modal/Modal";
import Loader from "../../shared/Loader/Loader";
import TextInput from "../../reusable/TextInput/TextInput";
import SelectDropdown from "../../reusable/SelectDropdown/SelectDropdown";
import Textarea from "../../reusable/TextArea/TextArea";
import FileUploadInput from "../../reusable/FileUploadInput/FileUploadInput";
import Button from "../../reusable/Button/Button";
import toast from "react-hot-toast";
import { useAddPujaMutation, useGetSinglePujaByIdQuery, useUpdatePujaMutation } from "../../../redux/Features/Puja/pujaApi";

type TFormData = {
  name: string;
  category: string;
  description: string;
  basePrice: string;
  discountedPrice?: string;
  targetAudience: string;
  howThisPujaPerformed: string;
  files?: any;
};

type TAddOrEditPujaProps = {
  isAddOrEditPujaModalOpen: boolean;
  setIsAddOrEditPujaModalOpen: any;
  modalType: string;
  setModalType: (value: string) => void;
  pujaId?: string;
  categories: any[];
};

const AddOrEditPuja: React.FC<TAddOrEditPujaProps> = ({
  isAddOrEditPujaModalOpen,
  setIsAddOrEditPujaModalOpen,
  modalType,
  setModalType,
  pujaId,
  categories,
}) => {
  const { data, isLoading: isSinglePujaLoading } =
    useGetSinglePujaByIdQuery(pujaId, { skip: !pujaId });
  const [addPuja, { isLoading: isAdding }] = useAddPujaMutation();
  const [updatePuja, { isLoading: isUpdating }] = useUpdatePujaMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    const singlePujaData = data?.data || {};
    if (modalType === "edit" && singlePujaData && pujaId) {
      setValue("name", singlePujaData?.name || "");
      setValue("category", singlePujaData?.category || "");
      setValue("description", singlePujaData?.description || "");
      setValue("basePrice", singlePujaData?.basePrice?.toString() || "");
      setValue("discountedPrice", singlePujaData?.discountedPrice?.toString() || "");
      setValue("targetAudience", singlePujaData?.targetAudience || "");
      setValue("howThisPujaPerformed", singlePujaData?.howThisPujaPerformed || "");
    } else {
      reset();
    }
  }, [modalType, data, reset, setValue, pujaId]);

  const handleSubmitPuja = async (data: TFormData) => {
    try {
      const formData = new FormData();

      // Basic Info
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("description", data.description);

      // Pricing
      formData.append("basePrice", data.basePrice.toString());
      if (data.discountedPrice) {
        formData.append("discountedPrice", data.discountedPrice.toString());
      }

      // Additional Info
      formData.append("targetAudience", data.targetAudience);
      formData.append("howThisPujaPerformed", data.howThisPujaPerformed);

      // Multiple Images - Append all files
      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file: any) => {
          formData.append("files", file);
        });
      }

      // API Call
      if (modalType === "add") {
        await addPuja(formData).unwrap();
        toast.success("Puja added successfully");
        setIsAddOrEditPujaModalOpen(false);
        reset();
      } else {
        await updatePuja({ id: pujaId, data: formData }).unwrap();
        toast.success("Puja updated successfully");
        setIsAddOrEditPujaModalOpen(false);
        reset();
      }
    } catch (error: any) {
      console.error("Error submitting puja:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const pujaCategories = categories?.map((category) => ({
    label: category.category || category.name || category,
    value: category.category || category.name || category,
  }));

  return (
    <Modal
      isModalOpen={isAddOrEditPujaModalOpen}
      setIsModalOpen={setIsAddOrEditPujaModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Puja`}
    >
      <div className="relative">
        {isSinglePujaLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50">
            <Loader size="lg" />
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSubmitPuja)}
          className="flex flex-col gap-6 font-Nunito mt-5"
        >
          <div className="flex flex-col gap-6">
            {/* Puja Name */}
            <TextInput
              label="Puja Name"
              placeholder="Enter puja name"
              error={errors.name}
              {...register("name", { required: "Puja name is required" })}
            />

            {/* Category */}
            <SelectDropdown
              label="Category"
              options={pujaCategories || []}
              error={errors.category}
              {...register("category", {
                required: "Category is required",
              })}
            />

            {/* Description */}
            <Textarea
              label="Description"
              placeholder="Enter puja description"
              rows={3}
              error={errors.description}
              {...register("description", {
                required: "Description is required",
              })}
            />

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Base Price"
                type="number"
                placeholder="Enter base price"
                error={errors.basePrice}
                {...register("basePrice", {
                  required: "Base price is required",
                  min: { value: 0, message: "Price must be greater than 0" },
                  validate: (value) => parseFloat(value) > 0 || "Price must be greater than 0",
                })}
              />

              <TextInput
                label="Discounted Price"
                type="number"
                placeholder="Enter discounted price"
                error={errors.discountedPrice}
                {...register("discountedPrice", {
                  min: {
                    value: 0,
                    message: "Discounted price must be greater than 0",
                  },
                  validate: (value) => {
                    if (value && parseFloat(value) < 0) {
                      return "Discounted price must be greater than 0";
                    }
                    return true;
                  },
                })}
              />
            </div>

            {/* Target Audience */}
            <Textarea
              label="Target Audience"
              placeholder="Who is this puja for? (e.g., Students, Professionals, Business Owners, Families)"
              rows={2}
              error={errors.targetAudience}
              {...register("targetAudience", {
                required: "Target audience is required",
              })}
            />

            {/* How This Puja Performed */}
            <Textarea
              label="How This Puja is Performed"
              placeholder="Explain how this puja is performed, rituals involved, duration, etc."
              rows={4}
              error={errors.howThisPujaPerformed}
              {...register("howThisPujaPerformed", {
                required: "Puja performance details are required",
              })}
            />

            {/* Puja Images */}
            <FileUploadInput
              label="Puja Images"
              placeholder="Upload puja images"
              helpText="You can upload multiple images (Max 5MB each). Recommended: At least one image."
              accept="image/*"
              multiple
              maxFiles={5}
              maxSize={5}
              error={errors.files}
              {...register("files", {
                required:
                  modalType === "add"
                    ? "At least one puja image is required"
                    : false,
                validate: {
                  fileType: (files) => {
                    if (files && files.length > 0) {
                      const invalidFiles = Array.from(files).filter(
                        (file: any) => !file.type.startsWith("image/"),
                      );
                      if (invalidFiles.length > 0) {
                        return "Please upload only image files";
                      }
                    }
                    return true;
                  },
                  fileSize: (files) => {
                    if (files && files.length > 0) {
                      const oversizedFiles = Array.from(files).filter(
                        (file: any) => file.size > 5 * 1024 * 1024,
                      );
                      if (oversizedFiles.length > 0) {
                        return "Some files exceed 5MB size limit";
                      }
                    }
                    return true;
                  },
                },
              })}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              label="Cancel"
              type="button"
              variant="secondary"
              className="py-1.75 w-full md:w-fit"
              onClick={() => {
                setIsAddOrEditPujaModalOpen(false);
                setModalType("add");
                reset();
              }}
            />
            <Button
              type="submit"
              label={modalType === "add" ? "Add Puja" : "Update Puja"}
              variant="primary"
              className="py-1.75 w-full md:w-fit"
              isLoading={isAdding || isUpdating}
              isDisabled={isAdding || isUpdating}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddOrEditPuja;