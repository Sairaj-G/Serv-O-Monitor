import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function MetricDetails({ ip, time }) {
  const { type } = useParams();
  const [transposedRows, setTransposedRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (ip && time) {
      axios
        .get(`http://localhost:3001/getParams/${type}?time=${time}&ip=${ip}`)
        .then(res => {
          const raw = res.data;
          const grouped = {};

          Object.entries(raw).forEach(([key, value]) => {
            const lastSpaceIndex = key.lastIndexOf(' ');
            const metricType = key.substring(0, lastSpaceIndex);
            const index = parseInt(key.substring(lastSpaceIndex + 1), 10);

            if (!grouped[metricType]) grouped[metricType] = [];
            grouped[metricType][index] = value;
          });

          // Extract and flatten non-dash entries from each metric
          const cleaned = {};
          Object.entries(grouped).forEach(([metric, values]) => {
            cleaned[metric] = values.filter(v => v !== '-' && v !== undefined);
          });

          const maxLength = Math.max(...Object.values(cleaned).map(arr => arr.length));
          const rows = [];

          for (let i = 0; i < maxLength; i++) {
            const row = {};
            let hasValue = false;

            for (const metric in cleaned) {
              const val = cleaned[metric][i];
              if (val !== undefined) {
                row[metric] = val;
                hasValue = true;
              }
            }

            if (hasValue) rows.push(row);
          }

          setTransposedRows(rows);
        })
        .catch(err => console.error(err));
    }
  }, [type, ip, time]);

  const metrics = Object.keys(transposedRows[0] || {});

  return (
    <div style={{ minHeight: '100vh', padding: '2vw', backgroundColor: '#f3f4f6', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3vh' }}>
        <h1 style={{ fontSize: '2.5vw', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {type.replace('Metrics', '')} Metrics
        </h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '1.2vh 2vw',
            backgroundColor: '#d1d5db',
            borderRadius: '0.5vw',
            fontSize: '1.2vw',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
        >
          Back
        </button>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '0.5vw',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr>
            <th style={{ padding: '1vh 2vw', textAlign: 'left', fontSize: '1.4vw' }}>Index</th>
            {metrics.map((metric, i) => (
              <th key={i} style={{ padding: '1vh 2vw', textAlign: 'left', fontSize: '1.4vw', textTransform: 'capitalize' }}>
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transposedRows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ padding: '1vh 2vw', fontSize: '1.3vw' }}>{idx + 1}</td>
              {metrics.map((metric, i) => (
                <td key={i} style={{ padding: '1vh 2vw', fontSize: '1.3vw' }}>
                  {row[metric] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
