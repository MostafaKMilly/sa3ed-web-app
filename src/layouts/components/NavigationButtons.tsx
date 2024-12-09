import {
  List,
  ListItem,
  ListItemText,
  ListItemButton as MUIListItemButton,
  styled,
} from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import HistoryIcon from "@mui/icons-material/History";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

export const NavigationButtons = () => {
  const navs = [
    {
      label: "المفقودين",
      link: "/",
      icon: <PersonIcon color="inherit" />,
    },
    {
      label: "بياناتي",
      link: "/user-info",
      icon: <HistoryIcon color="inherit" />,
    },
    {
      label: "معلومات مهمة",
      link: "/important-links",
      icon: <CrisisAlertIcon color="inherit" />,
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <List
      sx={{
        display: {
          sm: "flex",
          xs: "none",
        },
        flexDirection: "column",
        rowGap: 2,
        minWidth: "230px",
        py: 0,
      }}
    >
      {navs.map((nav) => (
        <ListItem key={nav.link} disablePadding>
          <ListItemButton
            onClick={() => navigate(nav.link)}
            disableRipple
            active={pathname === nav.link}
          >
            <ListItemText sx={{ color: "inherit" }}>{nav.label}</ListItemText>
            {nav.icon}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const ListItemButton = styled(MUIListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : "initial",
  backgroundColor: active ? theme.palette.secondary.main : "initial",
  "&:hover": {
    backgroundColor: active ? theme.palette.secondary.main : "initial",
  },
  borderRadius: "8px",
}));
