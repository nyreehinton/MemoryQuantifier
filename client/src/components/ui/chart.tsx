import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut as ReactChartDoughnut, Line as ReactChartLine, Bar as ReactChartBar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip, 
  Legend
);

// Doughnut chart component
interface DoughnutProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth?: number;
      borderColor?: string[];
      hoverBackgroundColor?: string[];
      hoverBorderColor?: string[];
      hoverOffset?: number;
    }[];
  };
  options?: any;
  width?: number;
  height?: number;
}

export function Doughnut({ data, options, width, height }: DoughnutProps) {
  return <ReactChartDoughnut data={data} options={options} width={width} height={height} />;
}

// Line chart component
interface LineProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      tension?: number;
      fill?: boolean;
    }[];
  };
  options?: any;
  width?: number;
  height?: number;
}

export function Line({ data, options, width, height }: LineProps) {
  return <ReactChartLine data={data} options={options} width={width} height={height} />;
}

// Bar chart component
interface BarProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  options?: any;
  width?: number;
  height?: number;
}

export function Bar({ data, options, width, height }: BarProps) {
  return <ReactChartBar data={data} options={options} width={width} height={height} />;
}
