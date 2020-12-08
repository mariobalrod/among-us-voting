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

# Connections Event
@socketio.on('connect')
def connection():
    print('New Client connected!')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

# Client Event
@socketio.on('players')
def handleNewClient(data):
    print('New player: ', data)
    emit('current_players', data, broadcast = True)

# Vote Event
@socketio.on('vote')
def handleVote(data):
    emit('current_vote', data, broadcast = True)

# Colors Event
@socketio.on('color')
def handleColor(color):
    emit('current_color', color, broadcast = True)

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