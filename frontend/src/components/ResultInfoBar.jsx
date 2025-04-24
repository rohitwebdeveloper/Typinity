import React from 'react'

const ResultInfoBar = ({wpm, timeCounterRef, input, accuracy, consistency}) => {
    return (
        <div className="flex justify-between bg-gray-800 w-full max-w-[800px] px-2 sm:px-4 rounded-md py-2 sm:py-3 mt-6 text-sm md:text-lg">
            <span>WPM: <strong className="text-blue-400">{wpm}</strong></span>
            <span>Time: <strong className="text-blue-400">{(timeCounterRef.current - 1)}s</strong></span>
            <span>Words: <strong className="text-blue-400">{input.trim().split(/\s+/).filter(Boolean).length}</strong></span>
            <span>Accuracy: <strong className="text-green-400">{accuracy}%</strong></span>
            <span>Consistency: <strong className="text-green-400">{consistency}%</strong></span>
        </div>
    )
}

export default ResultInfoBar;