/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoArrowBack} from "react-icons/io5";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUserCircle,
  FaUsers,
  FaImage,
} from "react-icons/fa";
import { Flower2, Sparkles } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSinglePujaByIdQuery } from "../../redux/Features/Puja/pujaApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const PujaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { data, isLoading } = useGetSinglePujaByIdQuery(id);
  const puja = data?.data || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-4 h-4 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt key="half" className="w-4 h-4 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const calculateDiscountPercentage = () => {
    if (puja?.discountedPrice && puja?.basePrice) {
      return Math.round(
        ((puja.basePrice - puja.discountedPrice) / puja.basePrice) * 100,
      );
    }
    return 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading puja details...</p>
        </div>
      </div>
    );
  }

  const discountPercentage = calculateDiscountPercentage();
  const displayedReviews = showAllReviews
    ? puja?.reviews
    : puja?.reviews?.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] transition-colors mb-6"
        >
          <IoArrowBack className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Pujas</span>
        </button>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Left Column - Images */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {puja?.imageUrls && puja.imageUrls.length > 0 ? (
                  <>
                    {/* Main Swiper */}
                    <Swiper
                      modules={[Pagination, Navigation, Autoplay, Thumbs]}
                      pagination={{
                        clickable: true,
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        renderBullet: (_, className) => {
                          return `<span class="${className}" style="background: #d4af37"></span>`;
                        },
                      }}
                      navigation={{
                        nextEl: ".custom-swiper-button-next",
                        prevEl: ".custom-swiper-button-prev",
                      }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      thumbs={{ swiper: thumbsSwiper }}
                      className="h-100 relative"
                    >
                      {puja.imageUrls.map((image: string, index: number) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt={`${puja.name} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Thumbnail Swiper */}
                    {puja.imageUrls.length > 1 && (
                      <div className="px-4 py-4 bg-white border-t border-gray-100">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          modules={[Thumbs]}
                          spaceBetween={12}
                          slidesPerView={4}
                          watchSlidesProgress={true}
                          className="thumb-swiper"
                          breakpoints={{
                            640: { slidesPerView: 5 },
                            768: { slidesPerView: 6 },
                            1024: { slidesPerView: 8 },
                          }}
                        >
                          {puja.imageUrls.map(
                            (image: string, index: number) => (
                              <SwiperSlide key={index}>
                                <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent transition-all hover:border-[#d4af37]">
                                  <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-16 object-cover rounded-lg"
                                  />
                                </div>
                              </SwiperSlide>
                            ),
                          )}
                        </Swiper>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-100 bg-gray-100 flex items-center justify-center">
                    <FaImage className="w-20 h-20 text-gray-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUsers className="w-5 h-5 text-[#d4af37]" />
                Target Audience
              </h2>
              <div className="flex flex-wrap gap-2">{puja?.targetAudience}</div>
            </div>

            {/* How This Puja Performed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                How This Puja is Performed
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {puja?.howThisPujaPerformed}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {puja?.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                      <Flower2 className="w-3 h-3" />
                      {puja?.category || "Uncategorized"}
                    </span>
                    {puja?.rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(puja.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({puja?.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {puja?.description}
              </p>

              {/* Price */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-baseline gap-2 mb-2">
                  {puja?.discountedPrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{puja.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{puja.basePrice.toLocaleString()}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{puja.basePrice?.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Inclusive of all taxes</p>
              </div>
            </div>
            {/* Reviews Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaStar className="w-5 h-5 text-yellow-400" />
                Customer Reviews
              </h2>

              {puja?.reviews && puja.reviews.length > 0 ? (
                <>
                  {/* Average Rating */}
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {puja.rating?.toFixed(1) || "0.0"}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(puja.rating || 0)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {puja.reviews.length} reviews
                    </p>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
                    {displayedReviews?.map((review: any, index: number) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex gap-3">
                          {/* Avatar */}
                          <div className="shrink-0">
                            {review?.user?.profilePicture ? (
                              <img
                                src={review.user.profilePicture}
                                alt={review.user?.firstName || "User"}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <FaUserCircle className="w-10 h-10 text-gray-400" />
                            )}
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {review?.user?.firstName}{" "}
                                  {review?.user?.lastName}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  {renderStars(review.rating)}
                                  <span className="text-xs text-gray-500">
                                    {formatDate(review.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mt-2">
                              {review.review}
                            </p>

                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {review.images
                                  .slice(0, 3)
                                  .map((image: string, imgIdx: number) => (
                                    <img
                                      key={imgIdx}
                                      src={image}
                                      alt={`Review ${imgIdx + 1}`}
                                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                      onClick={() =>
                                        window.open(image, "_blank")
                                      }
                                    />
                                  ))}
                                {review.images.length > 3 && (
                                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                    +{review.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show More Button */}
                  {puja.reviews.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full mt-4 px-4 py-2 text-sm text-[#d4af37] hover:text-[#b8941f] font-medium hover:bg-[#d4af37]/10 rounded-lg transition-colors"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `Show All ${puja.reviews.length} Reviews`}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <FaStar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Pagination Bullets */
        .swiper-pagination-bullet {
          background: #d4af37 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #d4af37 !important;
          opacity: 1;
        }
        
        /* Thumbnail Styles */
        .thumb-swiper .swiper-slide-thumb-active div {
          border-color: #d4af37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.3);
        }
        
        .thumb-swiper .swiper-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .thumb-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        
        .thumb-swiper .swiper-slide:hover {
          opacity: 1;
        }
        
        /* Hide default navigation buttons */
        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default PujaDetails;
