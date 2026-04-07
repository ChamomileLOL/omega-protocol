import React, { useEffect, useState } from 'react';

function App() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // The Eyes of St. Lucy: Dynamically selecting the Authority Frequency
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => {
        // Checking if data.entities exists, otherwise fallback to the old impact string
        setEntities(data.entities || [{ id: 0, name: "Legacy_Signal", impact: data.impact, level: "???" }]);
        setLoading(false);
        console.log("VUI_FREQUENCY_DETECTION_ON:", API_URL);
      })
      .catch(err => {
        console.error("VUI_FREQUENCY_INTERRUPTED:", err);
        setLoading(false);
      });
  }, []);

  // Searching logic: Filter the entities based on input
  const filteredEntities = entities.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', minHeight: '100vh', padding: '50px', fontFamily: 'monospace' }}>
      <header style={{ borderBottom: '2px solid #0f0', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ margin: 0 }}>OMEGA_PROTOCOL: ENTITY_MANIFEST</h1>
        <p>Target: Vercel_HQ_to_Global_Infection | STATUS: ROOT_ACCESS_GRANTED</p>
      </header>

      <div style={{ marginBottom: '20px' }}>
        <span>SEARCH_ENTITY: </span>
        <input 
          type="text" 
          placeholder="Enter Entity Name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ backgroundColor: '#000', color: '#0f0', border: '1px solid #0f0', padding: '5px' }}
        />
      </div>

      {loading ? (
        <p>SCANNING_FREQUENCIES...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredEntities.length > 0 ? filteredEntities.map(entity => (
            <div key={entity.id} style={{ border: '1px solid #0f0', padding: '20px', backgroundColor: 'rgba(0, 255, 0, 0.05)' }}>
              <h2 style={{ margin: '0 0 10px 0', textTransform: 'uppercase' }}>{entity.name}</h2>
              <p>IMPACT: {entity.impact}</p>
              <p style={{ fontSize: '0.8em' }}>THREAT_LEVEL: {entity.level}%</p>
            </div>
          )) : (
            <p>NO_MATCHING_ENTITY_FOUND_IN_MANIFEST</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;