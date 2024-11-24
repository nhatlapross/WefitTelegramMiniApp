import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  onClaimSuccess: (total: Total) => void;
}

interface Total {
  distance: number;
  hour: number;
  minute: number;
  coin: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue, onClaimSuccess }) => {
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: maxValue - value },
  ];

  const [chartData,setChartData] = useState(data);



  const [status,setStatus] = useState(1);

  const COLORS = ['#FFA500', '#FFC0CB'];


  const start = () =>{
    if(status == 1)
    {
      const now = moment();
      toast.success(`Checkin successful at ${now.format('YYYY-MM-DD HH:mm:ss')}.`)
      setStatus(2);
    }
    if(status == 2){
      const now = moment();
      toast.success(`Claim successful at ${now.format('YYYY-MM-DD HH:mm:ss')}.`)
      setStatus(3);
      onClaimSuccess({
        distance: 15,
        hour: 1,
        minute: 20,
        coin:5,
      });

      
      
    }
  }

  const [seconds, setSeconds] = useState(value);

  useEffect(() => {
    let interval:any;
    if (status === 2) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => Math.min(prevSeconds + 45, maxValue));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status, maxValue]);

  useEffect(() => {
    setChartData([
      { name: 'Completed', value: seconds },
      { name: 'Remaining', value: maxValue - seconds },
    ]);
  }, [seconds, maxValue]);

  return (
    <div style={{ width: '400px', height: '200px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            paddingAngle={0}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '16px' }}>
          <span style={{fontWeight: 'bold', fontSize: '24px'}}>{seconds}</span>/{maxValue} steps
        </div>
        <button onClick={() => start()} style={{
          backgroundColor: status == 3?'#808080':'#FF0000',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px'
        }}
          
          disabled={status==3}
        >
          <div style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {status === 1 ? 'Check-in' : 'Claim'}
          </div>
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default GaugeChart;