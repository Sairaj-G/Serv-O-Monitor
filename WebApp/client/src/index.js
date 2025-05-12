import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Line, Area, Pie } from 'recharts';
import { LineChart, AreaChart, PieChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const sampleData = [
  { time: '10:00', cpu: 35, memory: 50, networkUp: 20, networkDown: 40 },
  { time: '10:05', cpu: 40, memory: 55, networkUp: 25, networkDown: 35 },
  { time: '10:10', cpu: 30, memory: 45, networkUp: 22, networkDown: 38 },
  { time: '10:15', cpu: 50, memory: 60, networkUp: 30, networkDown: 45 },
];

const diskUsage = [
  { name: '/', used: 70, free: 30 },
  { name: '/home', used: 60, free: 40 },
];

export default function App() {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Serv-O-Monitor</h1>
        <div>
          <button className="bg-gray-700 px-4 py-2 rounded-xl">Refresh</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">CPU Usage</h2>
            <p className="text-2xl">50%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Memory Usage</h2>
            <p className="text-2xl">60%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Disk Usage</h2>
            <p className="text-2xl">80%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Network</h2>
            <p className="text-2xl">↑ 30 Mbps / ↓ 45 Mbps</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">CPU Usage Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Memory Usage Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sampleData}>
                <defs>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="memory" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Disk Usage</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={diskUsage} dataKey="used" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Network Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sampleData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="networkUp" stroke="#00bcd4" name="Upload" />
                <Line type="monotone" dataKey="networkDown" stroke="#f44336" name="Download" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
