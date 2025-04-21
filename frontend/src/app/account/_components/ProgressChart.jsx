import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProgressChart = ({progressData}) => {
  return (
    <div className="mt-10 bg-[#1e293b] p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <XAxis dataKey="date" stroke="#94a3b8" label={{ value: 'Sessions', position: 'insideBottom', dy: 10 }} />
              <YAxis stroke="#94a3b8" label={{ value: "WPM / Accuracy / Consistency", angle: -90, position: 'insideLeft', dy:100 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "#ffffff" }} labelStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="wpm" stroke="#22d3ee" strokeWidth={2} dot />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot />
              <Line type="monotone" dataKey="consistency" stroke="#facc15" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
  )
}

export default ProgressChart