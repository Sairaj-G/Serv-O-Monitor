const express = require("express");
const router = express.Router();
const {Users} = require("../models");

const org = "Servo-monitor"
const bucket = "metrics_data"
const mytoken = "4nv73YDP8FmP27gspMhYpar4LRYRmf0bmtwEYHVYjeUhieXNxYXPeqTvL3LDSws5trwYhSwhwxqX_fdGwdE8bQ=="
const myurl = 'http://localhost:8086'

//To Authenticate Ip
router.get("/authUser", async(req, res)=>{
    const IPs = await Users.findAll({
        where: {
            IPaddress: req.body.IPaddress
        }
    });
    res.json(IPs);    
});

router.get("/cpuMetrics", async(req, res)=>{
  const {InfluxDB, Point} = require('@influxdata/influxdb-client')
  const token = mytoken
  const url = myurl

  const client = new InfluxDB({url, token})

  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "${bucket}")
  |> range(start: -${req.body.time}m)
  |> filter(fn: (r) => r._measurement == "cpu_metrics" and r.IPaddress == "${req.body.ip}")`
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
  |> range(start: -${req.body.time}m)
  |> filter(fn: (r) => r._measurement == "disk_metrics" and r.IPaddress == "${req.body.ip}")`
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
  |> range(start: -${req.body.time}m)
  |> filter(fn: (r) => r._measurement == "network_metrics" and r.IPaddress == "${req.body.ip}")`
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
  |> range(start: -${req.body.time}m)
  |> filter(fn: (r) => r._measurement == "memory_metrics" and r.IPaddress == "${req.body.ip}")`
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

//To Add Ip
router.post("/addUser", async (req, res)=>{
    const ipObject = req.body;
    // const password = req.Password;
    await Users.create(ipObject);
    res.json(ipObject);
    console.log(req);
});

module.exports = router