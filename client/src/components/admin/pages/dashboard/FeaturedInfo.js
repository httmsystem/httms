import React from "react";
import "../../index.css";

import { styled } from "@mui/material/styles";
import { Box, Paper, Grid } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  filter: "drop-shadow(0px 1px 5px rgba(0,0,0,0.10))",
}));

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featureItem">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Item>
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                  <span className="featureMoney">₱0.00</span>
                  <span className="featuredMoneyRate">
                    0
                    <ArrowDownward className="featuredIcon negative" />
                  </span>
                </div>
                <span className="featuredSub">Comapared to last month</span>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                  <span className="featureMoney">₱0.00</span>
                  <span className="featuredMoneyRate">
                    0
                    <ArrowUpward className="featuredIcon "/>
                  </span>
                </div>
                <span className="featuredSub">Comapared to last month</span>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                  <span className="featureMoney">₱0.00</span>
                  <span className="featuredMoneyRate">
                    0
                    <ArrowUpward className="featuredIcon "/>
                  </span>
                </div>
                <span className="featuredSub">Comapared to last month</span>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FeaturedInfo;
