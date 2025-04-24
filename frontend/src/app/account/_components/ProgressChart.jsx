import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ProgressChart = ({progressData}) => {
  return (
    <div className="mt-6 w-full h-[200px] h-200 sm:h-[250px] md:h-[300px] lg:h-[400px] sm:mt-10 bg-[#1e293b]  pb-14 sm:pb-14 md:pd-20 p-2 sm:p-3 md:p-6 rounded-lg sm:rounded-2xl shadow-xl">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Progress Over Time</h2>
          <ResponsiveContainer width="100%" height='100%'>
            <LineChart data={progressData} style={{fontSize:'12px'}}>
              <XAxis dataKey="date" stroke="#94a3b8" label={{ value: 'Sessions', position: 'insideBottom', dy: 10 }} />
              <YAxis stroke="#94a3b8" label={{ value: "WPM / Acc / Cons", angle: -90, position: 'insideLeft', dy:40, fontSize:'14px' }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "#ffffff", fontSize:'14px' }} labelStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="wpm" stroke="#22d3ee" strokeWidth={2} dot />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot />
              <Line type="monotone" dataKey="consistency" stroke="#facc15" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
  )
}

export default ProgressChart