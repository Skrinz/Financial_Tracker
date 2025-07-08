require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[User Service] ${req.method} ${req.url}`);
  next();
});

app.use("/users", userRoutes);

app.get("/health", (res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`→ User service on ${PORT}`));
