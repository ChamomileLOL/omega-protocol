import React, { useEffect, useState } from 'react';

function App() {
  const [vuiStatus, setVuiStatus] = useState("INITIALIZING_GLOBAL_SYNC...");

  useEffect(() => {
    // The Eyes of St. Lucy: Connecting to the VUI Frequency
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => {
        setVuiStatus(data.impact);
        console.log("VUI_FREQUENCY_DETECTION:", data);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', height: '100vh', padding: '50px' }}>
      <h1>{vuiStatus}</h1>
      <p>Target: Vercel_HQ_to_Global_Infection</p>
      <div className="status-box" style={{ border: '1px solid #0f0', padding: '20px' }}>
        STATUS: ROOT_ACCESS_GRANTED
      </div>
    </div>
  );
}

export default App;