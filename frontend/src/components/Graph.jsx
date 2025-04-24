import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const Graph = ({chartData, wpm}) => {
  return (
    <div className="w-full max-w-4xl mt-6">
            <h2 className="text-lg sm:text-xl mb-2 text-cyan-400">Words over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} style={{fontSize:'14px'}}>
                <XAxis dataKey="time" stroke="#ccc" label={{ value: 'Time (sec)', position: 'insideBottom', dy: 10, fontSize:'14px' }} />
                <YAxis dataKey="words" stroke="#ccc" label={{ value: 'Words Typed', angle: -90, position: 'insideLeft', fontSize:'14px' }} />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", fontSize:'14px' }} />
                <Line type="monotone" dataKey="words" stroke="#22d3ee" strokeWidth={2} dot />
                <ReferenceLine
                  y={wpm}
                  stroke="white"
                  strokeDasharray="5 5"
                  label={{
                    value: `Avg WPM: ${wpm.toFixed(1)}`,
                    position: "top",
                    fill: "#fff",
                    fontSize: 12,
                  }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  )
}

export default Graph