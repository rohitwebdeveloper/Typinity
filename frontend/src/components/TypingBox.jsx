import React, { useRef } from 'react'

const TypingBox = ({ text, handleChange, input }) => {

  const textareaRef = useRef()
  const overlayRef = useRef()

  const handleScroll = (e) => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = overlayRef.current.scrollHeight;
    }
  }

  return (
    <div onClick={() => textareaRef?.current?.focus()} className="relative w-fit mx-auto mt-4">
      <div ref={overlayRef} className="absolute p-3 text-xl max-w-[800px] whitespace-pre-wrap break-words break-keep font-mono overflow-y-auto max-h-[212px]">
        <div>
          {text.split('').map((char, idx) => {
            let color = "text-gray-500";
            if (idx < input.length) {
              color = input[idx] === char ? "text-white" : "text-red-500";
            }
            let isCursor = idx === input.length;
            return (
              <span key={idx} className={`${color} ${isCursor ? 'underline' : ''}`}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        onScroll={handleScroll}
        className="w-[800px] py-3 pl-3 pr-6 text-xl overflow-hidden font-mono text-transparent rounded-lg bg-black border border-gray-500 focus:ring-2 focus:ring-cyan-600"
        value={input}
        onChange={handleChange}
        rows="7"
        style={{ resize: "none", whiteSpace: "pre-wrap" }}
      />
    </div>
  )
}

export default TypingBox