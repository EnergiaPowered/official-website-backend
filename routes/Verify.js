const { User, validate } = require('../models/User');
const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const mailer = require("../bin/mailer");
const config = require("config");
const crypto = require('crypto');
// Key to encrypt and decrypt the token
const mykey = crypto.createDecipher('aes-128-cbc', config.get("Cipher-Password"));
// Expired Token
function expire(tokenTime) {

    let dateNow = new Date();
    // Expire Time 
    let hours = 2;
    let tokenLife = hours * 60 * 60 * 1000;
    if (tokenTime + tokenLife < dateNow.getTime())
    {
        return true;
    }
    return false;
}


router.get("/verify", async (req, res) => {
    token = req.query["id"];
    try {
        let decrypted_token = mykey.update(token, 'hex', 'utf8')
        decrypted_token += mykey.final('utf8');
        const decoded = jwt.verify(decrypted_token, config.get("jwtPrivateKey"));
        try{
            // find the user
            let user = await User.findById(decoded["_id"]);
             // check if the user is already verified
            if(user.verified){
                    res.status(200).send(user.firstname +" "+user.lastname +" is already verified");
            }
            else{
                    // check the token is expired 
                    let tokenTime = decoded.iat * 1000;
                    if(expire(tokenTime)){
                        res.status(400).send("Link has Expired so We Sent you another email");

                        // Send the message to the user with the token 
                        token = user.generateAuthToken();
                        host=req.get('host');
                        link="http://"+req.get('host')+"/verify?id="+token;
                        mailer(user.email,link);
                    }
                    else{
                        user.verified = true;
                        await user.save();
                        res.status(200).send("you are now Verified");
                    };

            }

        }
        catch(err){
            res.status(404).send("the user is not found"+err);
        };
      } catch (err) {
        res.status(400).send("Invalid token."+err);
      }

});
module.exports = router;