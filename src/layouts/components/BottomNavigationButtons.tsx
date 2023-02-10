import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import HistoryIcon from "@mui/icons-material/History";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavigationButtons() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navs = [
    {
      label: "مساعدة",
      link: "/",
      icon: <HandshakeIcon color="inherit" />,
    },
    {
      label: "تبرع",
      link: "/donation",
      icon: <VolunteerActivismIcon color="inherit" />,
    },
    {
      label: "بياناتي",
      link: "/user-info",
      icon: <HistoryIcon color="inherit" />,
    },
    {
      label: "هام",
      link: "/important-links",
      icon: <CrisisAlertIcon color="inherit" />,
    },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={2}
    >
      <BottomNavigation
        value={pathname}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        {navs.map((nav) => (
          <BottomNavigationAction
            key={nav.link}
            label={nav.label}
            value={nav.link}
            icon={nav.icon}
            onClick={() => navigate(nav.link)}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "700 !important",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavigationButtons;
