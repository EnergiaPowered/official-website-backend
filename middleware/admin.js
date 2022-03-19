module.exports = function (req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    next();
    return;
  }

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
