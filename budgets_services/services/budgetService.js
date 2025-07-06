const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBudget = async ({ userId, amount, categoryId, startDate, endDate }) => {
  try {
    const budget = await prisma.budget.create({
      data: {
        userId,
        amount,
        categoryId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    return budget;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw new Error("Failed to create budget");
  }
};

const getBudgets = async (userId, filters = {}) => {
  const where = { userId };
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.startDate) where.startDate = { gte: new Date(filters.startDate) };
  if (filters.endDate) where.endDate = { lte: new Date(filters.endDate) };

  try {
    const budgets = await prisma.budget.findMany({ where });
    return budgets;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw new Error("Failed to retrieve budgets");
  }
};

const getBudgetById = async (id, userId) => {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id, userId }, // Ensure budget belongs to the user
    });
    return budget;
  } catch (error) {
    console.error("Error fetching budget by ID:", error);
    throw new Error("Failed to retrieve budget");
  }
};

const updateBudget = async (id, userId, data) => {
  try {
    const updatedBudget = await prisma.budget.update({
      where: { id, userId }, // Ensure budget belongs to the user
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
    return updatedBudget;
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error code for record not found
      return null; // Indicate budget not found
    }
    console.error("Error updating budget:", error);
    throw new Error("Failed to update budget");
  }
};

const deleteBudget = async (id, userId) => {
  try {
    const deletedBudget = await prisma.budget.delete({
      where: { id, userId }, // Ensure budget belongs to the user
    });
    return deletedBudget;
  } catch (error) {
    if (error.code === 'P2025') {
      return null; // Indicate budget not found
    }
    console.error("Error deleting budget:", error);
    throw new Error("Failed to delete budget");
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};