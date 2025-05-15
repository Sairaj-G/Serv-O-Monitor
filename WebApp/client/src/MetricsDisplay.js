import React from 'react';

function MetricsDisplay({ metrics, heading}) {
  // console.log(metrics);
  const cleanMetrics = Object.entries(metrics).map(([key, value]) => {
    const cleanedKey = key.replace(/\s\d+$/, ''); // Removes trailing index like " 0", " 1", etc.
    return [cleanedKey, value];
  });

  return (
    <div style={{paddingLeft: '30vw'}}>
      <h1>{heading}</h1>
    <table style={{ margin: '5vh auto', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '0.1vw solid #ccc', padding: '0.5vw' }}>Metric</th>
          <th style={{ border: '0.1vw solid #ccc', padding: '0.5vw' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {cleanMetrics.map(([key, value]) => (
          <tr key={key}>
            <td style={{ border: '0.1vw solid #ccc', padding: '0.5vw' }}>{key}</td>
            <td style={{ border: '0.1vw solid #ccc', padding: '0.5vw' }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default MetricsDisplay;
