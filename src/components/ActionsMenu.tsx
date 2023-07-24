import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

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
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
    setSelected(true);
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
    setOpen(false);
  };

  return (
    <Box width={300} sx={{ backgroundColor: "#ffb048", borderRadius: "16px", width: 300, margin: "auto" }}>
      <Button fullWidth onClick={handleMenuClick} id='basic-menu'>
        Menu Actions
      </Button>
      <Menu id='basic-menu' anchorEl={anchorEl} onClose={handleClose} open={open} sx={{ width: "100%" }}>
        <MenuItem onClick={handleMenuItemClick} selected={selected}>
          New Game
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick} selected={selected}>
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsMenu;
