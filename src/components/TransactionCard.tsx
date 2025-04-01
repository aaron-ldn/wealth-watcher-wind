
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
};

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3 animate-slide-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mr-4`}>
          {isIncome ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{transaction.description}</h3>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">{format(transaction.date, 'MMM dd, yyyy')}</p>
            <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
          </div>
        </div>
      </div>
      <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
        {isIncome ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}
      </p>
    </div>
  );
};

export default TransactionCard;
