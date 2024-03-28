import { Skeleton } from "@mui/material";
import React from "react";

const FYSkeleton = ({
  width = "100%",
  height = "100%",
  variant = "rect",
  animation = "wave",
  className,
  style,
}) => <Skeleton {...{ width, height, variant, animation, className, style }} />;

export default FYSkeleton;
