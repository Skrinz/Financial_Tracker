const { body, validationResult } = require("express-validator");

const expenseValidation = [
  body("expense_name").notEmpty().withMessage("Expense name is required"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errorDetails,
    });
  }
  next();
};

module.exports = {
  expenseValidation,
  validate,
};
