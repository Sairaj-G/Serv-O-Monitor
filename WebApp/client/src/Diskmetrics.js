import React, { useState, useEffect } from 'react';
import MetricsDisplay from './MetricsDisplay';
import axios from 'axios';
function Diskmetrics(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/getParams/diskMetrics?time=${props.time}&ip=${props.ip}`)
      .then(response => {
        // console.log("Fetched CPU metrics:", response.data); // This shows in browser console
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching CPU metrics:", error);
      });
  }, []);

  return (
    <div style={{height:'50vh', width:'72vw', overflowY:'scroll', marginLeft:'54vw', marginTop:'-23vw'}}>
    {data ? <MetricsDisplay metrics={data} heading='Disk Metrics'/> : <p>Loading...</p>}
    </div>
  );
}

export default Diskmetrics;
