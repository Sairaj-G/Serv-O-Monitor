from data_models import *
import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS


token = "W_yCgnGlWTh-SpqZZ_alZ7ZUYBo3xf02z6AteuqYRthqQlu6xOpQf7PzRwh8dEgQ15DBDDV7MPq-x2CIF4hVYA=="
org = "ORG_NAME"
url = "http://localhost:8086"
write_client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)
write_api = write_client.write_api(write_options=SYNCHRONOUS)
bucket = "BUCKET_NAME"


def log_cpu_metric():
    cpu_metric = CPUMetrics()
    point = Point("cpu_metrics") \
    .field("util_percent", cpu_metric.util_percent) \
    .field("num_logical_cores", cpu_metric.num_logical_cores) \
    .field("num_physical_cores", cpu_metric.num_physical_cores) \
    .field("cpu_freq", cpu_metric.cpu_freq) \
    .field("max_freq", cpu_metric.max_freq) \
    .field("num_processes", cpu_metric.num_processes)
        
    write_api.write(bucket=bucket, org="ORG_NAME", record=point)

def log_disk_metrics():
    disk_metric = DiskMetrics()
    point = Point("disk_metrics") \
    .field("read_speed", disk_metric.read_speed) \
    .field("write_speed", disk_metric.write_speed)\
    .field("active_time", disk_metric.active_time)

    write_api.write(bucket=bucket, org="ORG_NAME", record=point)

