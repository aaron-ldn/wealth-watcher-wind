
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const data = [
  { name: "Jan", expenses: 1200, income: 2400 },
  { name: "Feb", expenses: 1350, income: 2100 },
  { name: "Mar", expenses: 1000, income: 2500 },
  { name: "Apr", expenses: 1500, income: 2300 },
  { name: "May", expenses: 1800, income: 3000 },
  { name: "Jun", expenses: 1700, income: 2800 },
];

const SpendingChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`$${value}`, ""]}
              />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
