const express = require("express");
const router = express.Router();

require("dotenv").config();

const org = process.env.ORG || "Servo-monitor"
const bucket = process.env.BUCKET || "metrics_data"
const mytoken = process.env.MYTOKEN || "VnobvVWHxMg8ZG5HIUY6VP0nweVxiqPr91P08mlgCyNOBvHOWNZ3ZZRdXgYkm0JHBWT38myBOJYcXndgACiNGw=="
const myurl = process.env.MYURL || 'http://127.0.0.1:8086'
router.get("/cpuMetrics", async(req, res)=>{
  const {InfluxDB, Point} = require('@influxdata/influxdb-client')
  const token = mytoken
  const url = myurl

  const client = new InfluxDB({url, token})

  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -${req.query.time}m)
  |> filter(fn: (r) => r._measurement == "cpu_metrics" and r.IPaddress == "${req.query.ip}")`
  const data = []
  const final_object = {};
  queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
      //   res.json(tableObject);
        const field = tableObject['_field']
        const value = tableObject['_value']
        data.push({field,value});
        // console.log(tableObject['_field']+" "+tableObject['_value'])
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        data.forEach((item, index) => {
              final_object[`${item.field} ${index}`] = item.value;
            });
        res.json(final_object);
        console.log('\nSuccess')
      },
    });
});

router.get("/diskMetrics", async(req, res)=>{
  const {InfluxDB, Point} = require('@influxdata/influxdb-client')
  const token = mytoken
  const url = myurl

  const client = new InfluxDB({url, token})

  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -${req.query.time}m)
  |> filter(fn: (r) => r._measurement == "disk_metrics" and r.IPaddress == "${req.query.ip}")`
  const data = []
  const final_object = {};
  queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
      //   res.json(tableObject);
        const field = tableObject['_field']
        const value = tableObject['_value']
        data.push({field,value});
        // console.log(tableObject['_field']+" "+tableObject['_value'])
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        data.forEach((item, index) => {
              final_object[`${item.field} ${index}`] = item.value;
            });
        res.json(final_object);
        console.log('\nSuccess')
      },
    });
});

router.get("/networkMetrics", async(req, res)=>{
  const {InfluxDB, Point} = require('@influxdata/influxdb-client')
  const token = mytoken
  const url = myurl

  const client = new InfluxDB({url, token})

  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -${req.query.time}m)
  |> filter(fn: (r) => r._measurement == "network_metrics" and r.IPaddress == "${req.query.ip}")`
  const data = []
  const final_object = {};
  queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
      //   res.json(tableObject);
        const field = tableObject['_field']
        const value = tableObject['_value']
        data.push({field,value});
        // console.log(tableObject['_field']+" "+tableObject['_value'])
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        data.forEach((item, index) => {
              final_object[`${item.field} ${index}`] = item.value;
            });
        res.json(final_object);
        console.log('\nSuccess')
      },
    });
});

router.get("/memoryMetrics", async(req, res)=>{
  const {InfluxDB, Point} = require('@influxdata/influxdb-client')
  const token = mytoken
  const url = myurl

  const client = new InfluxDB({url, token})

  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket:"${bucket}")
  |> range(start: -${req.query.time}m)
  |> filter(fn: (r) => r._measurement == "memory_metrics" and r.IPaddress == "${req.query.ip}")`
  const data = []
  const final_object = {};
  queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
      //   res.json(tableObject);
        const field = tableObject['_field']
        const value = tableObject['_value']
        data.push({field,value});
        // console.log(tableObject['_field']+" "+tableObject['_value'])
      },
      error: (error) => {
        console.error('\nError', error)
      },
      complete: () => {
        data.forEach((item, index) => {
              final_object[`${item.field} ${index}`] = item.value;
            });
        res.json(final_object);
        console.log('\nSuccess')
      },
    });
});


module.exports = router