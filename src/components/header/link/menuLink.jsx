import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../../theme/theme";

import { ReactComponent as DropdownIndicator } from "../../../assets/dropdown.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: "9999",
  },
  paper: {
    marginRight: theme.spacing(2),
    color: colors.white,
    zIndex: "9999",
    backgroundColor: "#425B77",
    opacity: "0.5",
    boxShadow: "-1px 2px 4px rgba(0, 0, 0, 0.5)",
    maxWidth: "500px",
  },
  linkText: {
    fontFamily: "'Formular'",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "18px",
    letterSpacing: "1px",
    color: colors.white,
    whiteSpace: "nowrap",
  },
}));

export default function MenuLinkComponent({
  text,
  to,
  anchorIcon = false,
  menuItems,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, link) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (link) {
      window.open(link);
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Typography variant="h4" className={classes.linkText}>
            {text}
            {anchorIcon && (
              <DropdownIndicator
                style={{ color: colors.white, marginLeft: "8px" }}
              />
            )}
          </Typography>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {menuItems}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
