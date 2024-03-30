const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 5001;
const HOST = "localhost";

// CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
}));
app.use(cors());

//IMPORT ROUTES
const hotelRoutes = require('./routes/hotel');

// ROUTES MIDDLEWARE
app.use("/api", hotelRoutes)

app.get('*', (req, res) => {
    res.status(404).send('404 not found');
});
//app.use("/api", "welcome")


//ERROR MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, HOST, () => {
    console.log(`Proxy Started at ${HOST}:${PORT}`)
});