import styled from 'styled-components';

const Container = styled.div`
  width: 450px;
  height: 130px;
  padding: 40px;
  background-color: #ccc;
  color: #38433f;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Votation = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.variant === "yes" ? "green" : "red")};
  outline: none;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Name = styled.h2`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const Color = styled.h4`
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  color: ${(props) => props.color};
`;


const AmongCard = ({currentPlayer, player, handleVote, hideVotation}) => {
  return (
    <Container>
      <Section>
        <Name>{player.username}</Name>
        <Color color={player.color}>{player.color}</Color>
      </Section>

      <Name>{player.votations}</Name>

      {hideVotation && currentPlayer.id !== player.id (
        <Votation>
          <Button onClick={() => handleVote(player.id)} variant="yes"></Button>
          <Button variant="no"></Button>
        </Votation>
      )}
    </Container>
  );
}

export default AmongCard;