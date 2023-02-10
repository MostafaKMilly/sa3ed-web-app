import React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useQueryClient } from "@tanstack/react-query";

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const client = useQueryClient();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    client.clear();
    handleClose();
    navigate("/login");
  };

  return (
    <MuiAppBar position="fixed" color="inherit" elevation={0}>
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <img src="./logo.png" alt="logo" width={35} />
          <Box display="flex" columnGap={4} alignItems="center">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ bgcolor: "primary.light" }}
            >
              <KeyboardArrowDownIcon sx={{ color: "common.black" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              elevation={1}
            >
              <MenuItem onClick={handleClose}>من نحن</MenuItem>
              <MenuItem onClick={handleLogout}>تسجيل خروج</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
