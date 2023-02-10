import { Box, Container, Toolbar } from "@mui/material";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import { AppBar } from "./components/Appbar";
import { NavigationButtons } from "./components/NavigationButtons";

const loader = () => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
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
        <Box display="flex" columnGap={2} width="100%" mt={3}>
          <NavigationButtons />
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

MainLayout.loader = loader;
