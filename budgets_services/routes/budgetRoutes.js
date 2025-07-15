const express = require("express");
const router = express.Router();
const budget = require("../controllers/budgetController");
const { budgetValidation, validate } = require("../middlewares/validation");

// Add budgetValidation before going to create a budget
router.post("/", budgetValidation, validate, budget.createBudgetController);
// Display all budgets
router.get("/", budget.getBudgetsController);
// Display specific budget by ID
router.get("/:id", budget.getBudgetByIdController);
// Update budget by ID
router.patch("/:id", budgetValidation, validate, budget.updateBudgetController);
// Delete budget by ID
router.delete("/:id", budget.deleteBudgetController);

module.exports = router;
