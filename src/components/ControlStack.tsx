import {Stack, SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

type ControlStackProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const ControlStack = ({sx, children} : ControlStackProps) => {
  return <Stack sx={[
      { border: 3, padding: 2 },
      ...(Array.isArray(sx) ? sx : [sx]),
  ]} spacing={5}>{children}</Stack>
}

export default ControlStack;