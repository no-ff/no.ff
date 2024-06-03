
import ManualApp from './manual'
import LiveApp from './live'
import { motion } from 'framer-motion'
export default function Home() {
  return (
    <>
      <ManualApp
      />


      <LiveApp
      />
      <motion.button
      whileHover={{scale:1.1}}
      whileTap={{ scale:0.9 }}
      >
        look
      </motion.button>
    </>
  );
}
