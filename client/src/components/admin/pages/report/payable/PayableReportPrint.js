import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

export const PayableReportPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Box sx={{ flexGrow: 1, fontSize: 11 }}>
        <Grid container spacing={1} columns={30}>
          <Grid item xs={30}>
            <div>
              {" "}
              <b style={{ fontSize: 23 }}>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
            <div>PAYABLE REPORT</div>
          </Grid>
          <Grid item xs={30}></Grid>

          <Grid item xs={30}>
            <div>
              SUPPLIER:
              <b> {props.suppliers_filter.name}</b>
            </div>
            <div>
              {" "}
              CURRENCY:
              <b> {props.cur === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}</b>
            </div>
            <div>
              {" "}
              STATUS:
              <b> {props.stat}</b>
            </div>
            <div>
              {" "}
              DATE RANGE: {moment(props.date[0]).format("D-MMM-YYYY")} {" - "}
              {moment(props.date[1]).format("D-MMM-YYYY")}
            </div>
          </Grid>
          <Grid item xs={30}></Grid>

          <Grid item xs={30}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>
          <Grid item xs={2.5}>
            <b>RS #</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Issued Date</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Ticket #</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Ticket Type</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Status</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Gross</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Com. %</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Com. Amount</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Net</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Taxes</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>PH TAX</b>
          </Grid>
          <Grid item xs={2.5}>
            <b>Amount</b>
          </Grid>
          <Grid item xs={30}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          {props.data_filter.map((e) => {
            return e.ticket.map((ee) => {
              return (
                <>
                  {ee.ticket_type === "E-TICKET" ||
                  ee.ticket_type === "E RE-ISSUE" ||
                  ee.ticket_type === "SCCCF" ? (
                    <>
                      <Grid item xs={2.5}>
                        {e.no}
                      </Grid>
                      <Grid item xs={2.5}>
                        {moment(e.date_issued).format("MM-D")}
                      </Grid>
                      <Grid item xs={2.5}>
                        {ee.ticket_no}
                      </Grid>
                      <Grid item xs={2.5}>
                        {ee.ticket_type}
                      </Grid>
                      <Grid item xs={2.5}>
                        {e.status}
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(e.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        {e.com_percent}
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(e.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(e.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(e.taxes_total).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(e.taxes_total).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      {ee.ticket_type === "SCCCF" ? (
                        <>
                          <Grid item xs={2.5}>
                            <NumberFormat
                              value={parseFloat(e.com_amount).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </Grid>
                        </>
                      ) : (
                        <>
                          {e.currency === "₱" ? (
                            <>
                              <Grid item xs={2.5}>
                                <NumberFormat
                                  value={parseFloat(e.cost_in_php).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={2.5}>
                                <NumberFormat
                                  value={parseFloat(e.cost_in_usd).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </Grid>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Grid item xs={2.5}>
                        {e.no}
                      </Grid>
                      <Grid item xs={2.5}>
                        {moment(e.date_issued).format("MM-D")}
                      </Grid>
                      <Grid item xs={2.5}>
                        {ee.ticket_no}
                      </Grid>
                      <Grid item xs={2.5}>
                        {ee.ticket_type}
                      </Grid>
                      <Grid item xs={2.5}>
                        {e.status}
                      </Grid>

                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        {"0"}
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                      <Grid item xs={2.5}>
                        <NumberFormat
                          value={parseFloat(0).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Grid>
                    </>
                  )}
                </>
              );
            });
          })}

          {/* 
          <Grid item xs={13}>
            <b>TOTAL AMOUNT</b>
          </Grid>
          <Grid item xs={3}>
            <div>
              <NumberFormat
                value={parseFloat(props.grand_total_php).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                
              />
            </div>
          </Grid> */}
          <Grid item xs={16}></Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default PayableReportPrint;
