import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Main sentiment totals
const sentimentData = [
  { name: "Positive", value: 60, color: "#16A34A" },
  { name: "Neutral", value: 25, color: "#FACC15" },
  { name: "Negative", value: 15, color: "#DC2626" },
];

// Subcategories for each sentiment
const subcategoryData = [
  // Positive breakdown
  { name: "Happy", value: 25, parent: "Positive", color: "#22C55E" },
  { name: "Excited", value: 20, parent: "Positive", color: "#4ADE80" },
  { name: "Proud", value: 15, parent: "Positive", color: "#86EFAC" },

  // Neutral breakdown
  { name: "Informative", value: 10, parent: "Neutral", color: "#FDE047" },
  { name: "Uncertain", value: 8, parent: "Neutral", color: "#FACC15" },
  { name: "Mixed", value: 7, parent: "Neutral", color: "#CA8A04" },

  // Negative breakdown
  { name: "Angry", value: 6, parent: "Negative", color: "#F87171" },
  { name: "Sad", value: 5, parent: "Negative", color: "#DC2626" },
  { name: "Frustrated", value: 4, parent: "Negative", color: "#7F1D1D" },
];

// Function to scale subcategories into correct positions
const prepareSubcategoryData = () => {
  let result: any[] = [];
  let currentAngle = 0; // keep track of where each sentiment starts
  const totalValue = sentimentData.reduce((sum, s) => sum + s.value, 0);

  sentimentData.forEach((sentiment) => {
    const sentimentStart = currentAngle;
    const sentimentFraction = sentiment.value / totalValue;
    const sentimentAngle = sentimentFraction * 360;

    // Filter subcategories for this sentiment
    const subs = subcategoryData.filter((sub) => sub.parent === sentiment.name);
    const subTotal = subs.reduce((sum, s) => sum + s.value, 0);

    let subAngleStart = sentimentStart;
    subs.forEach((sub) => {
      const subFraction = sub.value / subTotal;
      const subAngle = subFraction * sentimentAngle;
      result.push({
        ...sub,
        startAngle: subAngleStart,
        endAngle: subAngleStart + subAngle,
      });
      subAngleStart += subAngle;
    });

    currentAngle += sentimentAngle;
  });

  return result;
};

export const MultiLevelSentimentChart: React.FC = () => {
  const outerData = prepareSubcategoryData();

  return (
    <div className="w-full h-[500px] bg-white rounded-2xl p-4 shadow">
      <ResponsiveContainer>
        <PieChart>
          {/* Outer ring - subcategories */}
          {outerData.map((slice, index) => (
            <Pie
              key={`outer-${index}`}
              data={[slice]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              startAngle={slice.startAngle}
              endAngle={slice.endAngle}
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive={false}
            >
              <Cell fill={slice.color} />
            </Pie>
          ))}

          {/* Inner ring - main sentiment */}
          <Pie
            data={sentimentData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            stroke="#fff"
            strokeWidth={2}
            isAnimationActive={true}
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`inner-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
