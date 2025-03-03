import React, { useState } from 'react';
import '@/styles/help-section.css';

const HelpSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };

  const closeHelp = () => {
    setIsOpen(false);
  };

  return (
    <div className="help-section">
      <button onClick={toggleHelp}>Show Help</button>

      {isOpen && <div className="backdrop" onClick={closeHelp} />}

      <div className={`help-content ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeHelp}>X</button>

        <div className='how-to-title'>How to Use</div>
        <div className='how-to-content'>
          Navigate between comments using the "Next" and "Previous" buttons.
          Each page shows 5 comments and a corresponding word count chart.
          The chart shows the number of words in the current comments on the page.
          By hovering over the bars, you can see the exact word count for each comment.
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
