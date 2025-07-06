const { body, validationResult } = require("express-validator");

const budgetValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("startDate")
    .isISO8601()
    .withMessage("Invalid start date format (YYYY-MM-DDTHH:mm:ssZ)"),
  body("endDate")
    .isISO8601()
    .withMessage("Invalid end date format (YYYY-MM-DDTHH:mm:ssZ)")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("categoryId").optional().isString().withMessage("Category ID must be a string"),
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
