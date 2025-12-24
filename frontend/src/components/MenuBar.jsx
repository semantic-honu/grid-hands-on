import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CrueltyFreeTwoToneIcon from '@mui/icons-material/CrueltyFreeTwoTone';

export const drawerWidth = 240;

const MenuBar = ({ open, onClose }) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        closeAfterTransition={false}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key="Books" disablePadding>
              <ListItemButton component={Link} to="/" onClick={onClose}>
                <ListItemIcon>
                  <CrueltyFreeTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="本" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Authors" disablePadding>
              <ListItemButton component={Link} to="/authors" onClick={onClose}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="作者" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuBar;
