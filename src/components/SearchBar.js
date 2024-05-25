import React from 'react'
import { useState } from 'react'
var data = require('./SearchData.json');
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
        <div className="search-input">
            <input type="text" value={value} onChange={onChange}/>
            <button onClick={btnClick}> Lock in</button>
        </div>
        <div className="drop-down">
            {data.filter(item => {
                const searchItem = value.toLowerCase();
                const fullName = item.hi.toLowerCase();
                return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
            })
            .map((item)=> (<div onClick={()=>onSearch(item.hi)}className='drop-down-item' key={item.hi}> 
                {item.hi}
                </div>))}
        </div>

    </div>
  )
}

export default SearchBar