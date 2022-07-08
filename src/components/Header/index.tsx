import { useState } from "react";
import "./header.css";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import getPath from "./path";

type path = { path: string };

export default function Header(props: path) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        sx={{ mr: 1, ml: 1 }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h6"
        noWrap
        align="left"
        component="span"
        sx={{ flexGrow: 1 }}
        fontFamily="Karla"
      >
        {getPath(props.path)}
      </Typography>

      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            {/* <AutoComplete style={{}} iconColor="blue" /> */}
          </li>
          <li>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 0 }}
            >
              <FormatListBulletedIcon fontSize="large" />
            </IconButton>
          </li>
          <li>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 0 }}
            >
              <LightModeIcon fontSize="large" />
            </IconButton>
          </li>
          <li>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 0 }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}
