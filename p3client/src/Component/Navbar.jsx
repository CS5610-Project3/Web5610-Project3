import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <TwitterIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Twitter
          </Typography>
          {auth && (
            <div>
              <Button color="inherit" onClick={handleMenu}>
                User Name
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/">All Posts</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/user-post">User Posts</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <div>
              <Button color="inherit" component={Link} to="login">
                Log In
              </Button>
              <Button color="inherit" component={Link} to="sign-up">
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}