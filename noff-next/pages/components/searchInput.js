import React, { useState } from 'react';
import data from '../champ_data.json';

const SearchInput = ({ label, name, value, onChange }) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    onChange(e);

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
    <div className="search-container">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleSearch}
        required
      />
      {filteredData.length > 0 && (
        <div className="drop-down">
          {filteredData.map((item) => (
            <div
              onClick={() => handleSelect(item)}
              className='drop-down-item'
              key={item.champName}
            >
              {item.champName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
