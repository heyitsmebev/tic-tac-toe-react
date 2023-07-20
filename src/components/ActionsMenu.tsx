import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";

type MenuProps = {
  setPlayersMovesState: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        selectedMovesArr: number[];
      }[]
    >
  >;
  setGameResults: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTotalMoveCounter: React.Dispatch<React.SetStateAction<number>>;
};

const ActionsMenu = ({ setPlayersMovesState, setGameResults, setTotalMoveCounter }: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPlayersMovesState([
      {
        id: 1,
        selectedMovesArr: [],
      },
      {
        id: 2,
        selectedMovesArr: [],
      },
    ]);
    setGameResults(undefined);
    setTotalMoveCounter(0);
  };

  return (
    <Box width={100} sx={{ float: "right" }}>
      <Button onClick={handleMenuClick}>Menu</Button>
      <Menu id='basic-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <MenuItem onClick={handleClose}>New Game</MenuItem>
        <MenuItem onClick={handleClose}>Reset</MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsMenu;
