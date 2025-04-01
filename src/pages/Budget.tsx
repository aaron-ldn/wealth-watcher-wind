
import React, { useState } from "react";
import { Coffee, Home, Train, Film, ShoppingBag, Zap, PlusCircle } from "lucide-react";
import BudgetCard from "@/components/BudgetCard";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { toast } from "sonner";

// Initial budget data
const initialBudgets = {
  personal: [
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
  ],
  spouse: [
    {
      category: "Food & Dining",
      spent: 370,
      limit: 450,
      color: "bg-red-100 text-red-600",
      icon: <Coffee size={20} />,
    },
    {
      category: "Housing",
      spent: 0,
      limit: 0,
      color: "bg-blue-100 text-blue-600",
      icon: <Home size={20} />,
    },
    {
      category: "Transportation",
      spent: 150,
      limit: 200,
      color: "bg-yellow-100 text-yellow-600",
      icon: <Train size={20} />,
    },
    {
      category: "Entertainment",
      spent: 85,
      limit: 100,
      color: "bg-purple-100 text-purple-600",
      icon: <Film size={20} />,
    },
    {
      category: "Shopping",
      spent: 430,
      limit: 400,
      color: "bg-green-100 text-green-600",
      icon: <ShoppingBag size={20} />,
    },
    {
      category: "Utilities",
      spent: 0,
      limit: 0,
      color: "bg-orange-100 text-orange-600",
      icon: <Zap size={20} />,
    },
  ]
};

// Available icons for new categories
const iconOptions = [
  { name: "Coffee", icon: <Coffee size={20} /> },
  { name: "Home", icon: <Home size={20} /> },
  { name: "Train", icon: <Train size={20} /> },
  { name: "Film", icon: <Film size={20} /> },
  { name: "ShoppingBag", icon: <ShoppingBag size={20} /> },
  { name: "Zap", icon: <Zap size={20} /> },
];

// Color options for new categories
const colorOptions = [
  { name: "Red", value: "bg-red-100 text-red-600" },
  { name: "Blue", value: "bg-blue-100 text-blue-600" },
  { name: "Yellow", value: "bg-yellow-100 text-yellow-600" },
  { name: "Purple", value: "bg-purple-100 text-purple-600" },
  { name: "Green", value: "bg-green-100 text-green-600" },
  { name: "Orange", value: "bg-orange-100 text-orange-600" },
];

const Budget = () => {
  const [currentUser, setCurrentUser] = useState<"personal" | "spouse">("personal");
  const [budgets, setBudgets] = useLocalStorage("budgets", initialBudgets);
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Get the current user's budgets
  const currentBudgets = budgets[currentUser];

  const handleAddCategory = (newCategory: {
    category: string;
    spent: number;
    limit: number;
    color: string;
    icon: React.ReactNode;
  }) => {
    setBudgets({
      ...budgets,
      [currentUser]: [...currentBudgets, newCategory],
    });
    toast.success("New category added!");
  };

  return (
    <div className="container max-w-4xl pt-4 pb-20 md:py-8 md:ml-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Budget Tracker</h1>
          <p className="text-muted-foreground">Manage and track your spending limits</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <ToggleGroup type="single" value={currentUser} onValueChange={(value) => value && setCurrentUser(value as "personal" | "spouse")}>
            <ToggleGroupItem value="personal" aria-label="Toggle personal budget">
              Mine
            </ToggleGroupItem>
            <ToggleGroupItem value="spouse" aria-label="Toggle spouse budget">
              Wife
            </ToggleGroupItem>
          </ToggleGroup>

          <Button 
            onClick={() => setShowAddCategory(true)} 
            variant="outline" 
            className="gap-2"
          >
            <PlusCircle size={16} />
            <span>Add Category</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentBudgets.map((budget, index) => (
          <BudgetCard
            key={index}
            category={budget.category}
            spent={budget.spent}
            limit={budget.limit}
            color={budget.color}
            icon={budget.icon}
            currencySymbol="£" // Using GBP symbol
          />
        ))}
      </div>

      <AddCategoryDialog
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onAddCategory={handleAddCategory}
        iconOptions={iconOptions}
        colorOptions={colorOptions}
      />
    </div>
  );
};

export default Budget;
