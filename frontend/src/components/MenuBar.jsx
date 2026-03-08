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
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RateReviewIcon from '@mui/icons-material/RateReview';

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
                  <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary="本" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Review" disablePadding>
              <ListItemButton component={Link} to="/reviews" onClick={onClose}>
                <ListItemIcon>
                  <RateReviewIcon />
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
