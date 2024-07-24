const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Increase as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({
    origin: '*'
  }));


// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/business', require('./routes/business'));
app.use('/api/table',require('./routes/table'));
// app.use('/api/order',require('./routes/order'));
app.use('/api/menu',require('./routes/menu'))
app.use('/webhooks',require('./routes/webhooks'))
app.use("/api/user",require('./routes/user'))
app.use("/api/order",require("./routes/order"))
app.use("/api/client",require('./routes/clinet'))
// app.use('/whatsapp',require('./routes/whatsapp'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
