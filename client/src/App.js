import { useEffect, useState, useCallback } from 'react';
import { v4 } from 'uuid';
import io from 'socket.io-client';
import styled from 'styled-components';

import Form from './components/Form'; 
import AmongCard from './components/AmongCard'; 

const ENDPOINT = 'http://localhost:5000';
const socket = io.connect(ENDPOINT);

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 50px;
  width: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

function App() {
  const [currentPlayer, setCurrentPlayer] = useState();
  const [hideVotation, setHideVotation] = useState(true);
  const [players, setPlayers] = useState([]);
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
    socket.on("current_vote", (res) => {
      console.log(res);
      const newPlayersState = players.map((player) => {
        if (player.id === res.id) {
          return res;
        }
        return player;
      });

      setPlayers(newPlayersState);
    });

    socket.on("current_color", (data) => {
      if (colors.includes(data)) {
        const newColors = removeItemFromArr(colors, data);

        setColors(newColors);
      }
    });

    socket.on("current_players", (data) => {
      setPlayers([...players, JSON.parse(data)]);
    });
  }, [players, setPlayers, colors, setColors]);

  const handleHideVotation = useCallback(() => {
    setHideVotation(false);
  }, [setHideVotation]);

  const handleVote = useCallback(
    (playerVoted) => {
      playerVoted.votations = playerVoted.votations + 1;

      socket.emit("vote", playerVoted);
      handleHideVotation();
    },
    [handleHideVotation]
  );

  const handleLogin = useCallback(
    (nombre, color) => {
      if (!nombre || !color) {
        alert("All required!");
      } else {
        const newCurrentPlayer = {
          username: nombre,
          color: color,
          votations: 0,
          id: v4(),
        };

        setCurrentPlayer(newCurrentPlayer);

        socket.emit("color", color);

        socket.emit("players", JSON.stringify(newCurrentPlayer));

        setHideForm(false);
      }
    },
    [setHideForm, setCurrentPlayer]
  );

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Socketio, Flask and React Chat</h1>
      {currentPlayer && <h3 style={{ textAlign: "center" }}>You are {currentPlayer.username}</h3>}
      <h3>
        {hideForm && <Form colors={colors} handleLogin={handleLogin} />}
        {!hideForm && (
          <Container>
            <Content>
              {players.map((player) => (
                <AmongCard
                  key={player.id}
                  currentPlayer={currentPlayer}
                  player={player}
                  handleVote={handleVote}
                  hideVotation={hideVotation}
                />
              ))}
            </Content>
          </Container>
        )}
      </h3>
    </div>
  );
}

export default App;
