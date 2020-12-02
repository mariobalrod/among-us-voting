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
    return 'Hello Word!'


# Running server
if __name__ == '__main__':
    socketio.run(app)