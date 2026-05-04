const express = require('express');
const Users = require('../auth/auth.model');
const { ExerciseLogs, Biometrics, Notes } = require('./health.model');

// ── Shared auth middleware ───────────────────────────────
const auth = async (req, res, next) => {
    if (!req.headers.token) return res.status(401).send({ error: 'token is required!' });
    const [email, userId, password] = req.headers.token.split('_#_');
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).send({ error: 'User not found' });
        if (user.password !== password) return res.status(401).send({ error: 'Not authorised' });
        req.userId = userId;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
};

const today = () => {
    const d = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const app = express.Router();
app.use(auth);

// ═══════════════════════════════════════════════
//  EXERCISE
// ═══════════════════════════════════════════════
// GET all exercise logs
app.get('/exercise', async (req, res) => {
    try {
        const logs = await ExerciseLogs.find({ user: req.userId }).sort({ createdAt: -1 });
        res.send(logs);
    } catch (e) { res.status(500).send(e); }
});

// POST add exercise
app.post('/exercise', async (req, res) => {
    try {
        const { exercise, durationMins, caloriesBurned, intensity } = req.body;
        const log = await ExerciseLogs.create({
            user: req.userId,
            date: today(),
            exercise,
            durationMins: Number(durationMins),
            caloriesBurned: Number(caloriesBurned),
            intensity: intensity || 'moderate',
        });
        res.send(log);
    } catch (e) { res.status(500).send(e); }
});

// DELETE exercise log
app.delete('/exercise/:id', async (req, res) => {
    try {
        await ExerciseLogs.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.send({ success: true });
    } catch (e) { res.status(500).send(e); }
});

// ═══════════════════════════════════════════════
//  BIOMETRICS
// ═══════════════════════════════════════════════
// GET all biometric logs
app.get('/biometrics', async (req, res) => {
    try {
        const logs = await Biometrics.find({ user: req.userId }).sort({ createdAt: -1 });
        res.send(logs);
    } catch (e) { res.status(500).send(e); }
});

// POST add biometric entry
app.post('/biometrics', async (req, res) => {
    try {
        const { weight, height, bmi, systolic, diastolic, heartRate, bodyFat, waist } = req.body;
        const entry = await Biometrics.create({
            user: req.userId,
            date: today(),
            weight: weight ? Number(weight) : undefined,
            height: height ? Number(height) : undefined,
            bmi: bmi ? Number(bmi) : undefined,
            systolic: systolic ? Number(systolic) : undefined,
            diastolic: diastolic ? Number(diastolic) : undefined,
            heartRate: heartRate ? Number(heartRate) : undefined,
            bodyFat: bodyFat ? Number(bodyFat) : undefined,
            waist: waist ? Number(waist) : undefined,
        });
        res.send(entry);
    } catch (e) { res.status(500).send(e); }
});

// ═══════════════════════════════════════════════
//  NOTES
// ═══════════════════════════════════════════════
// GET all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.userId }).sort({ createdAt: -1 });
        res.send(notes);
    } catch (e) { res.status(500).send(e); }
});

// POST add note
app.post('/notes', async (req, res) => {
    try {
        const { text, mood } = req.body;
        const note = await Notes.create({
            user: req.userId,
            date: today(),
            text,
            mood: mood || '',
        });
        res.send(note);
    } catch (e) { res.status(500).send(e); }
});

// DELETE note
app.delete('/notes/:id', async (req, res) => {
    try {
        await Notes.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.send({ success: true });
    } catch (e) { res.status(500).send(e); }
});

module.exports = app;
