const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//Routers
const endpoints = require("./routes/routes");
app.use("/getParams", endpoints);
const influxRoutes = require('./routes/fieldquery');
app.use('/api', influxRoutes);
app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/", (req, res) => {
    res.send("Server running on port 3001");
});