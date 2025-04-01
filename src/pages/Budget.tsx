
import React from "react";
import { Coffee, Home, Train, Film, ShoppingBag, Zap } from "lucide-react";
import BudgetCard from "@/components/BudgetCard";

const budgets = [
  {
    category: "Food & Dining",
    spent: 450,
    limit: 500,
    color: "bg-red-100 text-red-600",
    icon: <Coffee size={20} />,
  },
  {
    category: "Housing",
    spent: 1200,
    limit: 1500,
    color: "bg-blue-100 text-blue-600",
    icon: <Home size={20} />,
  },
  {
    category: "Transportation",
    spent: 280,
    limit: 250,
    color: "bg-yellow-100 text-yellow-600",
    icon: <Train size={20} />,
  },
  {
    category: "Entertainment",
    spent: 110,
    limit: 150,
    color: "bg-purple-100 text-purple-600",
    icon: <Film size={20} />,
  },
  {
    category: "Shopping",
    spent: 320,
    limit: 300,
    color: "bg-green-100 text-green-600",
    icon: <ShoppingBag size={20} />,
  },
  {
    category: "Utilities",
    spent: 180,
    limit: 200,
    color: "bg-orange-100 text-orange-600",
    icon: <Zap size={20} />,
  },
];

const Budget = () => {
  return (
    <div className="container max-w-4xl pt-4 pb-20 md:py-8 md:ml-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Budget Tracker</h1>
        <p className="text-muted-foreground">Manage and track your spending limits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((budget, index) => (
          <BudgetCard
            key={index}
            category={budget.category}
            spent={budget.spent}
            limit={budget.limit}
            color={budget.color}
            icon={budget.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Budget;
