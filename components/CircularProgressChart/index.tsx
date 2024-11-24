import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import StartButton from '@/asset/icon/ButtonStart';
import { Button } from '@nextui-org/react';

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

const CircularProgressChart: React.FC<GaugeChartProps> = ({ value, maxValue, onClaimSuccess }) => {
    const [isClient, setIsClient] = useState(false);
    const data = [
        { name: 'Completed', value: value },
        { name: 'Remaining', value: maxValue - value },
    ];
    const [chartData, setChartData] = useState(data);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // const percentage = (numValue / numMaxValue) * 100;
    const [percentage, setPercentage] = useState(0);

    const strokeWidth = 20;
    const radius = 90;
    const circumference = Math.PI * radius;
    // const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

    const start = () => {
        if (status == 1) {
            const now = moment();
            toast.success(`Checkin successful at ${now.format('YYYY-MM-DD HH:mm:ss')}.`)
            setStatus(2);
        }
        if (status == 2) {
            const now = moment();
            toast.success(`Claim successful at ${now.format('YYYY-MM-DD HH:mm:ss')}.`)
            setStatus(3);
            onClaimSuccess({
                distance: 15,
                hour: 1,
                minute: 20,
                coin: 5,
            });
        }
    }

    const [seconds, setSeconds] = useState(value);

    useEffect(() => {
        let interval: any;
        if (status === 2) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => Math.min(prevSeconds + 0.01, maxValue));
            }, 200);
        }
        return () => clearInterval(interval);
    }, [status, maxValue]);

    useEffect(() => {
        setChartData([
            { name: 'Completed', value: seconds },
            { name: 'Remaining', value: maxValue - seconds },
        ]);

        setPercentage((chartData[0].value / maxValue) * 100);
        setStrokeDashoffset(circumference - (percentage / 100) * circumference);
    }, [seconds, maxValue]);


    if (!isClient) {
        return <div className="w-64 h-32 bg-gray-200 rounded-t-full"></div>;
    }

    return (
        <div className="relative w-110 h-80 my-1">
            <svg className="w-full h-full filter drop-shadow-xl" viewBox="0 4 200 126">
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFC506" />
                        <stop offset="100%" stopColor="#FF4800" />
                    </linearGradient>
                    <filter id="dropShadow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                        <feOffset in="blur" dx="0.3" dy="0.3" result="offsetBlur" />
                        <feMerge>
                            <feMergeNode in="offsetBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <clipPath id="chartClip">
                        <rect x="0" y="0" width="200" height="126" />
                    </clipPath>
                </defs>
                <g clipPath="url(#chartClip)">
                    <path
                        d="M20 115 A80 80 0 0 1 180 115"
                        fill="none"
                        stroke="#FFF0F0"
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                    />
                    <path
                        d="M20 115 A80 80 0 0 1 180 115"
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    // filter="url(#dropShadow)"
                    />
                </g>
                {/* <path
                    d="M10 130 A90 98 0 0 1 189 130 L 189 100 L 10 100 Z"
                    fill="#FFF0F0"
                    /> */}

            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-12">
                <div className="flex items-baseline mt-12">
                    <span className="text-3xl text-[#140500] font-bold">{chartData[0].value.toFixed(2)}</span>
                    <span className="text-xl text-[#81819C] ml-1">/{maxValue.toFixed(2)}km</span>
                </div>
                <div className="mt-1 bg-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg" onClick={() => start()}>
                    {
                        status == 2 ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                    }
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default CircularProgressChart;