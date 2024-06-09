import React from 'react'
import { useState } from 'react'

var data = require('./champ_data.json');

function SearchBar(props) {
    const [value, setValue] = useState("");
    const [lock, setLock] = useState(false);

    const onChange = (event) => {
        setValue(event.target.value);
    }
    const onSearch = (searchVal) => {
        setValue(searchVal);
    }
    const btnClick = () => {
        setLock(!lock);
        !lock ? props.champCall(value) : props.champCall("");
        !lock ? console.log(value) : console.log("");
    }

  return (
    lock ? <div className="lockIn">
        <p> {value} </p>
        <button onClick={btnClick} className="cancel"> Cancel</button>
         </div> :
    <div className="search-container">
        <div className="drop-down">
            {data.filter(item => {
                const searchItem = value.toLowerCase();
                const fullName = item.champName.toLowerCase();
                return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
            })
            .map((item)=> (<div onClick={()=>onSearch(item.champName)}className='drop-down-item' key={item.champName}>
                {item.champName }
                </div>))}
        </div>

    </div>
  )
}

export default SearchBar