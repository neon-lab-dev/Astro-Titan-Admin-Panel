import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FaStar, FaCertificate, FaGlobe, FaCalendarAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocalPhone } from 'react-icons/md';

interface AstrologerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string[];
  phoneNumber: string[];
  expertise: string;
  experience: number;
  city: string;
  country: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  profilePicture?: string;
  specialization?: string[];
  languages?: string[];
  rating?: number;
  totalConsultations?: number;
  about?: string;
}

const AstrologerDetails: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const astrologerData: AstrologerData = {
    id: "1",
    firstName: "Rajesh",
    lastName: "Verma",
    email: ["rajesh.astro@example.com", "rajesh.verma@astro.com"],
    phoneNumber: ["9876501234", "9876505678"],
    expertise: "Vedic Astrology",
    experience: 10,
    city: "Varanasi",
    country: "India",
    status: "ACTIVE",
    specialization: ["Horoscope", "Numerology", "Palmistry"],
    languages: ["Hindi", "English", "Sanskrit"],
    rating: 4.8,
    totalConsultations: 15420,
    about: "Expert Vedic astrologer with 10+ years of experience in guiding people through planetary influences and life challenges.",
    profilePicture: "https://via.placeholder.com/150"
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getStatusColor = (status: string) => {
    if (isBlocked) return 'bg-red-50 text-red-700';
    switch(status) {
      case 'ACTIVE': return 'bg-green-50 text-green-700';
      case 'INACTIVE': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-4xl p-6">
        {/* Header with Go Back Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors group"
          >
            <IoArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <div className="flex items-center gap-3">
            {/* Rating Badge */}
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full">
              <FaStar className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">{astrologerData.rating}</span>
            </div>
            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(astrologerData.status)}`}>
              {isBlocked ? 'BLOCKED' : astrologerData.status}
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="relative">
            <img 
              src={astrologerData.profilePicture} 
              alt={`${astrologerData.firstName} ${astrologerData.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-600"
            />
            {astrologerData.experience >= 10 && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-600 rounded-full p-1">
                <FaCertificate className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {astrologerData.firstName} {astrologerData.lastName}
            </h1>
            <p className="text-sm text-gray-500">{astrologerData.expertise}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                {astrologerData.experience}+ years experience
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {astrologerData.totalConsultations?.toLocaleString()} consultations
              </span>
            </div>
          </div>
        </div>

        {/* Astrologer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 py-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaEnvelope className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <div className="space-y-1">
                  {astrologerData.email.map((email, index) => (
                    <p key={index} className="text-sm text-gray-900">{email}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MdLocalPhone className="size-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Numbers</p>
                <div className="space-y-1">
                  {astrologerData.phoneNumber.map((phone, index) => (
                    <p key={index} className="text-sm text-gray-900">{phone}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaStar className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Specializations</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {astrologerData.specialization?.map((spec, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaGlobe className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Languages</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {astrologerData.languages?.map((lang, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm text-gray-900">{astrologerData.city}, {astrologerData.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCalendarAlt className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">About</p>
                <p className="text-sm text-gray-900 line-clamp-2">{astrologerData.about}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={() => setIsBlocked(true)}
            disabled={isBlocked}
            className={`flex-1 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${
              isBlocked 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Block Astrologer
          </button>
          <button
            onClick={() => setIsBlocked(false)}
            disabled={!isBlocked}
            className={`flex-1 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${
              !isBlocked 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            Unblock Astrologer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerDetails;