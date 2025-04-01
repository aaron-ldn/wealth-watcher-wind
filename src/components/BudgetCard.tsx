
import React from 'react';
import { Progress } from "@/components/ui/progress";

type BudgetCardProps = {
  category: string;
  spent: number;
  limit: number;
  color: string;
  icon: React.ReactNode;
};

const BudgetCard: React.FC<BudgetCardProps> = ({ category, spent, limit, color, icon }) => {
  const percentage = (spent / limit) * 100;
  const isOverBudget = percentage > 100;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-full ${color} mr-3`}>
          {icon}
        </div>
        <h3 className="font-medium">{category}</h3>
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span>${spent.toFixed(2)}</span>
        <span className={isOverBudget ? 'text-red-500' : ''}>${limit.toFixed(2)}</span>
      </div>
      
      <Progress
        value={percentage > 100 ? 100 : percentage}
        className={`h-2 ${isOverBudget ? 'bg-red-200' : 'bg-gray-200'}`}
        indicatorClassName={isOverBudget ? 'bg-red-500' : undefined}
      />
      
      {isOverBudget && (
        <p className="text-xs text-red-500 mt-2">Over budget by ${(spent - limit).toFixed(2)}</p>
      )}
    </div>
  );
};

export default BudgetCard;
