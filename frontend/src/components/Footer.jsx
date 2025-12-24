import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        textAlign: "center",
        background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
        color: "rgba(0,0,0,0.87)",
        mt: "auto",
        height: "30px",
      }}
    >
      © 2025 My App
    </Box>
  );
};
export default Footer;
