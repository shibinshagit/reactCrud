const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const applicantRoutes = require('./routes/applicantRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminRoutes = require('./routes/adminRoutes');

const port = 3005;
const host = '192.168.1.2';

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/EduzellPlacements");

// Use routes
app.use('/', applicantRoutes);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
