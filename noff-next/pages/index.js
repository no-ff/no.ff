import React, { useRef, useEffect, useState } from 'react';
import ManualApp from './manual'
import LiveApp from './live'
import { motion } from 'framer-motion'
import TeamFrame from './components/TeamFrame';


export default function Home() {
  
  const [isManualAppShifted, setIsManualAppShifted] = useState(false);

  const scrollToLiveApp = () => {
    document.getElementById("liveApp").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManualApp = () => {
    document.getElementById("manualApp").scrollIntoView({ behavior: "smooth" });
  };

  const onScrollStop = callback => {
    let isScrolling;
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll',
        e => {
          clearTimeout(isScrolling);
          isScrolling = setTimeout(() => {callback();}, 300);
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
          // Scroll to the element with ID "liveApp" smoothly
          scrollToLiveApp();
      } else {
          // Scroll to the element with ID "manualApp" smoothly
          scrollToManualApp();
      }
    }
  });

  return (
    <div>
      <TeamFrame />
      <div id="liveApp" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <LiveApp />
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToManualApp} style={{ marginTop: '100px' }} className="gotobutton">
          Go to Manual Input
        </motion.button>
      </div>

      <div id="manualApp" className={`manual-app ${isManualAppShifted ? 'shifted' : ''}`} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToLiveApp} style={{ marginBottom: '100px'}} className="gotobutton">
          Go to Live Input
        </motion.button>
        <ManualApp setIsManualAppShifted={setIsManualAppShifted} />
      </div>
      
    </div>
  );

}