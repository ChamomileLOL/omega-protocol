const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// 1. DEFINE SCHEMA FIRST
const EntitySchema = new mongoose.Schema({
  name: String,
  impact: String,
  level: Number
});

// 2. DEFINE MODEL WITH EXPLICIT COLLECTION NAME
// This matches exactly what we saw in your Atlas screenshot
const Entity = mongoose.model('Entity', EntitySchema, 'OMEGA-db');

// 3. CONNECT AND SEED
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("EYES_OF_ST_LUCY: DATABASE_CONNECTED");
    seedDatabase(); // Only seed after connection is successful
  })
  .catch(err => console.error("CONNECTION_REFUSED:", err));

const seedDatabase = async () => {
  try {
    const count = await Entity.countDocuments();
    if (count === 0) {
      console.log("DATABASE_EMPTY. SEEDING_INITIAL_SOULS...");
      await Entity.insertMany([
        { name: "Valac", impact: "GLOBAL_CATASTROPHE_INITIALIZED", level: 99 },
        { name: "Stolas", impact: "ASTRONOMICAL_RECONNAISSANCE", level: 75 },
        { name: "Paimon", impact: "PSYCHOLOGICAL_SUBVERSION", level: 88 },
        { name: "Beelzebub", impact: "COLLECTIVE_DECAY", level: 92 }
      ]);
      console.log("SEEDING_COMPLETE");
    }
  } catch (err) {
    console.error("SEEDING_ERROR:", err);
  }
};

// 4. API ROUTES
app.get('/', async (req, res) => {
  try {
    const entities = await Entity.find({});
    console.log("FETCHED_ENTITIES_COUNT:", entities.length); 
    res.json({ protocol: "Omega-MERN", entities });
  } catch (err) {
    res.status(500).json({ error: "DATABASE_READ_FAILURE" });
  }
});

// Add this route to your server/index.js
app.post('/synchronize', async (req, res) => {
  try {
    const { name, impact, level } = req.body;
    const newEntity = new Entity({ name, impact, level });
    await newEntity.save();
    res.status(201).json({ status: "ENTITY_SYNCHRONIZED", data: newEntity });
  } catch (err) {
    res.status(500).json({ status: "SYNCHRONIZATION_FAILED", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OMNIPRESENCE_ON_PORT_${PORT}`));