import React, { useRef, useEffect } from 'react'

const TypingBox = ({ text, handleChange, input }) => {

  const textareaRef = useRef()
  const overlayRef = useRef()


  useEffect(() => {
    if (overlayRef.current && textareaRef.current) {

      let charsinline = 26
      if (window.innerWidth >= 1024) {
        charsinline = 70
      } else if (window.innerWidth >= 768) {
        charsinline = 53
      } else if (window.innerWidth >= 640) {
        charsinline = 44
      }

      const textarea = textareaRef.current
      const lineHeight = 24
      const midLine = 3
      const currentLine = Math.floor(input.length / charsinline)
      const scrollTo = (currentLine - midLine) * lineHeight
      if (scrollTo > 0) {
        overlayRef.current.scrollTop = scrollTo
      } else {
        overlayRef.current.scrollTop = 0
      }
    }
  }, [input])



  return (
    <div onClick={() => textareaRef?.current?.focus()} className="relative w-fit mx-auto mt-8 sm:mt-4">
      <div ref={overlayRef} className="absolute p-3 text-lg sm:text-xl max-w-[320px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] whitespace-pre-wrap font-mono overflow-y-auto max-h-[212px] leading-6">
        <div className="flex flex-wrap">
          {(() => {
            const spans = [];
            let currentWord = [];
            for (let idx = 0; idx < text.length; idx++) {
              const char = text[idx];
              let color = "text-gray-500";
              if (idx < input.length) {
                color = input[idx] === char ? "text-white" : "text-red-500";
              }
              const isCursor = idx === input.length;

              const charSpan = (
                <span key={idx} className={`${color} ${isCursor ? 'underline' : ''}`}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );

              currentWord.push(charSpan);

              // If current char is space or last char, push current word block
              if (char === ' ' || idx === text.length - 1) {
                spans.push(
                  <span key={`word-${idx}`} className="whitespace-nowrap mr-[2px]">
                    {currentWord}
                  </span>
                );
                currentWord = [];
              }
            }
            return spans;
          })()}
        </div>
      </div>


      <textarea
        ref={textareaRef}
        className=" w-[320px] sm:w-[600px] md:w-[700px] lg:w-[900px] py-3 pl-3 pr-6 text-lg sm:text-xl overflow-hidden font-mono text-transparent rounded-lg bg-black border border-gray-500 focus:ring-2 focus:ring-cyan-600"
        value={input}
        onChange={handleChange}
        rows="7"
        style={{ resize: "none", whiteSpace: "pre-wrap" }}
      />
    </div>
  )
}

export default TypingBox