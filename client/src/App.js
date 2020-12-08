import { useEffect, useState, useCallback } from 'react';
import { v4 } from 'uuid';
import io from 'socket.io-client';

import Form from './components/Form'; 

const ENDPOINT = 'http://localhost:5000';
const socket = io.connect(ENDPOINT);

function App() {
  const [clients, setClients] = useState([]);
  const [colors, setColors] = useState([
    "red",
    "green",
    "yellow",
    "blue",
    "black",
  ]);
  const [hideForm, setHideForm] = useState(true);

  function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
    return arr;
  }

  useEffect(() => {
    socket.on("current_color", (data) => {
      if (colors.includes(data)) {
        const newColors = removeItemFromArr(colors, data);

        setColors(newColors);
      }
    });

    socket.on("current_clients", (data) => {
      setClients([...clients, JSON.parse(data)]);
    });
  }, [clients, setClients, colors, setColors]);

  const handleLogin = useCallback(
    (nombre, color) => {
      if (!nombre || !color) {
        alert("All required!");
      } else {
        socket.emit("color", color);

        socket.emit(
          "clients",
          JSON.stringify({
            username: nombre,
            color: color,
            votations: 0,
            id: v4(),
          })
        );

        setHideForm(false);
      }
    },
    [setHideForm]
  );

  return (
    <div className="App">
      <h1>Socketio, Flask and React Chat</h1>
      <>
        {hideForm && <Form colors={colors} handleLogin={handleLogin} />}
        {!hideForm &&
          clients.map((client) => (
            <p key={client.id}>{JSON.stringify(client)}</p>
          ))}
      </>
    </div>
  );
}

export default App;
