/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, { type TableAction } from "../../components/reusable/Table/Table";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import Button from "../../components/reusable/Button/Button";
import { useGetAllCategoriesByAreaNameQuery } from "../../redux/Features/Categories/categoriesApi";
import Category from "../../components/shared/Category/Category";
import { useDeletePujaMutation, useGetAllPujaQuery } from "../../redux/Features/Puja/pujaApi";
import AddOrEditPuja from "../../components/PujaPages/AddOrEditPuja/AddOrEditPuja";

const Puja = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [modalType, setModalType] = useState<string>("add");
  const [isAddOrEditPujaModalOpen, setIsAddOrEditPujaModalOpen] =
    useState<boolean>(false);
  const [pujaId, setPujaId] = useState<string | null>(null);
  const [deletePuja] = useDeletePujaMutation();

  const { data, isLoading, isFetching, refetch } = useGetAllPujaQuery({
    skip,
    page,
    limit,
    keyword,
    category,
  });

  const { data: categories } = useGetAllCategoriesByAreaNameQuery("Puja");

  const pujaTheads: any[] = [
    { key: "sl", label: "SL" },
    { key: "image", label: "Image" },
    { key: "name", label: "Puja Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "discount", label: "Discount" },
    { key: "rating", label: "Rating" },
    { key: "targetAudience", label: "Target Audience" },
    { key: "status", label: "Status" },
  ];

  const pujas = data?.data?.pujas || [];

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <FaStar key="half" className="w-3.5 h-3.5 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-gray-600">
          ({rating.toFixed(1) || 0})
        </span>
      </div>
    );
  };

  const pujaTableData = pujas?.map((puja: any, index: number) => ({
    _id: puja._id,

    sl: index + 1,

    image: puja?.imageUrls?.[0] ? (
      <img
        src={puja.imageUrls[0]}
        alt={puja.name}
        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
      />
    ) : (
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
        <MdCategory className="w-6 h-6 text-gray-400" />
      </div>
    ),

    name: (
      <div className="font-medium">
        <Link
          to={`/dashboard/puja/${puja?._id}`}
          className="hover:text-yellow-600 hover:underline transition-colors"
        >
          {puja?.name}
        </Link>
        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
          {puja?.description?.substring(0, 60)}...
        </p>
      </div>
    ),

    category: (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
        <MdCategory className="w-3 h-3" />
        {puja?.category || "N/A"}
      </span>
    ),

    price: (
      <div>
        <p className="text-sm font-semibold text-gray-900">
          ₹{puja?.basePrice?.toLocaleString() || 0}
        </p>
        {puja?.discountedPrice &&
          puja.discountedPrice < puja.basePrice && (
            <p className="text-xs text-gray-500 line-through">
              ₹{puja?.basePrice?.toLocaleString()}
            </p>
          )}
      </div>
    ),

    discount: puja?.discountedPrice ? (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-green-700">
          ₹{puja.discountedPrice.toLocaleString()}
        </span>
        <span className="text-xs text-green-600">
          {Math.round(
            ((puja.basePrice - puja.discountedPrice) / puja.basePrice) * 100,
          )}
          % OFF
        </span>
      </div>
    ) : (
      <span className="text-sm text-gray-500">No discount</span>
    ),

    rating: (
      <div>
        {renderStars(puja?.rating)}
        <p className="text-xs text-gray-500 mt-1">
          {puja?.reviews?.length || 0} reviews
        </p>
      </div>
    ),

    targetAudience: (
      <div className="flex flex-wrap gap-1">
        {puja?.targetAudience
          ?.split(",")
          ?.slice(0, 2)
          ?.map((audience: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {audience.trim()}
            </span>
          ))}
        {puja?.targetAudience?.split(",")?.length > 2 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
            +{puja.targetAudience.split(",").length - 2}
          </span>
        )}
      </div>
    ),

    status: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          puja?.isActive !== false
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {puja?.isActive !== false ? "Active" : "Inactive"}
      </span>
    ),
  }));

  const handleSearch = (k: string) => {
    setKeyword(k);
  };

  const handleDeletePuja = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Are you sure you want to delete this puja?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await toast.promise(deletePuja(id).unwrap(), {
                    loading: "Deleting puja...",
                    success: "Puja deleted successfully!",
                    error: "Failed to delete puja.",
                  });
                  refetch();
                } catch (err: any) {
                  toast.error(
                    err?.data?.message || "Failed to delete puja.",
                  );
                }
              }}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      },
    );
  };

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Details",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => {
        navigate(`/dashboard/puja/${row?._id}`);
      },
    },
    {
      label: "Delete Puja",
      icon: <FiTrash2 className="inline mr-2" />,
      onClick: (row) => {
        handleDeletePuja(row?._id);
      },
    },
  ];

  const children = (
    <div className="flex items-center gap-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input input-sm px-3 py-2 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories?.data?.map((category: any) => (
          <option key={category?.category} value={category?.category}>
            {category?.category}
          </option>
        ))}
      </select>
      <Category areaName="Puja" />
      <Button
        onClick={() => {
          setModalType("add");
          setIsAddOrEditPujaModalOpen(true);
        }}
        label="Add Puja"
      />
    </div>
  );

  return (
    <div>
      <Table<any>
        title={`Pujas (${pujaTableData?.length || 0})`}
        description="Manage all pujas in the system"
        theads={pujaTheads}
        data={pujaTableData || []}
        actions={actions}
        children={children}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        onEditItem={(row: any) => {
          setModalType("edit");
          setPujaId(row?._id);
          setIsAddOrEditPujaModalOpen(true);
        }}
      />

      {isAddOrEditPujaModalOpen && (
        <AddOrEditPuja
          isAddOrEditPujaModalOpen={isAddOrEditPujaModalOpen}
          setIsAddOrEditPujaModalOpen={setIsAddOrEditPujaModalOpen}
          modalType={modalType}
          setModalType={setModalType}
          pujaId={pujaId as string}
          categories={categories?.data || []}
        />
      )}
    </div>
  );
};

export default Puja;