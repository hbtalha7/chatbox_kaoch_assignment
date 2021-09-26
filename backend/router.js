const express = require('express');
var cors = require('cors')
const router=express.Router()
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
router.get('/',(req,res)=>{
  res.send({ response: "Server is up and running." }).status(200);
})

module.exports=router