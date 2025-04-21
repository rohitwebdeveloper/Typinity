import React from 'react'

const Feedback = ({feedbackText}) => {
    return (
  <div className="max-w-[800px] w-full bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 my-9">

    <h2 className="text-2xl font-semibold text-cyan-400">AI-Powered Typing Feedback</h2>

    <div id="feedbackBox" className="bg-gray-700 p-5 w-full rounded-xl shadow-inner h-64 overflow-x-clip overflow-y-auto">
      <p className="text-gray-300" id="feedbackText w-full" >
        👋  {feedbackText}
      </p>
    </div>

  </div>


    )
}

export default Feedback