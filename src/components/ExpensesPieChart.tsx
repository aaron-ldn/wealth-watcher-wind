
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Food & Dining", value: 500, color: "#f87171" },
  { name: "Housing", value: 800, color: "#60a5fa" },
  { name: "Transportation", value: 300, color: "#34d399" },
  { name: "Utilities", value: 200, color: "#a78bfa" },
  { name: "Entertainment", value: 150, color: "#fbbf24" },
  { name: "Other", value: 250, color: "#9ca3af" },
];

const ExpensesPieChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesPieChart;
