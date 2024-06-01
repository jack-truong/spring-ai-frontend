import {Box, LinearProgress, Typography} from "@mui/material";

type LoadingProps = {
  label? : string
};

const Loading = ({label} : LoadingProps) => {
   return label ?
       <Box display="flex" alignItems="center" width={400}>
         <Box flex={3}>
           <Typography sx={{fontWeight: "bold"}}>{`Loading ${label}`}</Typography>
         </Box>
         <Box flex={2}>
           <LinearProgress sx={{width: 100}}/>
         </Box>
       </Box>
       : <LinearProgress/>;
}

export default Loading;