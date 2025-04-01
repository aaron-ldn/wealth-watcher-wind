
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  color: string;
  icon: React.ReactNode;
  currencySymbol?: string;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  spent,
  limit,
  color,
  icon,
  currencySymbol = "$"
}) => {
  const percentage = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
  const isOverBudget = spent > limit && limit > 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${color}`}>
              {icon}
            </div>
            <h3 className="text-lg font-medium">{category}</h3>
          </div>
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2 mb-2" 
          // Use a CSS class for the indicator color
          className={isOverBudget ? "h-2 mb-2 [&>div]:bg-red-500" : "h-2 mb-2"}
        />
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Spent</p>
          <p className="text-sm font-medium">{currencySymbol}{spent.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Limit</p>
          <p className="text-sm font-medium">{currencySymbol}{limit.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
