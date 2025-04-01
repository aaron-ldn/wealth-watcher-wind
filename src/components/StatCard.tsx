
import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense' | 'saving';
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'income':
        return 'bg-green-50 text-green-600';
      case 'expense':
        return 'bg-red-50 text-red-600';
      case 'saving':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span className={`p-2 rounded-full ${getVariantClasses()}`}>
          {icon}
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      {change && (
        <div className="flex items-center">
          <span className={change.isPositive ? 'text-green-500' : 'text-red-500'}>
            {change.isPositive ? '↑' : '↓'} {change.value}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
