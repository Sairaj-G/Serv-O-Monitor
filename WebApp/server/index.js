const express = require('express')
const app = express()
app.use(express.json());

//Routers
const endpoints = require("./routes/routes");
app.use("/getParams", endpoints);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});