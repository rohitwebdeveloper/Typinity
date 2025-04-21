import React from 'react'

const UserInfoCard = ({user}) => {
    return (
      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl text-white">
  <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Profile</h2>

  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-gray-400">Username</span>
      <span className="font-semibold text-lg">{user?.name}</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-400">Email</span>
      <span className="font-semibold text-lg">{user?.email}</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-400">Joined</span>
      <span className="font-semibold text-lg">{new Date(user?.joinedAt).toLocaleDateString()}</span>
    </div>
  </div>
</div>

    )
}

export default UserInfoCard