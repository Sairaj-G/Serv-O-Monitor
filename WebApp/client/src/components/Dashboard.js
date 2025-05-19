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
  <div style={{
    backgroundColor: 'white',
    backdropFilter: 'blur(12px)',
    borderRadius: '1rem',
    padding: '1.5rem',
    color: '#1f2937',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    borderLeft: '8px solid',
    borderColor: title.includes('CPU') ? '#f87171' : title.includes('RAM') ? '#34d399' : '#60a5fa',
  }}>
    <h2 style={{
      fontWeight: 'bold',
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#111827',
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    }}>{title}</h2>
    {isLoading ? (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '16rem'
      }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          border: '4px solid #3b82f6',
          borderTopColor: 'transparent',
          borderRadius: '9999px',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    ) : error ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#b91c1c',
        height: '16rem',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        <p style={{ marginTop: '0.5rem', fontWeight: '500' }}>{error}</p>
      </div>
    ) : (
      <div style={{ height: '16rem', width: '100%' }}>
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
                title: { display: true, text: '% Usage', color: '#1f2937' },
                grid: { color: 'rgba(0,0,0,0.1)' },
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
          backgroundColor: 'rgba(59,130,246,0.3)',
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #312e81, #7c3aed, #be185d)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2.5rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          System Monitoring Dashboard
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.5rem',
          alignItems: 'center',
        }}>
          <select
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            style={{
              padding: '0.75rem',
              backgroundColor: 'white',
              color: '#1f2937',
              borderRadius: '0.5rem',
              width: '100%',
              maxWidth: '300px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <option value="">Select IP</option>
            {ips.map((ip) => (
              <option key={ip} value={ip}>{ip}</option>
            ))}
          </select>

          <select
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            style={{
              padding: '0.75rem',
              backgroundColor: 'white',
              color: '#1f2937',
              borderRadius: '0.5rem',
              width: '100%',
              maxWidth: '300px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <option value={5}>Last 5 Minutes</option>
            <option value={10}>Last 10 Minutes</option>
            <option value={15}>Last 15 Minutes</option>
            <option value={30}>Last 30 Minutes</option>
            <option value={60}>Last 60 Minutes</option>
            <option value={75}>Last 75 Minutes</option>
            <option value={100}>Last 100 Minutes</option>
            <option value={1440}>Last 1 Day</option>
            <option value={2880}>Last 2 Days</option>
            <option value={7200}>Last 5 Days</option>
            <option value={10080}>Last 1 week</option>
          </select>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: '600',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
              }}
            >
              Submit
            </button>
            <button
              onClick={handleRefresh}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#e5e7eb',
                color: '#1f2937',
                borderRadius: '0.5rem',
                fontWeight: '600',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
            >
              ↻
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <span style={{ marginRight: '0.5rem', fontSize: '1.25rem' }}>⚠️</span>
            <span style={{ fontWeight: '500' }}>{error}</span>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {[{ key: 'cpuMetrics', label: 'CPU', gradient: '#f87171' },
            { key: 'diskMetrics', label: 'Disk', gradient: '#facc15' },
            { key: 'memoryMetrics', label: 'Memory', gradient: '#4ade80' },
            { key: 'networkMetrics', label: 'Network', gradient: '#60a5fa' }]
            .map(({ key, label, gradient }) => (
              <button
                key={key}
                onClick={() => handleMetricClick(key)}
                style={{
                  backgroundColor: gradient,
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                }}
              >
                {label}
              </button>
            ))}
        </div>

        {submitted && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}>
            <ChartCard title="CPU Usage" data={formatChartData(cpuData)} isLoading={isLoading} error={error} />
            <ChartCard title="RAM Usage" data={formatChartData(ramData)} isLoading={isLoading} error={error} />
          </div>
        )}
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
