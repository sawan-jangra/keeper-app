import React from "react";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function Header() {
  return (
    <header>
      <h1><PlaylistAddIcon sx={{ fontSize: 30 }}/> Keeper</h1>
    </header>
  );
}

export default Header;
