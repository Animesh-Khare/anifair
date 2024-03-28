import { Card } from "@mui/material";

const FYCard = ({ children, variant, style, onClick, ...rest }) => (
  <Card
    {...rest}
    {...{
      variant,
      style,
      onClick,
    }}
  >
    {children}
  </Card>
);

export default FYCard;
