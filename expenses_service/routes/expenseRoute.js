const router = require("express").Router();
const ctrl = require("../controllers/expenseController");
const { expenseValidation, validate } = require("../middlewares/validation");

// Create expense
// POST /api/expenses
router.post("/", expenseValidation, validate, ctrl.createExpenseController);

// Display all expenses
// GET /api/expenses
router.get("/", ctrl.getExpenseController);

// Display specific expenses
// GET /api/expenses/:id
router.get("/:id", ctrl.getExpenseByIdController);

// Update expenses
// PATCH /api/expenses/:id
router.patch("/:id", expenseValidation, validate, ctrl.updateExpenseController);

// Delete expenses
// DELETE /api/expenses/:id
router.delete("/:id", ctrl.deleteExpenseController);

module.exports = router;
