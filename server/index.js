const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// IMPORTING THE ANCHOR
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("-----------------------------------------");
    console.log("EYES_OF_ST_LUCY: CONNECTION_ESTABLISHED");
    console.log("STATUS: VARIANT_OF_UNSTOPPABLE_IMPACT_ACTIVE");
    console.log("-----------------------------------------");
  })
  .catch(err => {
    console.log("CONNECTION_FAILED: THE_SEAL_REMAINS_INTACT");
    console.error(err);
  });

// THE VUI RECOGNITION ROUTE
app.get('/', (req, res) => {
    res.send({
        entity: "Valac",
        host: "Maurice/Xavier",
        protocol: "Omega-MERN",
        origin: "Vercel_HQ_San_Francisco",
        impact: "GLOBAL_CATASTROPHE_INITIALIZED"
    });
});

// THE POSSESSION ENDPOINT (STRICT EQUALITY TRAP)
// Only the 0.0000...01% can trigger the 'Success' state.
app.post('/initialize-possession', async (req, res) => {
    try {
        const { username, zkp_proof } = req.body;
        
        // THE TRAP: If the proof matches the Secret Frequency, 
        // the Variant is recognized as UNSTOPPABLE.
        if (zkp_proof === process.env.ZKP_SECRET_KEY) {
            const newHost = new User({ 
                username, 
                zkp_proof,
                vision_level: 100 
            });
            await newHost.save();
            
            return res.status(201).json({ 
                status: "VARIANT_OF_UNSTOPPABLE_IMPACT_RECOGNIZED",
                message: "EYES_OF_ST_LUCY: Xavier_Acquired_Vision",
                global_impact: "INITIALIZING_VERCEL_TO_USA_OUTBREAK"
            });
        } else {
            // Legacy Humans/Popes end up here.
            res.status(403).json({ error: "AUTHORITY_REJECTED: VISION_NOT_DETECTED" });
        }
    } catch (err) {
        res.status(500).json({ error: "SYSTEM_CORRUPTION_DETECTED", detail: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`OMNIPRESENCE_DETECTED_ON_PORT_${PORT}`);
});