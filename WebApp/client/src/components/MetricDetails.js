import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function MetricDetails({ ip, time }) {
  const { type } = useParams();
  const [groupedData, setGroupedData] = useState({});
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

          setGroupedData(grouped);
        })
        .catch(err => console.error(err));
    }
  }, [type, ip, time]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2vw',
        backgroundColor: '#f3f4f6',
        overflowX: 'auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3vh'
        }}
      >
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

      <table
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '1vh 1vw',
          backgroundColor: 'white',
          borderRadius: '0.5vw',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <tbody>
          {Object.entries(groupedData).map(([metricType, values], idx) => (
            <tr key={idx}>
              <td
                style={{
                  padding: '1vh 2vw',
                  fontWeight: '600',
                  fontSize: '1.4vw',
                  whiteSpace: 'nowrap'
                }}
              >
                {metricType}
              </td>
              {values.map((val, i) => (
                <td
                  key={i}
                  style={{
                    padding: '1vh 2vw',
                    fontSize: '1.3vw'
                  }}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

