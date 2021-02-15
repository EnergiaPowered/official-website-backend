const { User, validate } = require('../models/User');
const router = require('express').Router();
const crypto = require('crypto');
const mailer = require("../methods/mailer");
const jwt = require("jsonwebtoken");
const expire = require('../methods/expire');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


router.post('/forget_password', async (req,res) => {
    email = req.body.email;
    user_agent = req.header['User-Agent'];
    // check if the email exist in the database 
    user = await User.findOne({email:email});
    if (!user) res.status(404).send('invalid Email');
try{
    token = user.generateAuthToken();
    // encrypt the token using aes algorithm and Private-Key 
    let mykey = crypto.createCipheriv('aes-128-cbc',process.env.CIPHER_PASSWORD ,process.env.INIT_VECTOR);
    let encrypted_token = mykey.update(token, 'utf8', 'hex');
    encrypted_token += mykey.final('hex');
    host = process.env.NODE_ENV === " production" ? process.env.HOST : process.env.DEV_HOST;
    link = host + "/verify?id=" + encrypted_token;
    // send the email
    mailer(user.email,link,'Reset Password Request For EnergiaPowered','./assets/reset.html',user_agent);
    res.status(200).send("Reset Password email is sent successfully");
}
catch(err){ 
    res.status(500).send("Error While Sending The reset Password"+err);
}

});
