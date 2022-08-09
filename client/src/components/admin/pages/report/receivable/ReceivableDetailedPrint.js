import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

export const ReceivableDetailedPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Box sx={{ flexGrow: 1, fontSize: 11 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}>
            <div>
              {" "}
              <b style={{ fontSize: 23 }}>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
            <div>DETAILED ACCOUNT RECEIVABLE</div>
            <div>
              {" "}
              DATE RANGE: {moment(props.date[0]).format("D-MMM-YYYY")} {" - "}
              {moment(props.date[1]).format("D-MMM-YYYY")}
            </div>
            <div>DUE DATE: {moment(props.due_date).format("D-MMM-YYYY")}</div>
          </Grid>
          <Grid item xs={16}></Grid>

          <Grid item xs={16}>
            <div>
              ACCT NAME:
              <b> {props.customer_filter.acct_name}</b>
            </div>
            <div>
              {" "}
              Contact #:
              <b> {props.customer_filter.contact_no}</b>
            </div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}>
            <b>PHP</b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <b>DATE</b>
          </Grid>
          <Grid item xs={2}>
            <b>SOA #</b>
          </Grid>
          <Grid item xs={1.5}>
            <b>REF #</b>
          </Grid>
          <Grid item xs={6}>
            <b>PAX NAME</b>
          </Grid>
          <Grid item xs={1.5} style={{ textAlign: "center" }}>
            <b>COUNT</b>
          </Grid>
          <Grid item xs={3}>
            <b>AMOUNT</b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          {props.data_filter
            .filter((type) => type.grand_total_selling.remit_currency === "₱")
            .map((e) => {
              return (
                <>
                  <Grid item xs={2}>
                    <div> {moment(e.acr.date).format("D-MMM-YYYY")}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{e.rs_no}</div>
                  </Grid>
                  <Grid item xs={1.5}>
                    <div>{e.ref_no}</div>
                  </Grid>

                  <Grid item xs={6}>
                    <b>
                      {e.passenger[0].title +
                        " " +
                        e.passenger[0].last_name +
                        ", " +
                        e.passenger[0].first_name +
                        " " +
                        e.passenger[0].suffix +
                        " " +
                        e.passenger[0].middle_name}
                    </b>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <b>{e.passenger.length}</b>
                  </Grid>

                  <Grid item xs={3}>
                    <div>
                      <NumberFormat
                        value={parseFloat(e.payment_detail.balance_php).toFixed(
                          2
                        )}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱ "}
                      />
                    </div>
                  </Grid>
                </>
              );
            })}

          <Grid item xs={13}>
            <b>TOTAL AMOUNT</b>
          </Grid>
          <Grid item xs={3}>
            <div>
              <NumberFormat
                value={parseFloat(props.grand_total_php).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱ "}
              />
            </div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}>
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
          <Grid item xs={2}>
            <b>DATE</b>
          </Grid>
          <Grid item xs={2}>
            <b>SOA #</b>
          </Grid>
          <Grid item xs={1.5}>
            <b>REF #</b>
          </Grid>
          <Grid item xs={6}>
            <b>PAX NAME</b>
          </Grid>
          <Grid item xs={1.5} style={{ textAlign: "center" }}>
            <b>COUNT</b>
          </Grid>
          <Grid item xs={3}>
            <b>AMOUNT</b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          {props.data_filter
            .filter((type) => type.grand_total_selling.remit_currency === "$")
            .map((e) => {
              return (
                <>
                  <Grid item xs={2}>
                    <div> {moment(e.acr.date).format("D-MMM-YYYY")}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{e.rs_no}</div>
                  </Grid>
                  <Grid item xs={1.5}>
                    <div>{e.ref_no}</div>
                  </Grid>

                  <Grid item xs={6}>
                    <b>
                      {e.passenger[0].title +
                        " " +
                        e.passenger[0].last_name +
                        ", " +
                        e.passenger[0].first_name +
                        " " +
                        e.passenger[0].suffix +
                        " " +
                        e.passenger[0].middle_name}
                    </b>
                  </Grid>
                  <Grid item xs={1.5} style={{ textAlign: "center" }}>
                    <b>{e.passenger.length}</b>
                  </Grid>

                  <Grid item xs={3}>
                    <div>
                      <NumberFormat
                        value={parseFloat(e.payment_detail.balance_usd).toFixed(
                          2
                        )}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                      />
                    </div>
                  </Grid>
                </>
              );
            })}
          <Grid item xs={13}>
            <b>TOTAL AMOUNT</b>
          </Grid>
          <Grid item xs={3}>
            <div>
              <NumberFormat
                value={parseFloat(props.grand_total_usd).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default ReceivableDetailedPrint;
