// import React from 'react'
// import axios from 'axios'

// function ProfileLookUp({ label, name, value }) {
//   const handleChange = (e) => {
//     const searchValue = e.target.value;
//     const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
//     const filtered = history.filter(item => {
//       const s = searchValue.toLowerCase();
//       const t = item.toLowerCase();
//       return s && t.startsWith(s) && s !== t;
//     });
//     setFilteredHistory(filtered);
//   }
//   return (
//     // A container that contains the input field and drop-down.
//     <div className="search-container mb-5">
//       <label htmlFor={name} className="mr-3">{label}</label>
//       <input
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         type="text"
//         id={name}
//         name={name}
//         value={value}
//         // Typing into the input field will call handleSearch.
//         // When the handleSearch is called the event object's target will be this input element.
//         onChange={handleChange}
//         onSelect={handleSelect}
//         onBlur={handleBlur}
//         required
//         className="p-1 border rounded"
//       />
//       {filteredHistory.length > 0 && (
//         <div className="drop-down">
//           {/* filteredHistory array is mapped over and a div is created for each item. */}
//           {filteredHistory.map((item) => (
//             <motion.span
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onMouseDown={() => handleClick(item)}
//               className="border rounded p-1 m-3"
//               key={item}
//             >
//               {/* Content of the div will be past searched Riot ID. */}
//               {item}
//             </motion.span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileLookUp