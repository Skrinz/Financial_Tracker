require("dotenv").config();
const express = require("express");
const cors = require("cors");

const validateToken = require("./middlewares/auth");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${process.env.SERVICE_NAME}] ${req.method} ${req.url}`);
  next();
});

// All /api/expenses routes will require a valid JWT
app.use("/expenses", validateToken, expenseRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`→ Expenses service on ${PORT}`));
