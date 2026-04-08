import React, { useEffect, useState } from 'react';

function App() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State for NEURAL_SYNCHRONIZATION
  const [newName, setNewName] = useState("");
  const [newImpact, setNewImpact] = useState("");
  const [newLevel, setNewLevel] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || "https://omega-protocol-server.onrender.com";

  const fetchManifest = () => {
    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => {
        setEntities(data.entities || []);
        setLoading(false);
      })
      .catch(err => console.error("SIGNAL_LOST:", err));
  };

  useEffect(() => {
    fetchManifest();
  }, []);

  const handleSync = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/synchronize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, impact: newImpact, level: newLevel })
    });

    if (response.ok) {
      setNewName(""); setNewImpact(""); setNewLevel(0);
      fetchManifest(); // Refresh the manifest
      alert("NEURAL_SYNCHRONIZATION_COMPLETE");
    }
  };

  const filteredEntities = entities.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', minHeight: '100vh', padding: '50px', fontFamily: 'monospace' }}>
      <h1>OMEGA_PROTOCOL: ENTITY_MANIFEST</h1>
      
      {/* NEURAL_UPLOADER FORM */}
      <div style={{ border: '1px dashed #0f0', padding: '20px', marginBottom: '30px' }}>
        <h3>NEURAL_SYNCHRONIZATION_INPUT</h3>
        <form onSubmit={handleSync}>
          <input type="text" placeholder="ENTITY_NAME" value={newName} onChange={e => setNewName(e.target.value)} style={inputStyle} required />
          <input type="text" placeholder="IMPACT_DESCRIPTION" value={newImpact} onChange={e => setNewImpact(e.target.value)} style={inputStyle} required />
          <input type="number" placeholder="LEVEL" value={newLevel} onChange={e => setNewLevel(e.target.value)} style={inputStyle} required />
          <button type="submit" style={{ backgroundColor: '#0f0', color: '#000', border: 'none', padding: '10px', cursor: 'pointer' }}>INITIATE_SYNC</button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <span>SEARCH_ENTITY: </span>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredEntities.map(entity => (
          <div key={entity._id} style={{ border: '1px solid #0f0', padding: '20px' }}>
            <h2>{entity.name}</h2>
            <p>IMPACT: {entity.impact}</p>
            <p>LEVEL: {entity.level}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { backgroundColor: '#000', color: '#0f0', border: '1px solid #0f0', padding: '10px', marginRight: '10px' };

export default App;