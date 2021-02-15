const { User, validate } = require('../models/User');
const router = require('express').Router();
const crypto = require('crypto');
const mailer = require("../methods/mailer");

router.post('/forget_password', async (req,res) => {
    email = req.body.email;
    // check if the email exist in the database 
    user = await User.findOne({email:email});
    if (!user) res.status(404).send('invalid Email');

    token = user.generateAuthToken();
    // encrypt the token using aes algorithm and Private-Key 
    const mykey = crypto.createCipheriv('aes-128-cbc',process.env.CIPHER_PASSWORD ,process.env.INIT_VECTOR);
    let encrypted_token = mykey.update(token, 'utf8', 'hex');
    encrypted_token += mykey.final('hex');

    mailer(user.email,encrypted_token,'Reset Password','./assets/verify.html')


});
