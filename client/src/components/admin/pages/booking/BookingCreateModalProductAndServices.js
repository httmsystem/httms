import React from "react";
import BookingAddFlightModal from "./BookingAddFlightModal";
import BookingAddHotelModal from "./BookingAddHotelModal";
import BookingAddCruiseModal from "./BookingAddCruiseModal";
import BookingAddOtherModal from "./BookingAddOtherModal";
import {
  Button,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import NumberFormat from "react-number-format";
import { ReportProblem } from "@mui/icons-material";
import moment from "moment";

const BookingCreateModalProductAndServices = (props) => {
  const options = props.acrs
    .map((option) => {
      return option;
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  return (
    <>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <h3>PRODUCT & SERVICES</h3>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={16} sx={{ fontSize: "0.9rem" }}>
        <Grid item xs={4}>
          <b> Product &#38; Service Class:</b>

          <Select
            sx={{ mt: 0.5 }}
            size="small"
            fullWidth
            id="prod_serv_class"
            name="prod_serv_class"
            value={props.prod_serv_class}
            onChange={(event) => {
              props.set_prod_serv_class(event.target.value);
            }}
          >
            <MenuItem value={"DOMESTIC"}>DOMESTIC</MenuItem>
            <MenuItem value={"INTERNATIONAL"}>INTERNATIONAL</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={5}>
          <b> Reference No.:</b>

          <TextField
            sx={{ mt: 0.5 }}
            size="small"
            fullWidth
            variant="outlined"
            value={props.ref_no}
            onChange={(e) => {
              props.set_ref_no(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <b> ACR:</b>

          <Autocomplete
            sx={{ mt: 0.5 }}
            size="small"
            options={options}
            getOptionLabel={(option) =>
              moment(option.date).format("D-MMM-YYYY") + " | " + option.rate
            }
            isOptionEqualToValue={(option, value) => option._id === value._id}
            value={props.acr}
            onChange={(e, new_acr_data) => {
              props.set_acr(new_acr_data);
            }}
            disablePortal
            disableClearable
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Grid>
        <Grid item xs={8}>
          <b> Select a product &#38; services form to be filled</b>
          <Select
            sx={{ mt: 0.5 }}
            size="small"
            fullWidth
            id="prod_serv_type"
            name="prod_serv_type"
            value={props.prod_serv_type}
            onChange={(event) => {
              props.set_prod_serv_type(event.target.value);
            }}
          >
            <MenuItem value={"FLIGHT"}>AIRFARE</MenuItem>
            <MenuItem value={"HOTEL"}>HOTEL</MenuItem>
            <MenuItem value={"CRUISE"}>CRUISE</MenuItem>
            <MenuItem value={"SHOREX"}>SHOREX</MenuItem>
            <MenuItem value={"CITY TOUR"}>CITY TOUR</MenuItem>
            <MenuItem value={"THEME PARK"}>THEME PARK</MenuItem>
            <MenuItem value={"BAGGAGE"}>BAGGAGE</MenuItem>
            <MenuItem value={"DOCUMENTATION"}>DOCUMENTATION</MenuItem>
            <MenuItem value={"SEAT REQUEST"}>SEAT REQUEST</MenuItem>
            <MenuItem value={"TRANSFER"}>TRANSFER</MenuItem>
            <MenuItem value={"INSURANCE"}>INSURANCE</MenuItem>
            <MenuItem value={"COMMISSION"}>COMMISSION</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={3} sx={{mt:2.5}}>
          {props.prod_serv_type === "FLIGHT" && (
            <Button variant="contained" onClick={props.handleOpen}>
              OPEN FORM
            </Button>
          )}

          {props.prod_serv_type === "HOTEL" && (
            <Button variant="contained" onClick={props.handleAddHotelOpen}>
               OPEN FORM
            </Button>
          )}
          {props.prod_serv_type === "CRUISE" && (
            <Button variant="contained" onClick={props.handleAddCruiseOpen}>
               OPEN FORM
            </Button>
          )}
          {props.prod_serv_type === "SHOREX" ||
          props.prod_serv_type === "CITY TOUR" ||
          props.prod_serv_type === "THEME PARK" ||
          props.prod_serv_type === "BAGGAGE" ||
          props.prod_serv_type === "DOCUMENTATION" ||
          props.prod_serv_type === "SEAT REQUEST" ||
          props.prod_serv_type === "TRANSFER" ||
          props.prod_serv_type === "INSURANCE" ||
          props.prod_serv_type === "COMMISSION" ? (
            <Button variant="contained" onClick={props.handleAddOtherOpen}>
               OPEN FORM
            </Button>
          ) : (
            <></>
          )}
        </Grid>

        <Grid item xs={16}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell align="center">PRODUCT ITEM</TableCell>
                  <TableCell align="center">TRAVEL TAX</TableCell>
                  <TableCell align="center">SUPPLIER</TableCell>
                  <TableCell align="center">ITINERARY</TableCell>
                  <TableCell align="center">COST</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.products_services.length < 1 && (
                  <div>
                    <Typography sx={{ mt: 2, mb: 3, ml: 3 }}>
                      <ReportProblem sx={{ mr: 3 }} />
                      NO PRODUCTS & SERVICES HAS BEEN ADDED
                    </Typography>
                  </div>
                )}
                {props.products_services.map((prod_serv, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell component="th" scope="row">
                        {prod_serv.no}
                      </TableCell>
                      <TableCell align="center">
                        {prod_serv.prod_serv_type}
                      </TableCell>
                      <TableCell align="center">
                        {prod_serv.costing.travel_tax}
                      </TableCell>
                      <TableCell align="center">
                        {prod_serv.supplier.name}
                      </TableCell>
                      <TableCell align="center">
                        {prod_serv.itinerary}
                      </TableCell>
                      <TableCell align="center">
                        {prod_serv.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(
                              prod_serv.costing.cost_in_usd
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={prod_serv.currency + " "}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(
                              prod_serv.costing.cost_in_php
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={prod_serv.currency + " "}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                        >
                          EDIT
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <BookingAddFlightModal
        suppliers={props.suppliers}
        acrs={props.acrs}
        products_services_data={props.products_services_data}
        set_products_services_data={props.set_products_services_data}
        set_products_services_data_onChange={
          props.set_products_services_data_onChange
        }
        add_detail={props.add_detail}
        set_products_services_data_onChange_detail={
          props.set_products_services_data_onChange_detail
        }
        remove_detail={props.remove_detail}
        remove_cost={props.remove_cost}
        add_new_cost={props.add_new_cost}
        set_products_services_data_onChange_costing={
          props.set_products_services_data_onChange_costing
        }
        add_taxes={props.add_taxes}
        set_taxes_onChange={props.set_taxes_onChange}
        remove_taxes={props.remove_taxes}
        add_product_services={props.add_product_services}
        products_services={props.products_services}
        user={props.user}
        open={props.open}
        onClose={props.onClose}
        sourcetype={props.sourcetype}
        setsourceType={props.setsourceType}
        curType={props.curType}
        setcurType={props.setcurType}
        gds={props.gds}
        setGds={props.setGds}
        recordLoc={props.recordLoc}
        setRecordLoc={props.setRecordLoc}
        journeyValueTab={props.journeyValueTab}
        journeyHandleChangesTabs={props.journeyHandleChangesTabs}
        handleChangeSelectFrom={props.handleChangeSelectFrom}
        handleChangeSelectTo={props.handleChangeSelectTo}
        departDate={props.departDate}
        setdepartDate={props.setdepartDate}
        airline={props.airline}
        setAirline={props.setAirline}
        flightNo={props.flightNo}
        setflightNo={props.setflightNo}
        validCarrier={props.validCarrier}
        setValidCarrier={props.setValidCarrier}
        classType={props.classType}
        setclassType={props.setclassType}
        bookClassType={props.bookClassType}
        setBookClassType={props.setBookClassType}
        routeValues={props.routeValues}
        setRoute={props.setRoute}
        setRouteChange={props.setRouteChange}
        addRoute={props.addRoute}
        removeRoute={props.removeRoute}
        costings={props.costings}
        addNewCost={props.addNewCost}
        setCostChange={props.setCostChange}
        removeCost={props.removeCost}
        handleChangeComis={props.handleChangeComis}
        setTaxesChange={props.setTaxesChange}
        addTaxes={props.addTaxes}
        removeFormFields={props.removeTaxes}
        // DATE RETRIEVAL
        onAdd={props.onAdd}
      />
      <BookingAddHotelModal
        suppliers={props.suppliers}
        products_services_data={props.products_services_data}
        set_products_services_data={props.set_products_services_data}
        set_products_services_data_onChange={
          props.set_products_services_data_onChange
        }
        add_detail={props.add_detail}
        set_products_services_data_onChange_detail={
          props.set_products_services_data_onChange_detail
        }
        remove_detail={props.remove_detail}
        add_new_cost={props.add_new_cost}
        set_products_services_data_onChange_costing={
          props.set_products_services_data_onChange_costing
        }
        add_taxes={props.add_taxes}
        set_taxes_onChange={props.set_taxes_onChange}
        remove_taxes={props.remove_taxes}
        add_product_services={props.add_product_services}
        products_services={props.products_services}
        user={props.user}
        openHotel={props.openHotel}
        closeHotel={props.closeHotel}
        sourcetype={props.sourcetype}
        setsourceType={props.setsourceType}
        curType={props.curType}
        setcurType={props.setcurType}
        gds={props.gds}
        setGds={props.setGds}
        recordLoc={props.recordLoc}
        setRecordLoc={props.setRecordLoc}
        journeyValueTab={props.journeyValueTab}
        journeyHandleChangesTabs={props.journeyHandleChangesTabs}
        handleChangeSelectFrom={props.handleChangeSelectFrom}
        handleChangeSelectTo={props.handleChangeSelectTo}
        departDate={props.departDate}
        setdepartDate={props.setdepartDate}
        airline={props.airline}
        setAirline={props.setAirline}
        flightNo={props.flightNo}
        setflightNo={props.setflightNo}
        validCarrier={props.validCarrier}
        setValidCarrier={props.setValidCarrier}
        classType={props.classType}
        setclassType={props.setclassType}
        bookClassType={props.bookClassType}
        setBookClassType={props.setBookClassType}
        routeValues={props.routeValues}
        setRoute={props.setRoute}
        setRouteChange={props.setRouteChange}
        addRoute={props.addRoute}
        removeRoute={props.removeRoute}
        costings={props.costings}
        addNewCost={props.addNewCost}
        setCostChange={props.setCostChange}
        removeCost={props.removeCost}
        handleChangeComis={props.handleChangeComis}
        setTaxesChange={props.setTaxesChange}
        addTaxes={props.addTaxes}
        removeFormFields={props.removeTaxes}
        // DATE RETRIEVAL
        onAdd={props.onAdd}
        acrs={props.acrs}
      />
      <BookingAddCruiseModal
        suppliers={props.suppliers}
        acrs={props.acrs}
        products_services_data={props.products_services_data}
        set_products_services_data={props.set_products_services_data}
        set_products_services_data_onChange={
          props.set_products_services_data_onChange
        }
        add_detail={props.add_detail}
        set_products_services_data_onChange_detail={
          props.set_products_services_data_onChange_detail
        }
        remove_detail={props.remove_detail}
        add_new_cost={props.add_new_cost}
        set_products_services_data_onChange_costing={
          props.set_products_services_data_onChange_costing
        }
        add_taxes={props.add_taxes}
        set_taxes_onChange={props.set_taxes_onChange}
        remove_taxes={props.remove_taxes}
        add_product_services={props.add_product_services}
        products_services={props.products_services}
        user={props.user}
        openCruise={props.openCruise}
        closeCruise={props.closeCruise}
        sourcetype={props.sourcetype}
        setsourceType={props.setsourceType}
        curType={props.curType}
        setcurType={props.setcurType}
        gds={props.gds}
        setGds={props.setGds}
        recordLoc={props.recordLoc}
        setRecordLoc={props.setRecordLoc}
        journeyValueTab={props.journeyValueTab}
        journeyHandleChangesTabs={props.journeyHandleChangesTabs}
        handleChangeSelectFrom={props.handleChangeSelectFrom}
        handleChangeSelectTo={props.handleChangeSelectTo}
        departDate={props.departDate}
        setdepartDate={props.setdepartDate}
        airline={props.airline}
        setAirline={props.setAirline}
        flightNo={props.flightNo}
        setflightNo={props.setflightNo}
        validCarrier={props.validCarrier}
        setValidCarrier={props.setValidCarrier}
        classType={props.classType}
        setclassType={props.setclassType}
        bookClassType={props.bookClassType}
        setBookClassType={props.setBookClassType}
        routeValues={props.routeValues}
        setRoute={props.setRoute}
        setRouteChange={props.setRouteChange}
        addRoute={props.addRoute}
        removeRoute={props.removeRoute}
        itFetchFinal={props.itFetchFinal}
        costings={props.costings}
        addNewCost={props.addNewCost}
        setCostChange={props.setCostChange}
        removeCost={props.removeCost}
        handleChangeComis={props.handleChangeComis}
        setTaxesChange={props.setTaxesChange}
        addTaxes={props.addTaxes}
        removeFormFields={props.removeTaxes}
        // DATE RETRIEVAL
        onAdd={props.onAdd}
      />
      <BookingAddOtherModal
        suppliers={props.suppliers}
        products_services_data={props.products_services_data}
        set_products_services_data={props.set_products_services_data}
        set_products_services_data_onChange={
          props.set_products_services_data_onChange
        }
        add_detail={props.add_detail}
        set_products_services_data_onChange_detail={
          props.set_products_services_data_onChange_detail
        }
        remove_detail={props.remove_detail}
        add_new_cost={props.add_new_cost}
        set_products_services_data_onChange_costing={
          props.set_products_services_data_onChange_costing
        }
        add_taxes={props.add_taxes}
        set_taxes_onChange={props.set_taxes_onChange}
        remove_taxes={props.remove_taxes}
        add_product_services={props.add_product_services}
        products_services={props.products_services}
        user={props.user}
        openOther={props.openOther}
        closeOther={props.closeOther}
        sourcetype={props.sourcetype}
        setsourceType={props.setsourceType}
        curType={props.curType}
        setcurType={props.setcurType}
        gds={props.gds}
        setGds={props.setGds}
        recordLoc={props.recordLoc}
        setRecordLoc={props.setRecordLoc}
        journeyValueTab={props.journeyValueTab}
        journeyHandleChangesTabs={props.journeyHandleChangesTabs}
        handleChangeSelectFrom={props.handleChangeSelectFrom}
        handleChangeSelectTo={props.handleChangeSelectTo}
        departDate={props.departDate}
        setdepartDate={props.setdepartDate}
        airline={props.airline}
        setAirline={props.setAirline}
        flightNo={props.flightNo}
        setflightNo={props.setflightNo}
        validCarrier={props.validCarrier}
        setValidCarrier={props.setValidCarrier}
        classType={props.classType}
        setclassType={props.setclassType}
        bookClassType={props.bookClassType}
        setBookClassType={props.setBookClassType}
        routeValues={props.routeValues}
        setRoute={props.setRoute}
        setRouteChange={props.setRouteChange}
        addRoute={props.addRoute}
        removeRoute={props.removeRoute}
        costings={props.costings}
        addNewCost={props.addNewCost}
        setCostChange={props.setCostChange}
        removeCost={props.removeCost}
        handleChangeComis={props.handleChangeComis}
        setTaxesChange={props.setTaxesChange}
        addTaxes={props.addTaxes}
        removeFormFields={props.removeTaxes}
        // DATE RETRIEVAL
        onAdd={props.onAdd}
        acrs={props.acrs}
        prod_serv_type={props.prod_serv_type}
      />
    </>
  );
};

export default BookingCreateModalProductAndServices;
