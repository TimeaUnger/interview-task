import { useState } from 'react';

const HelpModal = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => setIsOpen(!isOpen);
  const closeHelp = () => setIsOpen(false);

  return (
    <div className="relative z-10">
      <button
        onClick={toggleHelp}
        className="bg-teal-600 text-white px-3 py-1.5 rounded-md text-xs transition hover:bg-teal-800 focus:outline-none cursor-pointer"
      >
        Show Help
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-white/50 backdrop-blur-[1px] z-40 cursor-pointer"
            onClick={closeHelp}
          />
          <div
            className={`
              fixed 
              top-1/2 
              left-1/2 
              transform 
              -translate-x-1/2 
              -translate-y-1/2 
              bg-white 
              p-0 pt-3 px-3 pb-3
              rounded-lg 
              shadow-xl 
              max-w-md 
              w-full 
              z-50 
              transition-transform 
              duration-300 
              border 
              border-gray-300
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-base font-semibold text-center flex-grow">
                How to Use
              </div>
              <button
                className="text-gray-700 text-2xl hover:text-blue-700 cursor-pointer -mt-1"
                onClick={closeHelp}
              >
                ×
              </button>
            </div>

            <div className="border-b border-gray-300 mb-3"></div>
            <div className="text-sm text-gray-700 leading-tight">
              <p>
                Navigate between comments using the
                <span className="font-bold text-teal-600 mx-1">Next</span> and
                <span className="font-bold text-teal-600 mx-1">Previous</span> buttons.
                Each page shows 5 comments and a corresponding word count chart.
              </p>
              <p className="mt-4">
                The chart displays the number of words in the current comments on the page.
              </p>
              <p className="mt-4">
                By hovering over the bars, you can see the exact word count for each comment.
              </p>
            </div>


          </div>
        </>
      )}
    </div>
  );
};

export default HelpModal;
