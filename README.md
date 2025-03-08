# Serv-O-Monitor Project README

## Introduction

**Serv-O-Monitor** is a real-time server monitoring application designed to fetch metrics from a server and store them in **InfluxDB** for analysis. The app monitors the server where it is installed, collects vital metrics (like CPU usage, memory usage, disk space, etc.), and pushes this data to an InfluxDB database. Afterward, the backend APIs retrieve this data from InfluxDB and present it on the frontend for visualization.

With **Serv-O-Monitor**, you can track server health and performance in real-time, making it an essential tool for system administrators and DevOps teams.

---

## Setting Up

### 1. **Prerequisites**

Before you start running the app, make sure the following software is installed on your system:

- **Docker**: Required for generating the Docker image to run the scripts for fetching server metrics.
  - [Download Docker](https://www.docker.com/get-started)
  
- **Node.js**: Required for running the backend server and APIs.
  - [Download Node.js](https://nodejs.org/)

### 2. **Steps to Run the App**

Follow these steps to get the **Serv-O-Monitor** application up and running:
1. **Fork the Repository**:
   - Click on the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**:
   - Clone your fork to your local machine using Git:

     ```bash
     git clone https://github.com/Sairaj-G/Serv-O-Monitor.git
     ```
    
3. **Set up InfluxDB**:

   - It is recommended that you use their official docker image as it is easier than downloading the binaries and setting them up.
   - Follow the [link](https://hub.docker.com/_/influxdb) for detailed instructions to setup InfluxDB docker container.
   - You need to generate an **API token** for secure access to InfluxDB. 
   - Follow the official [InfluxDB setup guide](https://docs.influxdata.com/influxdb/v2.0/get-started/) to create the token.

4. **Run the python script**
   - Install all the required python packages by running the following command in the machine-metrics directory.
    ```Bash
    pip install -r requirements.txt
    ```
   - Make sure you update the constants.py file with the newly generated API token and other variables from Influx. 
   - Run the main.py script and make sure that the data is being uploaded to the database. 

5. **Setting up the backend**
   - Make sure you have node installed on your machine.
   - Run the following commands to install all the required node packages in the webapp/server directory.
   ```bash
   npm install
   ```
   - Start the node server with the following command
   ```
   npm start
   ```

## Contributing

We welcome contributions to **Serv-O-Monitor**! If you'd like to contribute, make sure you drop a comment to an open issue of your choice and get it assigned. Once an issue is assigned to you, please follow the steps below:

1. **Create a Branch**:
   - Create a new branch for your changes:

     ```bash
     git checkout -b your-feature-branch
     ```

2. **Make Your Changes**:
   - Make the necessary changes and test them locally.

3. **Commit and Push Your Changes**:
   - Commit your changes with a descriptive message:

     ```bash
     git commit -am "Description of your changes"
     ```

   - Push your branch to your fork:

     ```bash
     git push origin your-feature-branch
     ```

4. **Create a Pull Request**:
   - Go to your fork on GitHub and click on "Compare & Pull Request" to submit your changes for review.
