import React from 'react'

const Stats = ({progressData}) => {
  return (
    <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl">
    <h2 className="text-xl font-semibold mb-4 text-white">Latest Stats</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#0f172a] rounded-xl p-4 text-center">
        <p className="text-gray-400">WPM</p>
        <h3 className="text-2xl text-cyan-400 font-bold">{progressData[progressData.length - 1]?.wpm}</h3>
      </div>
      <div className="bg-[#0f172a] rounded-xl p-4 text-center">
        <p className="text-gray-400">Accuracy</p>
        <h3 className="text-2xl text-emerald-400 font-bold">{progressData[progressData.length - 1]?.accuracy}%</h3>
      </div>
      <div className="bg-[#0f172a] rounded-xl p-4 text-center">
        <p className="text-gray-400">Consistency</p>
        <h3 className="text-2xl text-emerald-400 font-bold">{progressData[progressData.length - 1]?.consistency}%</h3>
      </div>
      <div className="bg-[#0f172a] rounded-xl p-4 text-center">
        <p className="text-gray-400">Sessions</p>
        <h3 className="text-2xl text-yellow-400 font-bold">{progressData.length}</h3>
      </div>
    </div>
  </div>
  )
}

export default Stats