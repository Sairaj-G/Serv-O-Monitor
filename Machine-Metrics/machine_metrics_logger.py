from data_models import *
from influx_db_client import *




def update_metrics():
    print("Update data called")
    while True:
        
        log_cpu_metric()
        log_disk_metrics()

        print("Added data")

        time.sleep(60)


