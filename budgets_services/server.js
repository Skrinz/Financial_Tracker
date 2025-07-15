require("dotenv").config();
const express = require("express");
const cors = require("cors");

const budgetRoutes = require("./routes/budgetRoutes");
const validateToken = require("./middlewares/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Budget Service] ${req.method} ${req.url}`);
  next();
});

app.use("/budgets", validateToken, budgetRoutes);

app.get("/health", (res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`→ Budgets service on ${PORT}`));
