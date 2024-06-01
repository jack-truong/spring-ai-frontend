import {Stack, SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

type ControlStackProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const ComponentStack = ({sx, children} : ControlStackProps) => {
  return <Stack sx={[
      { padding: 2 },
      ...(Array.isArray(sx) ? sx : [sx]),
  ]} spacing={3}>{children}</Stack>
}

export default ComponentStack;