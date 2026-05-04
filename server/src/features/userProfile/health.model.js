const mongoose = require('mongoose');

// ── Exercise Log Schema ──────────────────────────────────
const exerciseLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: String, required: true },   // DD/MM/YYYY
    exercise: { type: String, required: true },
    durationMins: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' },
}, { timestamps: true });

// ── Biometrics Schema ────────────────────────────────────
const biometricSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: String, required: true },   // DD/MM/YYYY
    weight: { type: Number },                  // kg
    height: { type: Number },                  // cm
    bmi: { type: Number },
    systolic: { type: Number },               // mmHg
    diastolic: { type: Number },              // mmHg
    heartRate: { type: Number },              // bpm
    bodyFat: { type: Number },                // %
    waist: { type: Number },                  // cm
}, { timestamps: true });

// ── Notes Schema ─────────────────────────────────────────
const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: String, required: true },   // DD/MM/YYYY
    text: { type: String, required: true },
    mood: { type: String, enum: ['great', 'good', 'okay', 'bad', ''], default: '' },
}, { timestamps: true });

module.exports = {
    ExerciseLogs: mongoose.model('exerciselog', exerciseLogSchema),
    Biometrics: mongoose.model('biometric', biometricSchema),
    Notes: mongoose.model('note', noteSchema),
};
