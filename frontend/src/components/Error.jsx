import React from 'react';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-8 text-gray-400 text-center max-w-md">
        Something went wrong. The page you're looking for doesn't exist or an unexpected error occurred.
      </p>
      <button
        onClick={handleHomeRedirect}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;
