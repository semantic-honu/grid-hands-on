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
import CrueltyFreeTwoToneIcon from "@mui/icons-material/CrueltyFreeTwoTone";
import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';

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
            <ListItem key="Review" disablePadding>
              <ListItemButton component={Link} to="/reviews" onClick={onClose}>
                <ListItemIcon>
                  <AdbOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="レビュー" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuBar;
