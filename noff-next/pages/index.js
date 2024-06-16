import React, { useRef, useEffect, useState } from 'react';
import ManualApp from './manual'
import LiveApp from './live'
import { motion } from 'framer-motion'
import TeamFrame from './components/TeamFrame';


export default function Home() {

  const [isManualAppShifted, setIsManualAppShifted] = useState(false);

  const scrollToLiveApp = () => {
    const element = document.getElementById('liveApp');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManualApp = () => {
    const element = document.getElementById('manualApp');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const onScrollStop = callback => {
    let isScrolling;
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll',
        e => {
          clearTimeout(isScrolling);
          isScrolling = setTimeout(() => { callback(); }, 300);
        },
        false
      );
    }
  };

  onScrollStop(() => {
    console.log('The user has stopped scrolling');
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const scrollHeight = document.documentElement.scrollHeight; // Total height of the document
      const clientHeight = document.documentElement.clientHeight; // Height of the visible part of the document
      const scrollTop = document.documentElement.scrollTop; // Number of pixels the document is currently scrolled from the top
      console.log(scrollTop, clientHeight, scrollHeight)
      // Calculate the current scroll position as a percentage of the total scroll height
      const currentScrollPercentage = (scrollTop) / clientHeight;
      console.log(currentScrollPercentage)
      // Check if the current scroll position is below or above 50%
      if (currentScrollPercentage < 0.5) {
        scrollToLiveApp();
      } else {
        scrollToManualApp();
      }
    }
  });

  return (
    <div>
      <div id='liveApp' className='flex items-center justify-center flex-col text-left h-screen'>
        <div>
          <LiveApp />
        </div>
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToManualApp}
            className='mt-28 p-2 rounded gotobutton'
          >
            Go to Manual Input
          </motion.button>
      </div>

      <div id='manualApp' className={`manual-app ${isManualAppShifted ? 'shifted' : ''} flex items-center justify-center flex-col text-left h-screen`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToLiveApp}
          className='mb-10 mt-20 p-2 rounded gotobutton'
        >
          Go to Live Input
        </motion.button>
        <ManualApp setIsManualAppShifted={setIsManualAppShifted} />
      </div>

    </div>
  );

}