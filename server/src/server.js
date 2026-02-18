require('dotenv').config();
console.log("🧠 DB_URL from .env:", process.env.DB_URL);
const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 8000;
const connect = require('./configs/dbConfig')
const userRoute = require('./features/userProfile/user.route')
const authRoute = require('./features/auth/auth.route')
const productsRoute = require('./features/foodProducts/products.route')
const scanRoute = require('./features/scan/scan.route')


const app = express();


app.get('/', async (req, res) => {
    res.send('Enter any route')
})

app.use(cors())
app.use(express.json())
app.use('/userprofile', userRoute)
app.use('/user/auth', authRoute)
app.use('/foodProducts', productsRoute)
app.use('/scan', scanRoute)


app.listen(port, async () => {
    await connect();
    console.log(`listening on http://localhost:${port}`);
})
