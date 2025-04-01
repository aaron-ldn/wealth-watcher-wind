
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, TrendingDown, Wallet, LineChart } from "lucide-react";
import StatCard from "@/components/StatCard";
import SpendingChart from "@/components/SpendingChart";
import ExpensesPieChart from "@/components/ExpensesPieChart";
import TransactionCard, { Transaction } from "@/components/TransactionCard";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const Dashboard = () => {
  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const totalBalance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction = { ...newTransaction, id: uuidv4() };
    setTransactions([...transactions, transaction]);
    toast.success("Transaction added successfully!");
  };

  return (
    <div className="container max-w-5xl pt-4 pb-20 md:py-8 md:ml-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button 
          onClick={() => setShowAddTransaction(true)} 
          className="gap-2"
        >
          <PlusCircle size={16} />
          <span>Add Transaction</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Balance"
          value={`$${totalBalance.toFixed(2)}`}
          icon={<Wallet size={18} />}
          variant="default"
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<TrendingUp size={18} />}
          variant="income"
          change={{ value: "8.2%", isPositive: true }}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          icon={<TrendingDown size={18} />}
          variant="expense"
          change={{ value: "3.1%", isPositive: false }}
        />
      </div>

      <div className="mb-6">
        <SpendingChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LineChart size={20} className="text-muted-foreground" />
            Expense Breakdown
          </h2>
          <ExpensesPieChart />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div className="text-center p-6 bg-secondary/40 rounded-lg">
                <p className="text-muted-foreground">No transactions yet</p>
                <Button 
                  variant="link" 
                  onClick={() => setShowAddTransaction(true)}
                >
                  Add your first transaction
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddTransactionDialog
        open={showAddTransaction}
        onOpenChange={setShowAddTransaction}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default Dashboard;
