import React from 'react';

const WelcomePage = ({ handleGetStarted }) => {
  return (
    <div className="min-h-screen bg-black text-white p-5 sm:p-7 md:p-10 max-w-[700px] w-full flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-cyan-500 animate-pulse drop-shadow-lg">Welcome to Typinity</h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-300">An AI-powered typing application designed to boost your typing skills with real-time feedback and detailed progress tracking. Improve your accuracy, speed, and consistency effortlessly.</p>
        <button onClick={handleGetStarted} className="mt-6 sm:mt-8 md:mt-12 px-4 sm:px-6 md:px-8 py-1 sm:py-2 md:py-3 bg-cyan-500 text-sm sm:text-sm md:text-base text-black sm:font-semibold  rounded-full shadow-lg  hover:shadow-xl hover:scale-105 transition-all">Get Started</button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-black border border-cyan-500 p-2 sm:p-5 md:p-8 w-full rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className=" text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-500 mb-2">Real-Time Feedback</h2>
          <p className="text-sm sm:text-base text-gray-300">Utilizes Gemini AI to track WPM, accuracy, speed, and consistency as you type.</p>
        </div>

        <div className="bg-black border border-cyan-500 p-2 sm:p-5 md:p-8 w-full rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-500 mb-2">Multiple Typing Modes</h2>
          <p className="text-sm sm:text-base text-gray-300">Choose from various typing challenges to target different aspects of your typing skills.</p>
        </div>

        <div className="bg-black border border-cyan-500 p-2 sm:p-5 md:p-8  w-ful rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-500 mb-2">Interactive Analytics</h2>
          <p className="text-sm sm:text-base text-gray-300">Visualize your typing progress through dynamic charts and insightful metrics.</p>
        </div>

        <div className="bg-black border border-cyan-500 p-2 sm:p-5 md:p-8 w-full rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-500 mb-2">Personalized Tests</h2>
          <p className="text-sm sm:text-base text-gray-300">Customize your practice sessions with personalized typing tests.</p>
        </div>
      </div>

    </div>
  );
};

export default WelcomePage;
