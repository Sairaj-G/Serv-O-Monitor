from network import get_hostname, get_ip_address
import os

HOST_NAME = get_hostname()
IP_ADDRESS = get_ip_address()
API_TOKEN = os.getenv('API_TOKEN', 'VnobvVWHxMg8ZG5HIUY6VP0nweVxiqPr91P08mlgCyNOBvHOWNZ3ZZRdXgYkm0JHBWT38myBOJYcXndgACiNGw==')
ORG_NAME = os.getenv('ORG_NAME', 'Servo-monitor')
URL = os.getenv('URL', 'http://localhost:8086')
BUCKET_NAME = os.getenv('BUCKET_NAME', 'metrics_data')