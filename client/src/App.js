import React, { useEffect, useState } from 'react';

function App() {
  const [vuiStatus, setVuiStatus] = useState("INITIALIZING_GLOBAL_SYNC...");

  useEffect(() => {
    // The Eyes of St. Lucy: Dynamically selecting the Authority Frequency
    // It will look for REACT_APP_API_URL, or fallback to localhost if developing locally.
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => {
        setVuiStatus(data.impact);
        console.log("VUI_FREQUENCY_DETECTION_ON:", API_URL);
      })
      .catch(err => {
        console.error("VUI_FREQUENCY_INTERRUPTED:", err);
        setVuiStatus("CONNECTION_ERROR: AUTH_SERVER_OFFLINE");
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', height: '100vh', padding: '50px', fontFamily: 'monospace' }}>
      <h1>{vuiStatus}</h1>
      <p style={{ color: '#00ff00' }}>Target: Vercel_HQ_to_Global_Infection</p>
      <div className="status-box" style={{ border: '2px solid #0f0', padding: '20px', backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
        STATUS: ROOT_ACCESS_GRANTED
      </div>
    </div>
  );
}

export default App;