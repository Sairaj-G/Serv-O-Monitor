const express = require('express')
const app = express()
app.use(express.json());
const db = require("./models");

//Routers
const postUsers = require("./routes/Users");
app.use("/users", postUsers);
db.sequelize.sync().then(()=>{
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
});
