import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="w-[60px] p-2 aspect-square rounded-full bg-cyan-400 animate-spin"
        style={{
          '--_m': 'conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box',
          WebkitMask: 'var(--_m)',
          mask: 'var(--_m)',
          WebkitMaskComposite: 'source-out',
          maskComposite: 'subtract',
        }}
      ></div>
    </div>
  );
};

export default Loader;
