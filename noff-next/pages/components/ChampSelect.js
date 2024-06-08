import React from 'react';
import Champ from './Champ';
import { color, motion } from 'framer-motion';

function ChampSelect({ filteredData, selectedItemIndex, handleSelect}) {

  // For champion selection 
  function getClassName(item) {
    let className = 'box-item';
    if (item.champName === filteredData[selectedItemIndex]?.champName) {
      className += ' selected';
    }
    return className;
  }

  return (
    <div className="box">
      {filteredData.map((item) => (
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSelect(item)}
          className={getClassName(item)}
          key={item.champName}
        >
          <Champ name={item.champName} />
        </motion.div>
      ))}
    </div>
  );
}

export default ChampSelect;