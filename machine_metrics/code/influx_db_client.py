from data_models import *
import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from constants import *


write_client = influxdb_client.InfluxDBClient(url=URL, token= API_TOKEN, ORG_NAME=ORG_NAME)
write_api = write_client.write_api(write_options=SYNCHRONOUS)

def log_cpu_metric():
    cpu_metric = CPUMetrics()

    point = Point("cpu_metrics") \
    .tag("IPaddress", f"{IP_ADDRESS}")\
    .field("util_percent", cpu_metric.util_percent) \
    .field("num_logical_cores", cpu_metric.num_logical_cores) \
    .field("num_physical_cores", cpu_metric.num_physical_cores) \
    .field("cpu_freq", cpu_metric.cpu_freq) \
    .field("max_freq", cpu_metric.max_freq) \
    .field("num_processes", cpu_metric.num_processes) \
    .field("num_threads", cpu_metric.num_threads)
    
    write_api.write(bucket = BUCKET_NAME, org = ORG_NAME, record = point)

def log_disk_metrics():
    disk_metric = DiskMetrics()
    point = Point("disk_metrics") \
    .tag("IPaddress", f"{IP_ADDRESS}")\
    .field("read_speed", disk_metric.read_speed) \
    .field("write_speed", disk_metric.write_speed)\
    .field("active_time", disk_metric.active_time)

    write_api.write(bucket = BUCKET_NAME, org = ORG_NAME, record = point)

def log_network_metric():
    network_metric = NetworkMetrics()
    point = Point("network_metrics") \
    .tag("IPaddress", f"{IP_ADDRESS}")\
    .field("host_name", network_metric.host_name) \
    .field("ip_address", network_metric.ip_address) \
    .field("wifi_signal_strength_percent", network_metric.wifi_signal_strength_percent) \
    .field("interface_name", network_metric.interface_name) \
    .field("download_speed", network_metric.download_speed) \
    .field("upload_speed", network_metric.upload_speed)
        
    write_api.write(bucket = BUCKET_NAME, org = ORG_NAME, record = point)

def log_memory_metrics():
    memory_metric = MemoryMetrics()
    point = Point("memory_metrics") \
    .tag("IPaddress", f"{IP_ADDRESS}")\
    .field("ram_memory_total_GB", memory_metric.ram_memory_total_GB) \
    .field("ram_memory_used_GB", memory_metric.ram_memory_used_GB)\
    .field("ram_usage_percent", memory_metric.ram_usage_percent)\
    .field("swap_memory_GB", memory_metric.swap_memory_GB)\
    .field("swap_memory_used_GB", memory_metric.swap_memory_used_GB)

    write_api.write(bucket = BUCKET_NAME, org = ORG_NAME, record = point)
