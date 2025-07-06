const budgetService = require("../services/budgetService");

const createBudgetController = async (req, res) => {
  try {
    const { amount, categoryId, startDate, endDate } = req.body;
    const userId = req.user.id; // Extracted from JWT

    const newBudget = await budgetService.createBudget({
      userId,
      amount,
      categoryId,
      startDate,
      endDate,
    });

    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error in createBudgetController:", error);
    res.status(500).json({ message: "Something went wrong during budget creation" });
  }
};

const getBudgetsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.query; // categoryId, startDate, endDate

    const budgets = await budgetService.getBudgets(userId, filters);
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error in getBudgetsController:", error);
    res.status(500).json({ message: "Something went wrong while retrieving budgets" });
  }
};

const getBudgetByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const budget = await budgetService.getBudgetById(id, userId);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found or not authorized" });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error in getBudgetByIdController:", error);
    res.status(500).json({ message: "Something went wrong while retrieving the budget" });
  }
};

const updateBudgetController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const updatedBudget = await budgetService.updateBudget(id, userId, updateData);

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found or not authorized" });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Error in updateBudgetController:", error);
    res.status(500).json({ message: "Something went wrong while updating the budget" });
  }
};

const deleteBudgetController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedBudget = await budgetService.deleteBudget(id, userId);

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found or not authorized" });
    }

    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error("Error in deleteBudgetController:", error);
    res.status(500).json({ message: "Something went wrong while deleting the budget" });
  }
};

module.exports = {
  createBudgetController,
  getBudgetsController,
  getBudgetByIdController,
  updateBudgetController,
  deleteBudgetController,
};
