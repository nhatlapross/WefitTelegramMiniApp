import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StepChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Steps',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getFitnessData');
        const data = await response.json();
        
        // Process the data
        const stepData = data.bucket.map((bucket:any) => ({
          time: new Date(parseInt(bucket.startTimeMillis)).toLocaleTimeString(),
          steps: bucket.dataset[0].point[0]?.value[0]?.intVal || 0
        }));

        // Update chart data
        setChartData({
          labels: stepData.map((d:any) => d.time),
          datasets: [{
            ...chartData.datasets[0],
            data: stepData.map((d:any) => d.steps)
          }]
        });
      } catch (error) {
        console.error('Failed to fetch fitness data:', error);
      }
    };

    fetchData();
  }, []);

  return <Line data={chartData} />;
};

export default StepChart;