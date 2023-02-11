import React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useQueryClient } from "@tanstack/react-query";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import { GenericDialog } from "@/shared";
import { AboutusDialigContent } from "./AboutusDialigContent";

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opneAboutus, setOpenAboutus] = React.useState(false);
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
          <Box display="flex" columnGap={2} alignItems="center">
            <img src="./logo.png" alt="logo" width={35} />
            <Typography
              variant="h3"
              fontWeight={600}
              sx={{ color: "common.black" }}
            >
              سَاعِدْ
            </Typography>
          </Box>
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  setOpenAboutus(true);
                }}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                من نحن
                <InfoIcon sx={{ ml: 1 }} />
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                تسجيل خروج
                <ExitToAppIcon sx={{ ml: 1 }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <GenericDialog
          open={opneAboutus}
          onClose={() => setOpenAboutus(false)}
          dialog={{
            title: "",
          }}
        >
          <AboutusDialigContent />
        </GenericDialog>
      </Container>
    </MuiAppBar>
  );
};
