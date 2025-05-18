from network import get_hostname, get_ip_address
import os

HOST_NAME = get_hostname()
IP_ADDRESS = get_ip_address()
API_TOKEN = os.getenv('API_TOKEN', 'admin-token')
ORG_NAME = os.getenv('ORG_NAME', 'ORG_NAME')
URL = os.getenv('URL', 'http://localhost:8086')
BUCKET_NAME = os.getenv('BUCKET_NAME', 'BUCKET_NAME')