'use client';
import { useState, useEffect, useRef } from "react";
import TextSelector from "@/components/TextSelector";
import { useRouter } from "next/navigation";
import Graph from "@/components/Graph";
import ResultInfoBar from "@/components/ResultInfoBar";
import TypingBox from "@/components/TypingBox";
import Feedback from "@/components/Feedback";
import axiosInstance from "@/utils/AxiosInstance";
import { toastSuccess, toastError } from "@/utils/toast";
import { useSelector } from "react-redux";
import axios from "axios";
import data from "./data/data";

export default function Home() {
  const [text, settext] = useState(data.words[0]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [consistency, setconsistency] = useState(0)
  const inputRef = useRef('');
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const timeCounterRef = useRef(1); // start from 1 second
  const auth = useSelector((state) => state.auth.value)
  const router = useRouter();
  const [isFeedback, setisFeedback] = useState(false)
  const [feedbackText, setfeedbackText] = useState('')
  const feedbackintervalRef = useRef(null)
  const [selectedType, setSelectedType] = useState('words');
  const [randomnum, setrandomnum] = useState(0)
  // const [feedbackResponse, setfeedbackResponse] = useState('')
  let correctCharaters;
  let errorCharactors;


  const random = () => Math.floor(Math.random() * 4);



  const handleChange = (e) => {
    const value = e.target.value;

    // Start tracking when typing begins
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      startTimeRef.current = new Date();

      intervalRef.current = setInterval(() => {
        const elapsedSec = timeCounterRef.current;
        // const timetaken = (new Date() - elapsedSec) / 60000;
        const totalWords = inputRef.current.trim().split(/\s+/).filter(Boolean).length;
        const currentWpm = Math.round(totalWords / (elapsedSec / 60))

        setChartData(prev => [...prev, { time: elapsedSec, words: currentWpm }]);
        timeCounterRef.current += 1;
      }, 1000);
    }

    setInput(value);
    inputRef.current = value;
  };


  const calculateConsistency = (data) => {
    const wordSpeeds = data.map(entry => entry.words);

    //  Calculate mean (average) words per time unit
    const mean = wordSpeeds.reduce((sum, val) => sum + val, 0) / wordSpeeds.length;

    // Calculate standard deviation
    const variance = wordSpeeds.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wordSpeeds.length;
    const stdDeviation = Math.sqrt(variance);
    // Calculate consistency
    const maxAllowedStdDev = 20;
    const consistency = Math.max(0, Math.round(100 - (stdDeviation / maxAllowedStdDev) * 100));

    return consistency

  }


  useEffect(() => {
    if (input.length >= text.length) {
      clearInterval(intervalRef.current);
      console.log(chartData)
      setIsTyping(false);

      const totalTimeSec = (new Date() - startTimeRef.current) / 1000;
      const totalWords = input.trim().split(/\s+/).filter(Boolean).length;
      // Final accuracy
      const correctChars = input.split('').filter((char, i) => char === text[i]).length;
      setAccuracy(Math.round((correctChars / text.length) * 100));
      setWpm(Math.round((totalWords / totalTimeSec) * 60));
      const consistencyVal = calculateConsistency(chartData)
      setconsistency(consistencyVal)
      const textarray = text.split('')
      const inputarray = input.split('')
      correctCharaters = textarray.filter((char, i) => char === inputarray[i]).length;
      errorCharactors = inputarray.filter((char, i) => char !== textarray[i]).length;
    }
  }, [input]);



  const saveProgress = async () => {

    try {
      const response = await axiosInstance.post('/api/typing/save', { wpm, accuracy, consistency }, { withCredentials: true });
      console.log(response);

      if (response.status === 200) {
        toastSuccess('Progress Saved')
        router.push('/');
      }
    } catch (error) {
      toastError(error?.response?.data?.message || 'Something went wrong!');
    }
  };


  const getAiFeedback = async () => {
    try {
      const response = await axiosInstance.post('/api/typing/feedback', { wpm, accuracy, consistency, correctCharaters, errorCharactors })
      console.log(response)
      if (response.status === 200) {
        const feedbackResponse = response.data.feedback.candidates[0].content.parts[0].text

        if (feedbackintervalRef.current) {
          clearInterval(feedbackintervalRef)
        }
        setisFeedback(true)
        setfeedbackText('')
        const words = feedbackResponse.split(' ');
        let index = 0;
        feedbackintervalRef.current = setInterval(() => {
          if (index < words.length) {
            setfeedbackText((preval) => preval + words[index] + ' ')
            index++;
          } else {
            clearInterval(feedbackintervalRef.current)
          }
        }, 100);
      }

    } catch (error) {
      toastError(error?.response?.data?.message)
    }
  }


  const refreshClick = () => {
    let rannum = random();
    // console.log('refresh random :', rannum)
    setrandomnum(rannum)
    settext(data[selectedType][rannum])
    setInput("")
    setAccuracy(0)
    setIsTyping(false)
    setconsistency(0)
    setWpm(0)
    setChartData([])
    inputRef.current = ''
    startTimeRef.current = null
    intervalRef.current = null
    timeCounterRef.current = 1
    setisFeedback(false)
    setfeedbackText('')
    feedbackintervalRef.current = null
    correctCharaters = 0
    errorCharactors = 0
  }


  return (
    <div className="flex flex-col items-center justify-center  bg-black px-3 sm:px-6 text-white">

      {!input.length || isTyping ? (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl mt-10 sm:mt-8 font-semibold text-cyan-400 mb-2 sm:mb-4">Typinity - Speed meets precision</h1>

          {/* Text selector to change text to type */}
          <TextSelector randomnum={randomnum} selectedType={selectedType} setSelectedType={setSelectedType} settext={settext} refreshClick={refreshClick} />

          {/* Typing Box with text area */}
          <TypingBox text={text} handleChange={handleChange} input={input} />
          <button className="hover:underline" onClick={refreshClick} >Refresh </button>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center">

            {/* Typing Result Information Bar */}
            <ResultInfoBar wpm={wpm} consistency={consistency} timeCounterRef={timeCounterRef} accuracy={accuracy} input={input} />

            {/* Typing result Graph */}
            <Graph chartData={chartData} wpm={wpm} />

          </div>

          {/* Button to get feedback from ai  */}
          {!isFeedback && <button onClick={getAiFeedback} className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white sm:font-medium px-4 sm:px-6 mt-8 py-2 sm:py-3 rounded-xl shadow-md hover:shadow-lg">
            🔍 Get AI Feedback
          </button>}

          {/* Feedback box */}
          {isFeedback && <Feedback feedbackText={feedbackText} />}
          <button className="hover:underline text-lg hover:text-cyan-400 mt-3 sm:mt-5 underline" onClick={refreshClick} >Restart </button>
          {/* Save and Sign-in Button */}
          <div className="my-5 md:my-8 flex gap-8">
            {auth ? (
              <button onClick={saveProgress} className="px-3 py-1 rounded-md text-base sm:text-lg text-black font-semibold hover:bg-cyan-600  bg-cyan-500">Save Progress</button>
            ) : (
              <div onClick={() => router.push('/sign-in')} className="font-semibold underline text-base sm:text-lg hover:text-cyan-600">Sign-in to save progress.</div>
            )}

          </div>
        </>
      )}
    </div>
  );
}
