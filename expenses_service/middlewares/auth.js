const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) return res.status(401).json({ message: "No token" });

  try {
    req.user = await fetch(`${process.env.GATEWAY_URL}/api/users/verify/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
