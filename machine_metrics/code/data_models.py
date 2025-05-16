from disk import *
from cpu import *
from memory import *
from network import *

class CPUMetrics:

    util_percent = 0
    num_logical_cores = 0
    num_physical_cores = 0
    cpu_freq = 0
    max_freq = 0
    num_processes = 0
    num_threads = 0

    def __init__(self):
        self.num_physical_cores = get_num_physical_cores()
        self.num_logical_cores = get_num_logical_cores()
        self.util_percent = get_cpu_util_percent()
        self.cpu_freq = get_cpu_freq()
        self.max_freq = get_max_freq()
        self.num_processes = get_num_processes()
        self.num_threads = get_num_threads()

class DiskMetrics:

    read_speed = 0
    write_speed = 0
    active_time = 0

    def __init__(self):
        self.read_speed = get_disk_read_speed()
        self.write_speed = get_disk_write_speed()
        self.active_time = get_active_time()

class NetworkMetrics:

    host_name = ""
    ip_address = ""
    wifi_signal_strength_percent = 0
    interface_name = ""
    download_speed = 0
    upload_speed = 0

    def __init__(self):
        self.host_name = get_hostname()
        self.ip_address = get_ip_address()
        ##self.wifi_signal_strength_percent = get_wifi_signal_strength_percentage()
        self.interface_name = get_interface_name()
        self.download_speed = get_download_speed()
        self.upload_speed = get_upload_speed()

class MemoryMetrics:

    ram_memory_total_GB = 0
    ram_memory_used_GB = 0
    ram_usage_percent = 0
    swap_memory_GB = 0
    swap_memory_used_GB = 0

    def __init__(self):
        self.ram_memory_total_GB = get_ram_memory_total_GB()
        self.ram_memory_used_GB = get_ram_memory_total_GB()
        self.ram_usage_percent = get_ram_memory_used_percentage()
        self.swap_memory_GB = get_swap_memory_total_GB()
        self.swap_memory_used_GB = get_swap_memory_total_GB()