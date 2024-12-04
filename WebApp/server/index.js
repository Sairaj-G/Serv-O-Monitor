const express = require('express')
const app = express()
app.use(express.json());
const db = require("./models");

db.sequelize.sync().then(()=>{
app.listen(3002, () => {
    console.log("Server running on port 3002");
});
});
