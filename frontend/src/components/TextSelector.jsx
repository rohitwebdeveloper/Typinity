import React, { useState } from 'react';
import data from '@/app/data/data';


const TextSelector = ({ randomnum, selectedType, setSelectedType, settext }) => {

    const [wordCount, setWordCount] = useState(200);
    const [customText, setCustomText] = useState('');
    const [textToShow, setTextToShow] = useState('');
    const [custominputActive, setcustominputActive] = useState(false)
    const [selectedArray, setselectedArray] = useState(data[selectedType][randomnum])
    // let selectedArray = data.words[0];

    const handleSelect = (item) => {
        setSelectedType(item);
        switch (item) {
            case 'words':
                setselectedArray(data.words[randomnum]);
                break;
            case 'punctuations':
                setselectedArray(data.punctuations[randomnum])
                break;
            case 'mixed':
                setselectedArray(data.mixed[randomnum]);
                break;
            default:
                setselectedArray([]);
        }

        const combinedText = data[item][randomnum];
        // const combinedText = selectedArray.join(' ');
        const words = combinedText.split(' ').slice(0, wordCount);
        setTextToShow(words.join(' '));
        settext(words.join(' '));
    };

    const handleCustomText = () => {

        if (customText.trim()) {
            setTextToShow(customText);
            settext(customText)
            setcustominputActive(false)
        }
    };

    const handleCustom = () => {
        setcustominputActive(!custominputActive)
    }

    const handlesetWord = (e) => {
        setWordCount(Number(e.target.value))
        const words = data[selectedType][randomnum]?.split(' ').slice(0, e.target.value);
        setTextToShow(words.join(' '));
        settext(words.join(' '));
    }

    return (
        <div className=" bg-black text-white flex flex-col items-center p-4 gap-6 my-3 sm:my-0 ">
            <div className='flex justify-between flex-wrap sm:flex-nowrap gap-4'>
                <div className="bg-cyan-500 text-black font-semibold rounded-md py-1 sm:rounded-lg w-full  flex items-center justify-evenly  shadow-lg">
                    {['words', 'punctuations', 'mixed'].map((item) => (
                        <span
                            key={item}
                            className={`cursor-pointer transition capitalize duration-200 px-4 py-1 rounded-md text-sm hover:text-white ${selectedType === item ? ' underline text-white' : ''
                                }`}
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </span>
                    ))}
                    <span className={`cursor-pointer transition text-sm duration-200 px-4 py-1 rounded-md  hover:text-white   }`}
                        onClick={handleCustom}
                    >
                        Custom
                    </span>
                </div>

                <div className="flex gap-4 items-center w-full max-w-48">
                    <label className="text-cyan-300 text-sm font-medium">Words:</label>
                    <input
                        type="number"
                        className="bg-gray-800 text-white border text-sm border-cyan-500 px-3 py-[2px] sm:py-2 rounded-md w-24 outline-none"
                        value={wordCount}
                        onChange={handlesetWord}
                    />
                </div>
            </div>

            {custominputActive && (
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-3xl">
                    <input
                        type="text"
                        placeholder="Enter custom text"
                        className="flex-grow bg-gray-800 text-white border text-sm w-full border-cyan-500 px-4 py-[6px] sm:py-2 rounded-md outline-none"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                    />
                    <button
                        className="bg-cyan-600 text-sm hover:bg-cyan-700 min-w-fit text-white px-4 py-2 rounded-md transition"
                        onClick={handleCustomText}
                    >
                        Set Custom
                    </button>

                </div>
            )}

            {/* <div className="bg-gray-900 text-white border border-cyan-400 rounded-md p-6 w-full max-w-3xl min-h-[150px] text-lg leading-relaxed shadow-md">
        {textToShow || '⬆️ Select a category or add custom text to start typing...'}
      </div> */}
        </div>
    );
};

export default TextSelector;
