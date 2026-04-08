import React, { useEffect, useState } from 'react';

function App() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State for NEURAL_SYNCHRONIZATION
  const [newName, setNewName] = useState("");
  const [newImpact, setNewImpact] = useState("");
  const [newLevel, setNewLevel] = useState(0);

  // The endpoint of Authority
  const API_URL = process.env.REACT_APP_API_URL || "https://omega-protocol-server.onrender.com";

  const fetchManifest = () => {
    setLoading(true);
    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => {
        setEntities(data.entities || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("SIGNAL_LOST:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchManifest();
  }, []);

  // CREATE: NEURAL_SYNCHRONIZATION
  const handleSync = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/synchronize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, impact: newImpact, level: Number(newLevel) })
      });

      const result = await response.json();

      if (response.ok) {
        setNewName(""); setNewImpact(""); setNewLevel(0);
        fetchManifest(); // Refresh the manifest
        alert("NEURAL_SYNCHRONIZATION_COMPLETE");
      } else {
        // Validation Error Feedback
        alert(`SYNCHRONIZATION_REJECTED: ${result.message}`);
      }
    } catch (err) {
      alert("NETWORK_STABILITY_CRITICAL");
    }
  };

  // DELETE: THE PURGE PROTOCOL
  const handlePurge = async (id) => {
    if (window.confirm("CONFIRM_ENTITY_DE_SYNCHRONIZATION?")) {
      try {
        const response = await fetch(`${API_URL}/purge/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchManifest(); // Refresh UI
        }
      } catch (err) {
        alert("PURGE_SEQUENCE_FAILED");
      }
    }
  };

  const filteredEntities = entities.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', minHeight: '100vh', padding: '50px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #0f0', paddingBottom: '10px' }}>OMEGA_PROTOCOL: ENTITY_MANIFEST</h1>
      
      {/* NEURAL_UPLOADER FORM */}
      <div style={{ border: '1px dashed #0f0', padding: '20px', marginBottom: '30px', backgroundColor: '#050505' }}>
        <h3>NEURAL_SYNCHRONIZATION_INPUT</h3>
        <form onSubmit={handleSync}>
          <input type="text" placeholder="ENTITY_NAME" value={newName} onChange={e => setNewName(e.target.value)} style={inputStyle} required />
          <input type="text" placeholder="IMPACT_DESCRIPTION" value={newImpact} onChange={e => setNewImpact(e.target.value)} style={inputStyle} required />
          <input type="number" placeholder="LEVEL (0-100)" value={newLevel} onChange={e => setNewLevel(e.target.value)} style={inputStyle} required />
          <button type="submit" style={buttonStyle}>INITIATE_SYNC</button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <span>SEARCH_MANIFEST: </span>
        <input type="text" placeholder="FILTER_BY_NAME..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={inputStyle} />
      </div>

      {loading ? (
        <p>REPLICATING_DATA_STREAMS...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredEntities.length > 0 ? filteredEntities.map(entity => (
            <div key={entity._id} style={{ border: '1px solid #0f0', padding: '20px', backgroundColor: '#0a0a0a' }}>
              <h2 style={{ margin: '0 0 10px 0', textTransform: 'uppercase' }}>{entity.name}</h2>
              <p>IMPACT: {entity.impact}</p>
              <p>THREAT_LEVEL: {entity.level}%</p>
              <button 
                onClick={() => handlePurge(entity._id)} 
                style={purgeButtonStyle}>
                INITIATE_PURGE
              </button>
            </div>
          )) : <p>NO_MATCHING_ENTITIES_FOUND_IN_MANIFEST</p>}
        </div>
      )}
    </div>
  );
}

const inputStyle = { backgroundColor: '#000', color: '#0f0', border: '1px solid #0f0', padding: '10px', marginRight: '10px', marginBottom: '10px' };
const buttonStyle = { backgroundColor: '#0f0', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' };
const purgeButtonStyle = { color: '#f00', border: '1px solid #f00', background: 'none', cursor: 'pointer', marginTop: '15px', padding: '5px 10px' };

export default App;