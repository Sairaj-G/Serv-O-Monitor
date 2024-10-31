import psutil

def get_ram_memory_total_GB():
    ram_memory_total = psutil.virtual_memory()[0]/(1024**3)
    return ram_memory_total

def get_ram_memory_used_GB():
    ram_memory_used = psutil.virtual_memory()[3]/(1024**3)
    return ram_memory_used

def get_ram_memory_used_percentage():
    ram_memory_used_perc = psutil.virtual_memory()[2]
    return ram_memory_used_perc

def get_swap_memory_total_GB():
    swap_memory_total = psutil.swap_memory()[0]/(1024**3)
    return swap_memory_total

def get_swap_memory_used_GB():
    swap_memory_used = psutil.swap_memory()[1]/(1024**3)
    return swap_memory_used