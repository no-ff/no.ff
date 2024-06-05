import React, { useState } from 'react';
import Champ from './Champ';
var data = require('./champ_data.json');
const ManualSearchInput = ({ label, name, value, onChange }) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    onChange(e); // Call onChange that was passed in.
    const filtered = data.filter(item => {
      const searchItem = searchValue.toLowerCase();
      const fullName = item.champName.toLowerCase();
      return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
    });
    setFilteredData(filtered);
  };

  const handleSelect = (item) => {
    onChange({ target: { name, value: item.champName } });
    setFilteredData([]);
  };

  return (
    // A container that contains the input field and drop-down.
    <div className="search-container mb-4">
      <label htmlFor={name} className="mr-1">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        // Typing into the input field will call handleSearch.
        // When the handleSearch is called the event object's target will be this input element.
        onChange={handleSearch}
        required
        className="p-1 border rounded"
      />
      {filteredData.length > 0 && (
        <div className="drop-down">
          {/* filteredData array is mapped over and each a div is created for each item. */}
          {filteredData.map((item) => (
            <div
              onClick={() => handleSelect(item)}
              className='drop-down-item'
              key={item.champName}
            >
              {/* Content of the div will be champion name. */}
              <Champ name={item.champName}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualSearchInput;
