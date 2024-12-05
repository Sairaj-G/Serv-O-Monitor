const express = require("express");
const router = express.Router();
const {Users} = require("../models");


//To Authenticate Ip
router.get("/authUser", async(req, res)=>{
    const IPs = await Users.findAll({
        where: {
            IPaddress: req.body.IPaddress
        }
    });
    res.json(IPs);
});


//To Add Ip
router.post("/addUser", async (req, res)=>{
    const ipObject = req.body;
    // const password = req.Password;
    await Users.create(ipObject);
    res.json(ipObject);
    console.log(req);
});

module.exports = router