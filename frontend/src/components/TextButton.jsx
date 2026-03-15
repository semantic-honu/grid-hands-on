import { Button, Badge } from "@mui/material";

export const TextButton = ({ text, onClick, disabled, badgeContent }) => {
  return (
    <Badge badgeContent={badgeContent} color="primary" overlap="rectangular">
      <Button
        size="small"
        onClick={onClick}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
      >
        {text}
      </Button>
    </Badge>
  );
};

export default TextButton;
