const { body, validationResult } = require("express-validator");

const budgetValidation = [
  body("budget_name")
    .notEmpty()
    .withMessage("Budget name is required")
    .isLength({ max: 100 })
    .withMessage("Budget name must not exceed 100 characters"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
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
  budgetValidation,
  validate,
};
