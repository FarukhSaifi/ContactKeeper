import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { NAV_LABELS } from "./labels";
import { ROUTES } from "./routes";

export const NAV_MENU_ITEMS = [
  { text: NAV_LABELS.HOME, icon: HomeIcon, path: ROUTES.HOME, requiresAuth: true },
  { text: NAV_LABELS.ABOUT, icon: InfoIcon, path: ROUTES.ABOUT, requiresAuth: true },
  { text: NAV_LABELS.LOGIN, icon: LoginIcon, path: ROUTES.LOGIN, requiresAuth: false },
  { text: NAV_LABELS.REGISTER, icon: PersonAddIcon, path: ROUTES.REGISTER, requiresAuth: false },
];
