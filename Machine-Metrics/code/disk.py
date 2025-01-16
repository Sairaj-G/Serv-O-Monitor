import psutil
import time

def get_disk_read_speed():
    initial_disk_io = psutil.disk_io_counters()
    initial_read_bytes = initial_disk_io.read_bytes

    time.sleep(1)

    final_disk_io = psutil.disk_io_counters()
    final_read_bytes = final_disk_io.read_bytes

    return (final_read_bytes - initial_read_bytes) / 1000

def get_disk_write_speed():
    initial_disk_io = psutil.disk_io_counters()
    initial_write_bytes = initial_disk_io.write_bytes

    time.sleep(1)

    final_disk_io = psutil.disk_io_counters()
    final_write_bytes = final_disk_io.write_bytes
    
    return (final_write_bytes - initial_write_bytes) / 1000

def get_active_time():
    initial_disk_io = psutil.disk_io_counters()
    initial_active_time = initial_disk_io.write_time + initial_disk_io.read_time  # in ms

    time.sleep(1)

    final_disk_io = psutil.disk_io_counters()
    final_active_time = final_disk_io.write_time + final_disk_io.read_time  # in ms

    activity_time = (final_active_time - initial_active_time)   

    return activity_time
