import { createTheme, ThemeProvider }
from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dirent from './Dirent';
import {data} from "./Homepage";
import { Dispatch, SetStateAction} from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    s1: true; // adds the `s1` breakpoint
    s2: true;
    s3: true;
    s4: true;
    s5: true;
    s6: true;
    s7: true;
    s8: true;
    s9: true;
    s10: true;
    s11: true;
    s12: true;
  }
}
const gridTheme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'],
    values: {xs: 0, sm: 0, md: 0, lg:0, xl:0, s1: 150, s2: 300, s3: 450, s4: 600, s5: 750, s6: 900, s7: 1050, s8: 1200, s9: 1350, s10: 1500, s11: 1650, s12: 1800}
  }
});

function GridView({dataObj, route, setRoute}: {dataObj: data, route: string, setRoute: Dispatch<SetStateAction<string>>}) {
  const routeData = dataObj[route];

  return (
    <ThemeProvider theme={gridTheme}>
      <Box className='grow mt-2'>
        <Grid container>

          {routeData.foldersInside.map((entry: string) =>
            <Grid key={entry} className='grid justify-center items-center'
              s1={12} s2={6} s3={4} s4={3}
              s5={2.4} s6={2} s7={1.7143} s8={1.5}
              s9={1.3333} s10={1.2} s11={1.0909} s12={1}
              onClick={() => setRoute(entry)}
            >
              <Dirent entry={dataObj[entry]}/>
            </Grid>
          )}

          {routeData.filesInside.map((entry: string) =>
            <Grid key={entry} className='grid justify-center items-center'
              s1={12} s2={6} s3={4} s4={3}
              s5={2.4} s6={2} s7={1.7143} s8={1.5}
              s9={1.3333} s10={1.2} s11={1.0909} s12={1}
            >
              <Dirent entry={dataObj[entry]}/>
            </Grid>
          )}

        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default GridView;