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
import {
  useAddProductMutation,
  useGetSingleProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/Features/Product/productApi";

type TFormData = {
  name: string;
  category: string;
  description: string;
  basePrice: string;
  discountedPrice?: string;
  whyThisWork: string;
  targetAudience: string;
  howToUse: string;
  files?: any;
};

type TAddOrEditProductProps = {
  isAddOrEditProductModalOpen: boolean;
  setIsAddOrEditProductModalOpen: any;
  modalType: string;
  setModalType: (value: string) => void;
  productId?: string;
  categories: any[];
};

const AddOrEditProduct: React.FC<TAddOrEditProductProps> = ({
  isAddOrEditProductModalOpen,
  setIsAddOrEditProductModalOpen,
  modalType,
  setModalType,
  productId,
  categories,
}) => {
  const { data, isLoading: isSingleProductLoading } =
    useGetSingleProductByIdQuery(productId, { skip: !productId });
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    const singleProductData = data?.data || {};
    if (modalType === "edit" && singleProductData && productId) {
      setValue("name", singleProductData?.name || "");
      setValue("category", singleProductData?.category || "");
      setValue("description", singleProductData?.description || "");
      setValue("basePrice", singleProductData?.basePrice?.toString() || "");
      setValue(
        "discountedPrice",
        singleProductData?.discountedPrice?.toString() || "",
      );
      setValue("whyThisWork", singleProductData?.whyThisWork || "");
      setValue("targetAudience", singleProductData?.targetAudience || "");
      setValue("howToUse", singleProductData?.howToUse || "");
    } else {
      reset();
    }
  }, [modalType, data, reset, setValue, productId]);

  const handleSubmitProduct = async (data: TFormData) => {
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
      formData.append("whyThisWork", data.whyThisWork);
      formData.append("targetAudience", data.targetAudience);
      formData.append("howToUse", data.howToUse);

      // Multiple Images - Append all files
      if (data.files && data.files.length > 0) {
        Array.from(data.files).forEach((file: any) => {
          formData.append("files", file);
        });
      }

      // API Call
      if (modalType === "add") {
        await addProduct(formData).unwrap();
        toast.success("Product added successfully");
        setIsAddOrEditProductModalOpen(false);
        reset();
      } else {
        await updateProduct({ id: productId, data: formData }).unwrap();
        toast.success("Product updated successfully");
        setIsAddOrEditProductModalOpen(false);
        reset();
      }
    } catch (error: any) {
      console.error("Error submitting product:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const productCategories = categories?.map((category) => ({
    label: category.category || category.name || category,
    value: category.category || category.name || category,
  }));

  return (
    <Modal
      isModalOpen={isAddOrEditProductModalOpen}
      setIsModalOpen={setIsAddOrEditProductModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Product`}
    >
      <div className="relative">
        {isSingleProductLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50 h-[80vh]">
            <Loader size="lg" />
            Please wait...
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSubmitProduct)}
          className="flex flex-col gap-6 font-Nunito mt-5"
        >
          <div className="flex flex-col gap-6">
            {/* Product Name */}
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              error={errors.name}
              {...register("name", { required: "Product name is required" })}
            />

            {/* Category */}
            <SelectDropdown
              label="Category"
              options={productCategories || []}
              error={errors.category}
              {...register("category", {
                required: "Category is required",
              })}
            />

            {/* Description */}
            <Textarea
              label="Description"
              placeholder="Enter product description"
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
                  validate: (value) =>
                    parseFloat(value) > 0 || "Price must be greater than 0",
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

            {/* Why This Works */}
            <Textarea
              label="Why This Works"
              placeholder="Explain why this product works and its benefits"
              rows={3}
              error={errors.whyThisWork}
              {...register("whyThisWork", {
                required: "Why this works is required",
              })}
            />

            {/* Target Audience */}
            <Textarea
              label="Target Audience"
              placeholder="Who is this product for? (e.g., Students, Professionals, Beginners)"
              rows={2}
              error={errors.targetAudience}
              {...register("targetAudience", {
                required: "Target audience is required",
              })}
            />

            {/* How to Use */}
            <Textarea
              label="How to Use"
              placeholder="Instructions on how to use the product"
              rows={3}
              error={errors.howToUse}
              {...register("howToUse", {
                required: "How to use is required",
              })}
            />

            {/* Product Images */}
            <FileUploadInput
              label="Product Images"
              placeholder="Upload product images"
              helpText="You can upload multiple images (Max 5MB each). Recommended: At least one image."
              accept="image/*"
              multiple
              maxFiles={5}
              maxSize={5}
              error={errors.files}
              {...register("files", {
                required:
                  modalType === "add"
                    ? "At least one product image is required"
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
                setIsAddOrEditProductModalOpen(false);
                setModalType("add");
                reset();
              }}
            />
            <Button
              type="submit"
              label={modalType === "add" ? "Add Product" : "Update Product"}
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

export default AddOrEditProduct;
