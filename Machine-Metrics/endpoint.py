from flask import Flask, jsonify
from machine_metrics_logger import metrics_in_json



app = Flask(__name__)
@app.route('/machine-metrics', methods=['GET'])
def get_data():
    print(metrics_in_json)
    return jsonify(metrics_in_json)

if __name__ == '__main__':
    app.run(debug=True)