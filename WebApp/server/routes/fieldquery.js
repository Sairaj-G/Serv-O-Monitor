// routes/influx.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const INFLUX_URL = 'http://localhost:8086/query';
const INFLUX_DB = 'BUCKET_NAME';

router.get('/fieldkeys', async (req, res) => {
    try {
    const query = 'SHOW TAG VALUES FROM "cpu_metrics" WITH KEY = "IPaddress"';
    const response = await axios.get(INFLUX_URL, {
      params: {
        db: INFLUX_DB,
        q: query,
        pretty: true
      },
      headers: {
        Authorization: `Token admin-token`
      }
    });

    const values = response.data?.results?.[0]?.series?.[0]?.values || [];

    const ipAddresses = values.map(([key, value]) => value); // Extract just the tag values

    res.json({ ipAddresses });
  } catch (err) {
    console.error('Error fetching tag values:', err.message);
    res.status(500).json({ error: 'Failed to fetch tag values' });
  }
});


module.exports = router;
