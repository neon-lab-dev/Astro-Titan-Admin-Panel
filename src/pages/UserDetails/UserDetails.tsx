import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  bayouUserStatus: string;
  nickname: string;
  city: string;
  country: string;
  state: string;
  address: string;
  profilePicture: string;
}

const UserDetails: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const userData: UserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    bayouUserStatus: "Premium Member",
    nickname: "Johnny",
    city: "New Orleans",
    country: "USA",
    state: "Louisiana",
    address: "123 Bayou Street, Apt 4B",
    profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXLb3TY72rHh4VSJUR8UGa83p3ABg3FRBNrw&s"
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-3xl p-6">
        {/* Header with Go Back Button */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors group"
          >
            <IoArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isBlocked ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {isBlocked ? 'Blocked' : 'Active'}
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <img 
            src={userData.profilePicture} 
            alt={userData.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-yellow-600"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{userData.name}</h1>
            <p className="text-sm text-gray-500">{userData.bayouUserStatus}</p>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="flex flex-col gap-7 py-6">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
              <p className="text-sm text-gray-900">{userData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
              <p className="text-sm text-gray-900">{userData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Nickname</p>
              <p className="text-sm text-gray-900">{userData.nickname}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
              <p className="text-sm text-gray-900">{userData.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">City, State</p>
              <p className="text-sm text-gray-900">{userData.city}, {userData.state}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Country</p>
              <p className="text-sm text-gray-900">{userData.country}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={() => setIsBlocked(true)}
            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Block
          </button>
          <button
            onClick={() => setIsBlocked(false)}
            className="flex-1 px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition-colors"
          >
            Unblock
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;