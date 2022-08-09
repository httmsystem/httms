import React from "react";
import "../../index.css";
import FeaturedInfo from "./FeaturedInfo";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";

import { styled } from "@mui/material/styles";
import {Box, Paper, Grid} from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  filter: "drop-shadow(0px 1px 5px rgba(0,0,0,0.10))",
}));


const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <FeaturedInfo />
      <div className="dashboardWidgets">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={6}>
              <Item>
                <WidgetSm />
              </Item>
            </Grid>
            <Grid item xs={10}>
              <Item>
                <WidgetLg />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </div>
  );
};

export default Dashboard;
