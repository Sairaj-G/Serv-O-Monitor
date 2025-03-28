const express = require("express");
const router = express.Router();

require("dotenv").config();

const org = process.env.ORG || "ORG_NAME"
const bucket = process.env.BUCKET || "BUCKET_NAME"
const mytoken = process.env.MYTOKEN || "IdVszge1TJR1rc_UwHKwZ3lhyD7rpVd7Sp8jZQ7vQ_yEziF7gTCz9gSjE7Ui3ZXUDW4nfgzqXpKejqec6iyjSQ=="
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