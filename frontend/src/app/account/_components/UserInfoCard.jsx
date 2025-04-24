import React from 'react'

const UserInfoCard = ({ user, userdetails }) => {
  const data = user || userdetails;
  return (
    <div className="bg-[#1e293b] rounded-2xl p-3 sm:5 md:p-6 shadow-xl text-white">
      <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold mb-6 border-b border-gray-700 pb-2">Profile</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Username</span>
          <span className="sm:font-semibold text-base sm:text-lg">{data?.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 ">Email</span>
          <span className="sm:font-semibold text-base break-words whitespace-normal sm:text-lg text-right max-w-[60%]">{data?.email}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Joined</span>
          <span className="sm:font-semibold text-base sm:text-lg">{new Date(data?.joinedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>

  )
}

export default UserInfoCard