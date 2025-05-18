import React, { useState, useEffect, useCallback, memo } from 'react';
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
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = memo(({ title, data, isLoading, error }) => (
  <div
    className={`bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-6 text-gray-800 transform transition-all hover:shadow-xl ${
      title.includes('CPU') ? 'shadow-red-200' :
      title.includes('RAM') ? 'shadow-green-200' :
      'shadow-gray-300'
    }`}
  >
    <h2 className="font-semibold text-xl mb-4 text-gray-900">{title}</h2>
    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ) : error ? (
      <div className="flex flex-col items-center text-red-700 h-64 justify-center">
        <span className="text-2xl">⚠️</span>
        <p className="mt-2 font-medium">{error}</p>
      </div>
    ) : (
      <div className="h-64 w-full">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#1f2937' } },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: '%', color: '#1f2937' },
                grid: { color: 'rgba(0,0,0,0.05)' },
              },
              x: {
                title: { display: true, text: 'Time', color: '#1f2937' },
                grid: { display: false },
              },
            },
          }}
        />
      </div>
    )}
  </div>
));

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default function Dashboard({ ip, setIp, time, setTime }) {
  const [ips, setIps] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [cpuData, setCpuData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIps = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/fieldkeys');
        setIps(res.data.ipAddresses);
      } catch (err) {
        console.error(err);
        setError('Failed to load IP addresses.');
      }
    };
    fetchIps();
  }, []);

  const formatChartData = useCallback((dataObj) => {
    const labels = dataObj.map((_, idx) => idx + 1);
    return {
      labels,
      datasets: [
        {
          label: '% Usage',
          data: dataObj,
          borderColor: 'rgba(59,130,246,1)',
          backgroundColor: 'rgba(59,130,246,0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: 'rgba(59,130,246,1)',
        },
      ],
    };
  }, []);

  const fetchGraphs = useCallback(async () => {
    if (!ip) return;
    setIsLoading(true);
    setError(null);

    try {
      const [cpuRes, ramRes] = await Promise.all([
        axios.get(`http://localhost:3001/getParams/cpuMetrics?time=${time}&ip=${ip}`),
        axios.get(`http://localhost:3001/getParams/memoryMetrics?time=${time}&ip=${ip}`),
      ]);

      const cpuUtilData = Object.entries(cpuRes.data)
        .filter(([key]) => key.includes('util_percent'))
        .map(([, value]) => value);
      setCpuData(cpuUtilData);

      const ramDataFiltered = Object.entries(ramRes.data)
        .filter(([key]) => key.includes('ram_usage_percent'))
        .map(([, value]) => value);
      setRamData(ramDataFiltered);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [ip, time]);

  useEffect(() => {
    if (submitted) fetchGraphs();
  }, [submitted, fetchGraphs]);

  const handleSubmit = () => {
    if (!ip) {
      setError('Please select an IP address.');
      return;
    }
    setSubmitted(true);
  };

  const handleRefresh = () => {
    setSubmitted(false);
    setTimeout(() => setSubmitted(true), 0);
  };

  const handleMetricClick = (metric) => {
    navigate(`/metrics/${metric}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-700 via-fuchsia-600 to-rose-600">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
          System Monitoring Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <select
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="p-3 bg-white bg-opacity-95 text-gray-800 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full sm:w-auto transition-all"
            aria-label="Select IP Address"
          >
            <option value="">Select IP</option>
            {ips.map((ip) => (
              <option key={ip} value={ip}>
                {ip}
              </option>
            ))}
          </select>

          <select
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="p-3 bg-white bg-opacity-95 text-gray-800 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full sm:w-auto transition-all"
            aria-label="Select Time Range"
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

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md font-semibold hover:from-indigo-700 hover:to-blue-700 hover:scale-105 transition-all focus:ring-2 focus:ring-blue-500"
              aria-label="Submit Selection"
            >
              Submit
            </button>
            <button
              onClick={handleRefresh}
              className="px-4 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg shadow-md font-semibold hover:from-gray-300 hover:to-gray-400 hover:scale-105 transition-all focus:ring-2 focus:ring-gray-400"
              aria-label="Refresh Data"
            >
              ↻
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-center shadow-md">
            <span className="mr-2 text-xl">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {submitted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ChartCard
              title="CPU Usage"
              data={formatChartData(cpuData)}
              isLoading={isLoading}
              error={error}
            />
            <ChartCard
              title="RAM Usage"
              data={formatChartData(ramData)}
              isLoading={isLoading}
              error={error}
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'cpuMetrics', label: 'CPU', gradient: 'from-red-400 to-red-600' },
            { key: 'diskMetrics', label: 'Disk', gradient: 'from-yellow-400 to-yellow-600' },
            { key: 'memoryMetrics', label: 'Memory', gradient: 'from-green-400 to-green-600' },
            { key: 'networkMetrics', label: 'Network', gradient: 'from-blue-400 to-blue-600' },
          ].map(({ key, label, gradient }) => (
            <button
              key={key}
              onClick={() => handleMetricClick(key)}
              className={`bg-gradient-to-r ${gradient} text-white rounded-xl p-4 font-semibold text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white`}
              aria-label={`View ${label} Details`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  ip: PropTypes.string.isRequired,
  setIp: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};
