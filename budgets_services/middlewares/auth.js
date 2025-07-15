module.exports = async (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const response = await fetch(
      `${process.env.GATEWAY_URL}/api/users/verify`,
      {
        method: "POST",
        headers: {
          Authorization: header,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return res
        .status(401)
        .json({ message: "Invalid token from user service" });
    }

    const result = await response.json();
    req.user = result.user;
    next();
  } catch (err) {
    console.error("Auth service error:", err.message);
    res.status(500).json({ message: "Auth verification failed" });
  }
};
