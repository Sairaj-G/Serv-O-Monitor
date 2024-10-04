from data_models import *
import threading

metrics_in_json = {}

def update_metrics():
    global metrics_in_json
    while True:
        cpu_metric = CPUMetrics()
        disk_metric = DiskMetrics()
        #network_metric = NetworkMetrics()
        memory_metric = MemoryMetrics()

        all_metrics = cpu_metric.__dict__
        all_metrics.update(disk_metric.__dict__)
        #all_metrics.update(network_metric.__dict__)
        all_metrics.update(memory_metric.__dict__)

        metrics_in_json.clear()
        metrics_in_json.update(all_metrics)

        print(metrics_in_json)
        time.sleep(60)

threading.Thread(target=update_metrics, daemon=True).start()


