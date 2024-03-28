import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { scoreMap } from "../utils/constant";

const FYRating = ({
  name,
  value,
  max,
  showValue = false,
  onChange,
  sxBox,
  ...props
}) => {
  const [hoverValue, setHoverValue] = useState(null);

  const handleRatingChange = (newValue) => {
    const updatedEvent = {
      target: {
        name: name,
        value: newValue,
      },
    };
    onChange(updatedEvent);
  };

  const handleRatingHover = (event, newHover) => {
    setHoverValue(newHover);
  };

  const handleRatingHoverEnd = () => {
    setHoverValue(null);
  };

  return (
    <Box
      component="fieldset"
      display="flex"
      justifyContent="space-between"
      border={0}
      onMouseLeave={handleRatingHoverEnd}
      sx={sxBox}
    >
      <Rating
        name={name}
        value={value}
        onChange={(event, newValue) => handleRatingChange(newValue)}
        onChangeActive={(event, newHover) => handleRatingHover(event, newHover)}
        max={max}
        {...props}
      />
      {(hoverValue || value) && showValue ? (
        <Typography
          variant="h6"
          component="h6"
          color="#3F3F44"
          fontWeight="700"
        >
          {`${scoreMap[hoverValue || value] || 0}`}
        </Typography>
      ) : null}
    </Box>
  );
};

export default FYRating;
