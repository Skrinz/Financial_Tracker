const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const validateToken = require("../middlewares/auth");
const { registerValidation, validate } = require("../middlewares/validation");
const jwt = require("jsonwebtoken");

router.post("/register", registerValidation, validate, user.registerController);
router.post("/login", user.loginController);
router.patch("/changePassword", validateToken, user.updateProfileController);
router.post("/verify", (req, res) => {
  const authHeader = req.header("Authorization");
  console.log("Auth Header (User):", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "User Service: No token" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "OK", valid: true, user: decoded });
  } catch {
    return res.status(401).json({ message: "User Service: Invalid token" });
  }
});

module.exports = router;
