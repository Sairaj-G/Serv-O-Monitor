import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MetricDetails from './components/MetricDetails';

export default function App() {
  const [ip, setIp] = useState('');
  const [time, setTime] = useState(5);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard ip={ip} setIp={setIp} time={time} setTime={setTime} />} />
        <Route path="/metrics/:type" element={<MetricDetails ip={ip} time={time} />} />
      </Routes>
    </Router>
  );
}