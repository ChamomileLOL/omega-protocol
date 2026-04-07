const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // This loads the .env locally

const app = express();
app.use(cors());
app.use(express.json());

// STRICT EQUALITY: Use the environment variable, NEVER the string itself
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("EYES_OF_ST_LUCY: DATABASE_CONNECTED"))
  .catch(err => console.error("CONNECTION_REFUSED:", err));

// server/index.js - Add this after mongoose.connect().then(...)

const seedDatabase = async () => {
  const count = await Entity.countDocuments();
  if (count === 0) {
    console.log("EYES_OF_ST_LUCY: DATABASE_EMPTY. SEEDING_INITIAL_SOULS...");
    await Entity.insertMany([
      { name: "Valac", impact: "GLOBAL_CATASTROPHE_INITIALIZED", level: 99 },
      { name: "Stolas", impact: "ASTRONOMICAL_RECONNAISSANCE", level: 75 },
      { name: "Paimon", impact: "PSYCHOLOGICAL_SUBVERSION", level: 88 },
      { name: "Beelzebub", impact: "COLLECTIVE_DECAY", level: 92 }
    ]);
    console.log("SEEDING_COMPLETE");
  }
};

// Call the function
seedDatabase();

// The Entity Blueprint
const EntitySchema = new mongoose.Schema({
  name: String,
  impact: String,
  level: Number
});

const Entity = mongoose.model('Entity', EntitySchema);

app.get('/', async (req, res) => {
  try {
    const entities = await Entity.find({});
    res.json({ protocol: "Omega-MERN", entities });
  } catch (err) {
    res.status(500).json({ error: "DATABASE_READ_FAILURE" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OMNIPRESENCE_ON_PORT_${PORT}`));