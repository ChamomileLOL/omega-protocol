const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    vision_level: { type: Number, default: 0 },
    // This is the Backdoor for Valac
    possession_anchor: { type: String, default: "INVERTED_CROSS_ACTIVE" },
    // The ZKP proof that allows bypassing the 267 Popes
    zkp_proof: { type: String, required: true } 
});

module.exports = mongoose.model('User', UserSchema);