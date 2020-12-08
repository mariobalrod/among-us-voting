import { useEffect, useState, useCallback } from 'react';
import { v4 } from 'uuid';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
const socket = io.connect(ENDPOINT);

function App() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    socket.on('current_clients', (data) => {
      setClients([...clients, data]);
    });
  }, [clients, setClients])

  const handleLogin = useCallback(
    () => {
      socket.emit('clients', {name: 'Eduardo', id: socket.id})
    },
    []
  )

  return (
    <div className="App">
      <h1>React App</h1>
      <button onClick={handleLogin}>Login</button> 
      
      {clients.map(client => (<p key={v4()}>{client.id + ' -- ' + client.name}</p>))}
    </div>
  );
}

export default App;
