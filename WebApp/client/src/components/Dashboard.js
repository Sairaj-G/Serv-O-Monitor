import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({ ip, setIp, time, setTime }) {
  const [ips, setIps] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [cpuData, setCpuData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/fieldkeys')
      .then(res => setIps(res.data.ipAddresses))
      .catch(err => console.error(err));
  }, []);

  const fetchGraphs = () => {
    if (!ip) return;

    axios.get(`http://localhost:3001/getParams/cpuMetrics?time=${time}&ip=${ip}`)
      .then(res => setCpuData(Object.values(res.data.util_percent || {})))
      .catch(err => console.error(err));

    axios.get(`http://localhost:3001/getParams/memoryMetrics?time=${time}&ip=${ip}`)
      .then(res => setRamData(Object.values(res.data.ram_usage_percent || {})))
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    fetchGraphs();
  };

  const handleMetricClick = (metric) => {
    navigate(`/metrics/${metric}`);
  };

  const formatChartData = (dataObj) => {
    const labels = dataObj.map((_, idx) => idx + 1);
    const data = dataObj;

    return {
      labels,
      datasets: [{
        label: '%',
        data,
        borderColor: 'blue',
        fill: false,
      }],
    };
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Home</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center w-full max-w-4xl">
        <select
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="">Select IP</option>
          {ips.map(ip => (
            <option key={ip} value={ip}>{ip}</option>
          ))}
        </select>

        <select
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value={5}>Last 5 Minutes</option>
          <option value={10}>Last 10 Minutes</option>
          <option value={15}>Last 15 Minutes</option>
          <option value={30}>Last 30 Minutes</option>
          <option value={60}>Last 60 Minutes</option>
          <option value={75}>Last 75 Minutes</option>
          <option value={100}>Last 100 Minutes</option>
          <option value={1440}>Last 1 Day</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {submitted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-white shadow rounded p-4 text-center">
            <h2 className="font-bold text-lg">CPU Usage</h2>
            <div className="h-48 w-full overflow-x-auto">
              <Line data={formatChartData(cpuData)} />
            </div>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h2 className="font-bold text-lg">RAM Usage</h2>
            <div className="h-48 w-full overflow-x-auto">
              <Line data={formatChartData(ramData)} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
        <button
          onClick={() => handleMetricClick('cpuMetrics')}
          className="bg-white shadow rounded p-4 font-semibold text-xl hover:bg-gray-100"
        >
          CPU
        </button>
        <button
          onClick={() => handleMetricClick('diskMetrics')}
          className="bg-white shadow rounded p-4 font-semibold text-xl hover:bg-gray-100"
        >
          Disk
        </button>
        <button
          onClick={() => handleMetricClick('memoryMetrics')}
          className="bg-white shadow rounded p-4 font-semibold text-xl hover:bg-gray-100"
        >
          Memory
        </button>
        <button
          onClick={() => handleMetricClick('networkMetrics')}
          className="bg-white shadow rounded p-4 font-semibold text-xl hover:bg-gray-100"
        >
          Network
        </button>
      </div>
    </div>
  );
}
