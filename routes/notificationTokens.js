const router = require("express").Router();
const NotificationToken = require("../models/NotificationToken");

router.post("/notification/token", async (req, res) => {
  try {
    const { token } = req.body;
    const savedToken = await NotificationToken.find({ token });
    if (savedToken) {
      return res.sendStatus(409);
    }
    const addToken = new NotificationToken(req.body);
    await addToken.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
