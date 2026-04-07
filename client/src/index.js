const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows the Vercel Vision to talk to the Render Authority

const ENTITIES = [
  { id: 1, name: "Valac", impact: "GLOBAL_CATASTROPHE_INITIALIZED", level: 99 },
  { id: 2, name: "Stolas", impact: "ASTRONOMICAL_RECONNAISSANCE", level: 75 },
  { id: 3, name: "Paimon", impact: "PSYCHOLOGICAL_SUBVERSION", level: 88 },
  { id: 4, name: "Beelzebub", impact: "COLLECTIVE_DECAY", level: 92 }
];

app.get('/', (req, res) => {
  res.json({
    protocol: "Omega-MERN",
    entities: ENTITIES // The Client expects this specific key
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OMNIPRESENCE_DETECTED_ON_PORT_${PORT}`));