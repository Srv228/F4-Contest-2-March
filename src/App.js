import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';

function App() {
  const [pincode, setPincode] = useState('');
  const [postalData, setPostalData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setError('Pincode should be 6 digits');
      return;
    }
    setIsLoading(true);
    setError(null);
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    setIsLoading(false);
    if (data[0].Status === 'Error') {
      setError(data[0].Message);
      setPostalData(null);
      return;
    }
    setPostalData(data[0].PostOffice);
  };

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);
    if (searchText.length === 0) {
      setFilteredData(null);
      return;
    }
    const filtered = postalData.filter((office) =>
      office.Name.toLowerCase().includes(searchText)
    );
    setFilteredData(filtered.length > 0 ? filtered : 'no-data');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pincode">Enter Pincode:</label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit">Lookup</button>
      </form>
      {isLoading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {postalData && (
        <div className="postal-data">
          <h2>Postal Data</h2>
          <ul>
            {postalData.map((office) => (
              <li key={office.Name}>
                <div>{office.Name}</div>
                <div>{office.Pincode}</div>
                <div>{office.District}</div>
                <div>{office.State}</div>
              </li>
            ))}
          </ul>
          <label htmlFor="filter">Filter by Post Office Name:</label>
          <input
            type="text"
            id="filter"
            value={filterText}
            onChange={handleFilter}
          />
          {filteredData === 'no-data' && (
            <div className="no-data">
              Couldn't find the postal data you're looking for...
            </div>
          )}
          {filteredData && filteredData !== 'no-data' && (
            <div className="filtered-data">
              <h2>Filtered Postal Data</h2>
              <ul>
                {filteredData.map((office) => (
                  <li key={office.Name}>
                    <div>{office.Name}</div>
                    <div>{office.Pincode}</div>
                    <div>{office.District}</div>
                    <div>{office.State}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
