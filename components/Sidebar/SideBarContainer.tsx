import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import colors from "@/assets/colors";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DashboardIcon, ChevronDown } from "@/assets/svg/index";

export const SideBarContainer = () => {
  return (
    <Box
      sx={{
        width: 278,
        height: "100vh",
        padding: "0 20px",
        backgroundColor: `${colors.lightGrey}`,
        "&:hover": {
            boxShadow: 2,
        },
      }}
    >
      <Box
        sx={{
          // width: 238,
          // height: '100vh',
          // padding: '0 20px',
          backgroundColor: `${colors.lightGrey}`,
          "&:hover": {
            backgroundColor: `blue`,
          },
        }}
      >
        <Stack direction="row" spacing={2}>
          <DashboardIcon />
          <Box
            sx={{
              paddingRight: "30px",
            }}
          >
            <Typography ml={0}>Dashboard</Typography>
          </Box>
          <ChevronDown />
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: `${colors.lightGrey}`,
          "&:hover": {
            // backgroundColor: `blue`,
          },
        }}
      >
        <Accordion 
        sx={{
            width: 222,
            color: 'success.main',
            padding: '8px',
            borderStyle: 'none'
            border
        }}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <DashboardIcon /> <Typography ml={1}>Dashboard</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
