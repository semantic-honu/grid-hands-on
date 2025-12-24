import { Button } from "@mui/material";

export const TextButton = ({ text, onClick,disabled}) => {
  return (
    <Button
      size="small"
      onClick={onClick}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
    >
      {text}
    </Button>
  );
};

export default TextButton;
