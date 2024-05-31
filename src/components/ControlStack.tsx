import {Stack} from "@mui/material";
import React, {ReactNode} from "react";

type ControlStackProps = {
  children: ReactNode;
}

const ControlStack = ({children} : ControlStackProps) => {
  return <Stack sx={{ border: 3, padding: 2 }} spacing={5}>{children}</Stack>
}

export default ControlStack;