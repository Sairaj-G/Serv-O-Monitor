import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function MetricDetails({ ip, time }) {
  const { type } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (ip && time) {
      axios.get(`http://localhost:3001/getParams/${type}?time=${time}&ip=${ip}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, [type, ip, time]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{type.replace('Metrics', '')} Metrics</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="text-left p-2 border-b">Metric</th>
            <th className="text-left p-2 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="p-2 border-b font-medium">{key}</td>
              <td className="p-2 border-b">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
