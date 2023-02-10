import { Box, Container, Toolbar } from "@mui/material";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import { AppBar } from "./components/Appbar";
import { NavigationButtons } from "./components/NavigationButtons";
import BottomNavigationButtons from "./components/BottomNavigationButtons";

const loader = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return redirect("/login");
  }
  return null;
};

export const MainLayout = () => {
  const { state } = useNavigation();

  return (
    <Box width="100%" height="100%" overflow="auto">
      <AppBar />
      <Container sx={{ opacity: state === "loading" ? 0.5 : 1, mt: 1 }}>
        <Toolbar />
        <Box display="flex" columnGap={4} width="100%" mt={3} rowGap={3}>
          <NavigationButtons />
          <Outlet />
        </Box>
        <BottomNavigationButtons />
      </Container>
    </Box>
  );
};

MainLayout.loader = loader;
