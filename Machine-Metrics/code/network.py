import psutil
import socket
import speedtest
import subprocess
import re

network = speedtest.Speedtest(secure=True)

def get_hostname():
    hostname = socket.gethostname()
    return hostname

def get_ip_address():
    hostname = get_hostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address

def get_wifi_signal_strength_percentage():
    # Run the command to get Wi-Fi details
    result = subprocess.run(["iwconfig"], capture_output=True, text=True)
    # Extract the signal strength from the command output
    match = re.search(r"Signal level=(-?\d+) dBm", result.stdout)
    if match:
        # Convert dBm to percentage (approximation)
        signal_level = int(match.group(1))
        # Signal level usually ranges from -100 (weak) to -30 (strong)
        percentage = max(0, min(100, 2 * (signal_level + 100)))  # Normalize to 0-100
        return percentage
    return None

def get_interface_name():
    net_if_addrs = psutil.net_if_addrs()
    net_if_stats = psutil.net_if_stats()

    for interface_name, interface_info in net_if_addrs.items():
        if net_if_stats[interface_name].isup:
            return interface_name
    
    return None 

def get_download_speed():
    download_speed = network.download()
    return download_speed

def get_upload_speed():
    upload_speed = network.upload()
    return upload_speed

def get_hostname():
    hostname = socket.gethostname()
    return hostname

def get_ip_address():
    hostname = get_hostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address