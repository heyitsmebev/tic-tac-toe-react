import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ActionsMenu from "./ActionsMenu";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faO, faX } from "@fortawesome/free-solid-svg-icons";

const BoardGame = () => {
  const winningCombination = useMemo(
    () => [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
    ],
    []
  );

  const [totalMoveCounter, setTotalMoveCounter] = useState<number>(0);
  const [gameResults, setGameResults] = useState<string>();
  const [playersTurn, setPlayersTurn] = useState<number>(1);
  const [playersMovesState, setPlayersMovesState] = useState<{ id: number; selectedMovesArr: number[] }[]>([
    {
      id: 1,
      selectedMovesArr: [],
    },
    {
      id: 2,
      selectedMovesArr: [],
    },
  ]);

  const handleMoves = (squareId: number, playersTurn: number, totalMoveCounter: number) => {
    if (squareId) {
      setPlayersMovesState((prevState) =>
        prevState.map((player) =>
          player.id === playersTurn ? { ...player, selectedMovesArr: [...player.selectedMovesArr, squareId] } : player
        )
      );
      setTotalMoveCounter(totalMoveCounter + 1);
      setPlayersTurn(playersTurn === 1 ? 2 : 1);
    }
  };

  useEffect(() => {
    let hasWinner = false;
    for (const player of playersMovesState) {
      if (player.selectedMovesArr.length >= 3) {
        for (const combo of winningCombination) {
          //we are creating a new array using filter method.
          //this new array will have elements that's included in the combo arrays and calculate the length of it.
          const matchingElementsCount = player.selectedMovesArr.filter((element) => combo.includes(element)).length;
          const atLeastThreeElementsPresent = matchingElementsCount >= 3;

          if (atLeastThreeElementsPresent) {
            setGameResults(`Winner is ${player.id}`);
            hasWinner = true;
          }
        }
      }
    }
    if (!hasWinner && totalMoveCounter === 9) {
      setGameResults(`Draw`);
    }
  }, [playersMovesState, winningCombination, totalMoveCounter]);

  return (
    <Container
      maxWidth='sm'
      sx={{
        backgroundColor: "#212835",
        justifyContent: "center",
        p: 5,
        mt: 5,
      }}
    >
      <Box>
        <Typography variant='h2' sx={{ color: "white", textAlign: "center" }}>
          Tic Tac Toe Game
        </Typography>
        <ActionsMenu
          setPlayersMovesState={setPlayersMovesState}
          setGameResults={setGameResults}
          setTotalMoveCounter={setTotalMoveCounter}
        />
      </Box>
      <Grid
        container
        sx={{
          justifyContent: "center",
          p: 1,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
          const existingMove = playersMovesState.find((player) => player.selectedMovesArr.includes(squareId));

          return (
            <Grid
              item
              xs={3}
              key={squareId}
              data-id={squareId}
              onClick={() => {
                if (existingMove || gameResults) return;
                handleMoves(squareId, playersTurn, totalMoveCounter);
              }}
              sx={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "125px",
                m: 1,
                borderRadius: 1,
              }}
            >
              {existingMove && (
                <>
                  {existingMove.id === 1 ? (
                    <FontAwesomeIcon icon={faX} size='2xl' style={{ color: "#46a3ff" }} />
                  ) : (
                    <FontAwesomeIcon icon={faO} size='2xl' style={{ color: "#ff827e" }} />
                  )}
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ backgroundColor: "#ffb048", borderRadius: "16px", width: 300, margin: "auto" }}>
        <Typography variant='h4' sx={{ color: "white", textAlign: "center" }}>
          {gameResults ? gameResults : `Player ${playersTurn} Turn`}
        </Typography>
      </Box>
    </Container>
  );
};

export default BoardGame;
