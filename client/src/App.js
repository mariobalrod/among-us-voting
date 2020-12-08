import { useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function App() {

  useEffect(() => {
    const socket = io.connect(ENDPOINT);
    
    socket.emit('message', 'hello')
    
    socket.on('connect', () => {
      console.log('Connected: ', socket.id)
    });
  }, [])

  return (
    <div className="App">
      <h1>React App</h1>
    </div>
  );
}

export default App;
