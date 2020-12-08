from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler

# Flask Server Initialization 
app = Flask(__name__)

# Secret Word app configuration for Socketio
app.config['SECRET_KEY'] = 'secret'

# Connection Socket -- Flask
socketio = SocketIO(app)

# Adding cors to the app
CORS(app)

# Adding principal server Route which return Hello word 
@app.route('/')
def index():
    return 'Hello world!'

# Add an socketio envent
@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)

    # Get msg and return with broadcast for all clients
    send(msg, broadcast = True)

@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    print('An error occurred:')
    print(e)

# Running server
if __name__ == '__main__':
    # socketio.run(app)
    http_server = WSGIServer(('',5000), app, handler_class=WebSocketHandler)
    http_server.serve_forever()