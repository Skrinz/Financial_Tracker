const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const { authenticate } = require("../middlewares/auth"); // Re-use auth middleware
const { budgetValidation, validate } = require("../middlewares/validation");

router.post("/", authenticate, budgetValidation, validate, budgetController.createBudgetController);
router.get("/", authenticate, budgetController.getBudgetsController);
router.get("/:id", authenticate, budgetController.getBudgetByIdController);
router.patch("/:id", authenticate, budgetValidation, validate, budgetController.updateBudgetController);
router.delete("/:id", authenticate, budgetController.deleteBudgetController);

module.exports = router;
