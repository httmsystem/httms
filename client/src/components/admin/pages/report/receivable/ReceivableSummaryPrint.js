import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

export const ReceivableSummaryPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Box sx={{ flexGrow: 1, fontSize: 14 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}>
            <div>
              <b style={{ fontSize: 23 }}>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
            <div>ACCOUNT RECEIVABLE SUMMARY</div>
            <div>
              DATE RANGE:
              <b>
                {" "}
                {moment(props.date[0]).format("D-MMM-YYYY")} {" - "}
                {moment(props.date[1]).format("D-MMM-YYYY")}
              </b>
            </div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <b>ACCOUNT NAME</b>
          </Grid>
          <Grid item xs={4}>
            <b>PHP</b>
          </Grid>
          <Grid item xs={4}>
            <b>USD</b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          {props.report_php.map((e) => {
            return (
              <>
                <Grid item xs={8}>
                  {e.acct_name}
                </Grid>
                <Grid item xs={4}>
                  <NumberFormat
                    value={parseFloat(e.php).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱ "}
                  />
                </Grid>
                <Grid item xs={4}>
                  {props.report_usd
                    .filter((type) => type.no === e.no)
                    .map((ee) => {
                      return (
                        <>
                          <NumberFormat
                            value={parseFloat(ee.usd).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$ "}
                          />
                        </>
                      );
                    })}
                </Grid>
              </>
            );
          })}

          <Grid item xs={16}></Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <b>TOTAL AMOUNT</b>
          </Grid>
          <Grid item xs={8}>
            <Grid container columns={8}>
              <Grid item xs={4}>
                <div>
                  <b>
                    <NumberFormat
                      value={parseFloat(props.grand_total_php).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱ "}
                    />
                  </b>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <b>
                    <NumberFormat
                      value={parseFloat(props.grand_total_usd).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$ "}
                    />
                  </b>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default ReceivableSummaryPrint;
