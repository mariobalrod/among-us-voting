from flask import Flask, render_template
from flask_socketio import SocketIO, send

# Flask Server Initialization 
app = Flask(__name__)

# Secret Word app configuration for Socketio
app.config['SECRET_KEY'] = 'secret'

# Connection Socket -- Flask
socketio = SocketIO(app)

# Adding principal server Route which return Hello word 
@app.route('/')
def index():
    return render_template('index.html')

# Add an socketio envent
@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)

    # Get msg and return with broadcast for all clients
    send(msg, broadcast = True)

# Running server
if __name__ == '__main__':
    socketio.run(app)