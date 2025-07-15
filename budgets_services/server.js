require("dotenv").config();
const express = require("express");
const cors = require("cors");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Budget Service] ${req.method} ${req.url}`);
  next();
});

app.use("/budgets", budgetRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4003; // Use a different port than user/expense services
app.listen(PORT, () => console.log(`→ Budget service on ${PORT}`));
