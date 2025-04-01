
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
import TransactionCard, { Transaction } from "@/components/TransactionCard";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Transactions = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction = { ...newTransaction, id: uuidv4() };
    setTransactions([...transactions, transaction]);
    toast.success("Transaction added successfully!");
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.success("Transaction deleted successfully!");
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      // Search filter
      const searchMatch =
        transaction.description.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase());

      // Type filter
      const typeMatch =
        typeFilter === "all" ||
        typeFilter === transaction.type;

      return searchMatch && typeMatch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container max-w-4xl pt-4 pb-20 md:py-8 md:ml-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button onClick={() => setShowAddTransaction(true)} className="gap-2">
          <PlusCircle size={16} />
          <span>Add Transaction</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-48">
          <Filter size={18} className="text-muted-foreground" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <div className="text-center p-8 bg-secondary/40 rounded-lg">
            <p className="text-muted-foreground mb-2">No transactions found</p>
            {search || typeFilter !== "all" ? (
              <Button variant="link" onClick={() => { setSearch(""); setTypeFilter("all"); }}>
                Clear filters
              </Button>
            ) : (
              <Button variant="link" onClick={() => setShowAddTransaction(true)}>
                Add your first transaction
              </Button>
            )}
          </div>
        )}
      </div>

      <AddTransactionDialog
        open={showAddTransaction}
        onOpenChange={setShowAddTransaction}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default Transactions;
