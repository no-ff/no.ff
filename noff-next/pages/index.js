
import React, { useRef, useEffect, useState } from 'react';
import ManualApp from './manual'
import LiveApp from './live'
import { motion } from 'framer-motion'
export default function Home() {
  const scrollToLiveApp = () => {
    document.getElementById("liveApp").scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManualApp = () => {
    document.getElementById("manualApp").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
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
