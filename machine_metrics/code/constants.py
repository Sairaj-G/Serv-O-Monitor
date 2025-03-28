from network import get_hostname, get_ip_address
import os

HOST_NAME = get_hostname()
IP_ADDRESS = get_ip_address()
API_TOKEN = os.getenv('API_TOKEN', 'default-api-token')
ORG_NAME = os.getenv('ORG_NAME', 'default-org')
URL = os.getenv('URL', 'http://localhost:8086')
BUCKET_NAME = os.getenv('BUCKET_NAME', 'default-bucket')