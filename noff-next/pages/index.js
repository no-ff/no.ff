
import React, { useRef, useEffect, useState } from 'react';
import ManualApp from './manual'
import LiveApp from './live'
import { motion } from 'framer-motion'
export default function Home() {

  

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
          document.getElementById("liveApp").scrollIntoView({ behavior: "smooth" });
      } else {
          // Scroll to the element with ID "manualApp" smoothly
          document.getElementById("manualApp").scrollIntoView({ behavior: "smooth" });
      }
    }
  }); 

// Set an interval to check the scroll position every 150 milliseconds



  const scrollToLiveApp = () => {
    document.getElementById("liveApp").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManualApp = () => {
    document.getElementById("manualApp").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div >
      <div id="liveApp" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <LiveApp />
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToManualApp} style={{ marginTop: '100px' }}>
          Go to Manual Input
        </motion.button>
      </div>

      <div id="manualApp" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToLiveApp} style={{ marginBottom: '100px' }}>
          Go to Live Input
        </motion.button>
        <ManualApp/>
      </div>
    </div>
  );
  
}
