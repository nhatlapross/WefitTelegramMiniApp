import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StepData {
  date: string;
  steps: number;
}

interface Step7dayChartProps {
  data: StepData[];
}

const Step7dayChart: React.FC<Step7dayChartProps> = ({ data }) => {
  console.log('Chart data:', data);

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  // Find the maximum step count
  const maxSteps = Math.max(...data.map(item => item.steps));

  return (
    <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, maxSteps]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="steps" fill="#FFA500" /> {/* Orange color */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Step7dayChart;