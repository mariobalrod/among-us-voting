from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

""" from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler """

# Flask Server Initialization 
app = Flask(__name__)

# Flask app config
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# Adding CORS to flask App
CORS(app, resources={r"/*": {"origins": "*"}})

# Connection Socket -- Flask // and adding cors origins
socketio = SocketIO(app, cors_allowed_origins='*')

# Connection Event
@socketio.on('connect')
def connection():
    print('Someone connected to websocket!')

# Connection Event
@socketio.on('clients')
def handleNewClient(data):
    print('New client: ', data)
    emit('current_clients', data, broadcast = True)

# Message Event
@socketio.on('message')
def handleMessage(msg):
    print('Message: ', msg)
    # Get msg and return with broadcast for all clients
    send(msg, broadcast = True)

# Default Error Event
@socketio.on_error_default  
def default_error_handler(e):
    print('An error occurred: ')
    print(e)

# Error Event
@socketio.on_error  
def error_handler(e):
    print('An error occurred: ')
    print(e)

# Running server
if __name__ == '__main__':
    socketio.run(app)
    """ 
    http_server = WSGIServer(('',5000), app, handler_class=WebSocketHandler)
    http_server.serve_forever() 
    """