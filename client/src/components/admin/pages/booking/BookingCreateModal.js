import BookingCreateModalSelectCustomer from "./BookingCreateModalSelectCustomer";
import BookingCreateModalProductAndServices from "./BookingCreateModalProductAndServices";
import BookingCreateModalPassenger from "./BookingCreateModalPassenger";
import BookingCreateModalSelling from "./BookingCreateModalSelling";
import BookingCreateModalFlightTicketNo from "./BookingCreateModalFlightTicketNo";
import BookingCreateModalReviewInformation from "./BookingCreateModalReviewInformation";
import BookingCreateModalParticulars from "./BookingCreateModalParticulars";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { BookingCreateModalPrint } from "./BookingCreateModalPrint";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import moment from "moment";

const BookingCreateModal = (props) => {
 

  const componentRef = useRef();
  const pageStyle = `
  
  @page {
    size: 210mm 297mm;
    margin: 11mm
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // NUMBERING SYSTEM FUNCTION
  const get_rss = [...props.rss];
  const rss_length = get_rss.length + 1;
  const year = new Date().getFullYear();
  const rss_length_print = get_rss.length;
  // NUMBERING BOOKING
  const no_booking = "B" + year + "0" + rss_length;

  // NUMBERING BOOKING PRINT
  const no_booking_print = "B" + year + "0" + rss_length_print;

  // NUMBERING RS
  const no_rs = year + "00000" + rss_length;

  // NUMBERING RS PRINT
  const no_rs_print = year + "00000" + rss_length - 1;

  // OPENING OF MODAL BOOKING
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // DATA CUSTOMER (STEP 1)
  // LOCAL STORAGE CUSTOMER
  const [customer_data, set_customer_data] = useState(() => {
    const saved = localStorage.getItem("customer_data");
    const initialValue = JSON.parse(saved);
    return (
      initialValue || {
        customer_type: "",
        misc_name: "",
        acct_data: {
          acct_name: "",
          address: "",
          contact_no: "",
          payment_term: 0,
          email: "",
        },
      }
    );
  });

  const [handler, set_handler] = useState(() => {
    const saved = localStorage.getItem("handler");
    const initialValue = JSON.parse(saved);
    return initialValue || { _id: "", first_name: "", last_name: "" };
  });

  // FUNCTION OF ONCHANGE
  let set_customer_data_onChange = (e) => {
    set_customer_data((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("customer_data", JSON.stringify(customer_data));
  }, [customer_data]);

  useEffect(() => {
    localStorage.setItem("handler", JSON.stringify(handler));
  }, [handler]);

  // DATA PRODUCT AND SERVICES (STEP 2)

  // LOCAL STORAGE PRODUCT & SERVICE
  const [products_services, set_products_services] = useState(() => {
    const saved = localStorage.getItem("product_service");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // LOCAL STORAGE ACR
  const [acr, set_acr] = useState(() => {
    const saved = localStorage.getItem("acr");
    const initialValue = JSON.parse(saved);
    return initialValue || { rate: "", date: null };
  });

  // PRODUCT & SERVICE DATA FOR FRONTEND
  const [prod_serv_class, set_prod_serv_class] = useState("");
  const [ref_no, set_ref_no] = useState("");
  const [prod_serv_type, set_prod_serv_type] = useState("");
  const [products_services_data, set_products_services_data] = useState([
    {
      no: "",
      prod_serv_type: "",
      prod_serv_class: "",
      itinerary: "",
      supplier: { id: "", name: "" },
      currency: "",
      pay_mode: "",
      // CREDIT CARD INFO
      bank: "",
      acct_no: "",
      rec_loc: "",
      resrv_nbr: "",
      jour_type: "",
      valid_carrier: "",
      prep_by: { _id: "", first_name: "", last_name: "" },
      detail: [
        {
          // FOR AIRFARE
          route_class: "-",
          route_from: "",
          route_to: "",
          date: new Date(),
          airline: "",
          flight_no: "",
          class: "",
          // FOR CRUISE & HOTEL
          date_from: new Date(),
          date_to: new Date(),
          hotel_name: "",
          num_rooms: "",
          vessel_name: "",
          type_cabin: "",
          destination: "",
          itinerary: "",
        },
      ],
      costing: {
        gross: 0,
        com_percent: 0,
        com_amount: 0,
        taxes: [{ taxes: 0 }, { taxes: 0 }, { taxes: 0 }],
        taxes_total: 0,
        taxes_total_php: 0,
        taxes_total_usd: 0,
        travel_tax: "",
        ph_tax: 0,
        net: 0,
        total_taxes: 0,
        cost_in_php: 0,
        cost_in_usd: 0,
      },
      remarks: "",
      status: "UNPAID",
    },
  ]);

  // NUMBERING PRODUCT AND SERVICES
  const get_data_product_service = [...products_services];
  const product_service_length = get_data_product_service.length + 1;
  const no_prod_serv =
    "PS" + year + "0" + rss_length + "-" + product_service_length;
  const get_data_product_service_data = [...products_services_data];
  const length_two =
    get_data_product_service.length + get_data_product_service_data.length + 1;
  const add_no_prod_serv = "PS" + year + "0" + rss_length + "-" + length_two;

  // FUNCTION OF ONCHANGE
  let set_products_services_data_onChange = (e, i) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i][e.target.name] = e.target.value;
    new_set_products_services_data_onChange[i]["prod_serv_class"] =
      prod_serv_class;
    new_set_products_services_data_onChange[i]["prod_serv_type"] =
      prod_serv_type;
    new_set_products_services_data_onChange[i]["no"] = no_prod_serv;

    set_products_services_data(new_set_products_services_data_onChange);
  };

  // DETAILS DATA
  let add_detail = (i) => {
    let new_set_products_services_data_onChange_detail = [
      ...products_services_data,
    ];
    new_set_products_services_data_onChange_detail[i]["detail"].push({
      // FOR AIRFARE
      route_class: "",
      route_from: "",
      route_to: "",
      date: new Date(),
      airline: "",
      flight_no: "",
      class: "",
      // FOR HOTEL & CRUISE
      date_from: new Date(),
      date_to: new Date(),
      num_rooms: "",
      type_cabin: "",
      destination: "",
      itinerary: "",
    });
    set_products_services_data(new_set_products_services_data_onChange_detail);
  };

  // FUNCTION ONCHANGE
  let set_products_services_data_onChange_detail = (i, e, ii) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].detail[ii][e.target.name] =
      e.target.value;
    // THIS PART IS FOR ITINERARY AUTOMATION
    if (
      new_set_products_services_data_onChange[i].detail[ii]["route_class"] ===
      ""
    ) {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].detail[ii]["itinerary"] =
          "/" +
          new_set_products_services_data_onChange[i].detail[ii]["route_from"])
      );
    } else if (
      new_set_products_services_data_onChange[i].detail[ii]["route_class"] ===
      "VIA"
    ) {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].detail[ii]["itinerary"] =
          "/X" +
          new_set_products_services_data_onChange[i].detail[ii]["route_from"])
      );
    } else if (
      new_set_products_services_data_onChange[i].detail[ii]["route_class"] ===
      "SURFACE"
    ) {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].detail[ii]["itinerary"] =
          "//" +
          new_set_products_services_data_onChange[i].detail[ii]["route_from"])
      );
    } else {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].detail[ii]["itinerary"] =
          new_set_products_services_data_onChange[i].detail[ii]["route_from"])
      );
    }

    // ITINERARY AUTOMATED
    const startDate = moment(products_services_data[i].detail[0].date_from);
    const endDate = moment(products_services_data[i].detail[0].date_to);
    const diff = endDate.diff(startDate);
    const diffDuration = moment.duration(diff);

    // ITINERARY AUTOMATED FOR AIRFARE
    if (prod_serv_type === "FLIGHT") {
      const getlastarray =
        new_set_products_services_data_onChange[i].detail.at(-1);
      const elem = products_services_data[i].detail.map(
        (elem) => elem.itinerary
      );
      const itFetch = elem.join("") + "/" + getlastarray.route_to;

      set_products_services_data(
        (new_set_products_services_data_onChange[i]["itinerary"] = itFetch)
      );
      set_products_services_data(new_set_products_services_data_onChange);
    } else if (prod_serv_type === "HOTEL") {
      // ITINERARY AUTOMATED FOR HOTEL
      const hotelIt =
        diffDuration.days() +
        1 +
        "D" +
        diffDuration.days() +
        "N" +
        " AT " +
        products_services_data[i].detail[0].hotel_name;
      set_products_services_data(
        (new_set_products_services_data_onChange[i]["itinerary"] = hotelIt)
      );
    } else if (prod_serv_type === "CRUISE") {
      // ITINERARY AUTOMATED FOR CRUISE
      const cruiseIt =
        diffDuration.days() +
        1 +
        "DAYS " +
        " AT " +
        products_services_data[i].detail[0].vessel_name;
      set_products_services_data(
        (new_set_products_services_data_onChange[i]["itinerary"] = cruiseIt)
      );
    } else {
      set_products_services_data(new_set_products_services_data_onChange);
    }
    set_products_services_data(new_set_products_services_data_onChange);
  };

  // REMOVE DETAIL
  let remove_detail = (i, ii) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].detail.splice(ii, 1);
    set_products_services_data(new_set_products_services_data_onChange);
  };

  // REMOVE COST WITH SAME DETAIL
  let remove_cost = (i) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange.splice(i, 1);
    set_products_services_data(new_set_products_services_data_onChange);
  };

  // ADD NEW COSTING DATA (WHOLE PRODUCT AND SERVICE WITH SAME DETAIL IN AIRFARE ONLY)
  let add_new_cost = () => {
    set_products_services_data([
      ...products_services_data,
      {
        no: add_no_prod_serv,
        prod_serv_type: products_services_data[0].prod_serv_type,
        prod_serv_class: products_services_data[0].prod_serv_class,
        itinerary: products_services_data[0].itinerary,
        supplier: products_services_data[0].supplier,
        currency: products_services_data[0].currency,
        pay_mode: products_services_data[0].pay_mode,
        bank: products_services_data[0].bank,
        acct_no: products_services_data[0].acct_no,
        rec_loc: products_services_data[0].rec_loc,
        resrv_nbr: products_services_data[0].resrv_nbr,
        jour_type: products_services_data[0].jour_type,
        valid_carrier: products_services_data[0].valid_carrier,
        detail: products_services_data[0].detail,
        costing: {
          gross: 0,
          com_isChecked: false,
          com_percent: 0,
          com_amount: 0,
          taxes: [{ taxes: 0 }, { taxes: 0 }, { taxes: 0 }],
          taxes_total: 0,
          taxes_total_php: 0,
          taxes_total_usd: 0,
          travel_tax: "",
          ph_tax: 0,
          net: 0,
          total_taxes: 0,
          cost_in_php: 0,
          cost_in_usd: 0,
        },
        remarks: products_services_data[0].remarks,
        status: "UNPAID",
      },
    ]);
  };
  // FUNCTION ONCHANGE
  let set_products_services_data_onChange_costing = (i, e) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].costing[e.target.name] =
      e.target.value;

    if (new_set_products_services_data_onChange[i]["currency"] === "₱") {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].costing["cost_in_usd"] =
          (parseFloat(new_set_products_services_data_onChange[i].costing.net) +
            parseFloat(
              new_set_products_services_data_onChange[i].costing.total_taxes
            )) /
          parseFloat(acr.rate))
      );
      set_products_services_data(
        (new_set_products_services_data_onChange[i].costing["cost_in_php"] =
          parseFloat(new_set_products_services_data_onChange[i].costing.net) +
          parseFloat(
            new_set_products_services_data_onChange[i].costing.total_taxes
          ))
      );
    } else if (new_set_products_services_data_onChange[i]["currency"] === "$") {
      set_products_services_data(
        (new_set_products_services_data_onChange[i].costing["cost_in_php"] =
          (parseFloat(new_set_products_services_data_onChange[i].costing.net) +
            parseFloat(
              new_set_products_services_data_onChange[i].costing.total_taxes
            )) *
          parseFloat(acr.rate))
      );
      set_products_services_data(
        (new_set_products_services_data_onChange[i].costing["cost_in_usd"] =
          parseFloat(new_set_products_services_data_onChange[i].costing.net) +
          parseFloat(
            new_set_products_services_data_onChange[i].costing.total_taxes
          ))
      );
    }
    // new_set_products_services_data_onChange[i]["desc"] =
    //   "COSTING FOR " +
    //   new_set_products_services_data_onChange[i].costing.travel_tax +
    //   " FARE";
    set_products_services_data(new_set_products_services_data_onChange);
  };
  //  TAXES DATA
  let add_taxes = (i) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].costing.taxes.push({
      taxes: 0,
    });
    set_products_services_data(new_set_products_services_data_onChange);
  };
  // FUNCTION REMOVE TAXES
  let remove_taxes = (i, iii) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].costing.taxes.splice(iii, 1);
    set_products_services_data(new_set_products_services_data_onChange);
  };
  // FUNCTION ONCHANGE
  let set_taxes_onChange = (i, e, iii) => {
    let new_set_products_services_data_onChange = [...products_services_data];
    new_set_products_services_data_onChange[i].costing.taxes[iii][
      e.target.name
    ] = e.target.value;
    new_set_products_services_data_onChange[i].costing["taxes_total"] =
      new_set_products_services_data_onChange[i].costing.taxes
        .map((taxes) => taxes.taxes)
        .reduce((total, taxes) => total + parseFloat(taxes), 0);

    if (new_set_products_services_data_onChange[i]["currency"] === "₱") {
      new_set_products_services_data_onChange[i].costing["taxes_total_php"] =
        new_set_products_services_data_onChange[i].costing.taxes
          .map((taxes) => taxes.taxes)
          .reduce((total, taxes) => total + parseFloat(taxes), 0);

      new_set_products_services_data_onChange[i].costing["taxes_total_usd"] =
        new_set_products_services_data_onChange[i].costing.taxes
          .map((taxes) => taxes.taxes)
          .reduce(
            (total, taxes) => total + parseFloat(taxes) / parseFloat(acr.rate),
            0
          );
    } else if (new_set_products_services_data_onChange[i]["currency"] === "$") {
      new_set_products_services_data_onChange[i].costing["taxes_total_usd"] =
        new_set_products_services_data_onChange[i].costing.taxes
          .map((taxes) => taxes.taxes)
          .reduce((total, taxes) => total + parseFloat(taxes), 0);

      new_set_products_services_data_onChange[i].costing["taxes_total_php"] =
        new_set_products_services_data_onChange[i].costing.taxes
          .map((taxes) => taxes.taxes)
          .reduce(
            (total, taxes) => total + parseFloat(taxes) * parseFloat(acr.rate),
            0
          );
    }

    set_products_services_data(new_set_products_services_data_onChange);
  };

  // ADDING PRODUCT & SERVICES IN LOCAL STORAGE
  const add_product_services = () => {
    set_products_services([...products_services, ...products_services_data]);

    handleAddClose();
    handleAddHotelClose();
    handleAddCruiseClose();
    handleAddOtherClose();

    set_products_services_data([
      {
        no: "",
        prod_serv_type: "",
        prod_serv_class: "",
        itinerary: "",
        supplier: { id: "", name: "" },
        currency: "",
        pay_mode: "",
        bank: "",
        acct_no: "",
        rec_loc: "",
        jour_type: "",
        valid_carrier: "",
        detail: [
          {
            // For Airline
            route_class: "-",
            route_from: "",
            route_to: "",
            date: new Date(),
            airline: "",
            flight_no: "",
            class: "",
            // For Hotel & Cruise
            date_from: new Date(),
            date_to: new Date(),
            num_rooms: "",
            type_cabin: "",
            destination: "",
            itinerary: "",
          },
        ],
        costing: {
          gross: 0,
          com_isChecked: false,
          com_percent: 0,
          com_amount: 0,
          taxes: [{ taxes: 0 }, { taxes: 0 }, { taxes: 0 }],
          taxes_total: 0,
          taxes_total_php: 0,
          taxes_total_usd: 0,
          travel_tax: "",
          ph_tax: 0,
          net: 0,
          total_taxes: 0,
          cost: 0,
        },
        status: "UNPAID",
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("product_service", JSON.stringify(products_services));
  }, [products_services]);

  useEffect(() => {
    localStorage.setItem("acr", JSON.stringify(acr));
  }, [acr]);

  // DATA PASSENGER (STEP 3-4)
  const [passengers, set_passengers] = useState(() => {
    const saved = localStorage.getItem("passenger");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [remit_cur, set_remit_cur] = useState("");

  // DATA FLIGHT TICKETS (STEP 5)
  // FROM MONGO DB tbl_rs
  const gds_ticket = [...props.rss]
    .map((e) => {
      return e.passenger
        .map((ee) => {
          return ee.ticket
            .map((eee) => {
              return eee.ticket_data
                .map((eeee) => {
                  return { ticket_no: eeee.ticket_no };
                })
                .flat();
            })
            .flat();
        })
        .flat();
    })
    .flat();
  // FROM MONGO DB tbl_gds
  const gds_series = [...props.gdss]
    .map((e) => {
      return e.series.map((ee) => {
        return {
          ticket_no: ee.ticket_no,
        };
      });
    })
    .flat();

  // CHECKING NUMBER GDS SERIES
  const gds_join = [...gds_series, ...gds_ticket];
  const gds_get = [];
  const gds_fetch = gds_join.filter((element) => {
    const isDuplicate = gds_get.includes(element);

    if (!isDuplicate) {
      gds_get.push(element.ticket_no);
      return true;
    }
    return false;
  });

  const gds_validation = gds_get.filter(
    (v, i) => gds_get.indexOf(v) === gds_get.lastIndexOf(v)
  );

  const [ticket, set_ticket] = useState([]);
  // FUNCTION ONCHANGE
  let set_ticket_onChange = (i, ii, iii, e) => {
    let new_set_ticket_data_onChange = [...ticket];
    new_set_ticket_data_onChange[i].ticket[ii].ticket_data[iii][e.target.name] =
      e.target.value;
    set_ticket(new_set_ticket_data_onChange);
  };

  let set_ticket_no_onChange = (i, ii, iii, value) => {
    let new_set_ticket_data_onChange = [...ticket];
    new_set_ticket_data_onChange[i].ticket[ii].ticket_data[iii]["ticket_no"] =
      value;
    set_ticket(new_set_ticket_data_onChange);
  };

  let set_ticket_deploy = () => {
    set_ticket([...ticket, ...passengers]);
  };

  //  ADD TICKET DATA
  let add_ticket = (i, ii) => {
    let new_set_ticket_data = [...ticket];
    new_set_ticket_data[i].ticket[ii].ticket_data.push({
      ticket_no: null,
      ticket_type: "E-TICKET",
    });
    set_ticket(new_set_ticket_data);
  };
  // PASSENGER REDEPLOY IN TICKETS
  const redeploy_passenger = () => {
    set_passengers([...ticket]);
    set_ticket([]);
  };

  // FUNCTION REMOVE TICKET
  let remove_ticket = (i, ii, iii) => {
    let delete_set_ticket_data = [...ticket];
    delete_set_ticket_data[i].ticket[ii].ticket_data.splice(iii, 1);
    set_ticket(delete_set_ticket_data);
  };

  useEffect(() => {
    localStorage.setItem("passenger", JSON.stringify(passengers));
  }, [passengers]);

  // PARTICULARS (STEP 6)

  const [particular, set_particular] = useState("");
  const [remarks, set_remarks] = useState("");
  const [part2, set_part2] = useState("");
  const [part3, set_part3] = useState("");

  // REPORT (STEP 7)
  // PRODUCT & SERVICES REPORT COUNT
  var report = [];
  // PRODUCT AND SERVICE COUNT AVAIL.
  const pass_report = [...passengers]
    .map((e) => {
      return e.product_service_deploy.map((ee) => {
        return ee;
      });
    })
    .flat();
  // PRODUCT & SERVICES REPORT COUNT
  pass_report.reduce(function (res, value) {
    if (!res[value.no]) {
      res[value.no] = {
        no: value.no,
        qty: 0,
        currency: value.currency,
        cost_in_php: value.cost_in_php,
        cost_in_usd: value.cost_in_usd,
      };
      report.push(res[value.no]);
    }
    res[value.no].qty += value.qty;
    res[value.no].total_cost_in_usd = res[value.no].qty * value.cost_in_usd;
    res[value.no].total_cost_in_php = res[value.no].qty * value.cost_in_php;
    return res;
  }, {});

  // GRAND TOTAL SELLING
  const pass_total_selling = [...passengers].map((e) => {
    return e;
  });

  const [total_selling, set_total_selling] = useState({
    remit_currency: "",
    grand_total_selling_in_usd: 0,
    grand_total_selling_in_php: 0,
  });

  // PAYMENT DETAILS
  const [payment_detail, set_payment_details] = useState({
    amount_received_php: 0,
    amount_received_usd: 0,
    balance_php: 0,
    balance_usd: 0,
  });

  let grandtotal_compute = () => {
    const result_in_php = pass_total_selling.reduce(
      (total, currentValue) =>
        (total = total + currentValue.selling.selling_price_in_php),
      0
    );
    const result_in_usd = pass_total_selling.reduce(
      (total, currentValue) =>
        (total = total + currentValue.selling.selling_price_in_usd),
      0
    );
    set_total_selling({
      remit_currency: remit_cur,
      grand_total_selling_in_php: parseFloat(result_in_php),
      grand_total_selling_in_usd: parseFloat(result_in_usd),
    });

    set_payment_details({
      amount_received_php: 0,
      amount_received_usd: 0,
      balance_php: parseFloat(result_in_php),
      balance_usd: parseFloat(result_in_usd),
    });
  };

  // GRAND TOTAL COST
  const pass_total_cost = [...report].map((e) => {
    return e;
  });

  const [total_cost, set_total_cost] = useState({
    grand_total_cost_in_usd: 0,
    grand_total_cost_in_php: 0,
  });

  let grandtotal_cost_compute = () => {
    const result_in_php = pass_total_cost.reduce(
      (total, currentValue) => (total = total + currentValue.total_cost_in_php),
      0
    );
    const result_in_usd = pass_total_cost.reduce(
      (total, currentValue) => (total = total + currentValue.total_cost_in_usd),
      0
    );
    set_total_cost({
      grand_total_cost_in_php: result_in_php,
      grand_total_cost_in_usd: result_in_usd,
    });
  };

  // ADD FLIGHT TICKETS
  const [addOpenTicket, setAddOpenTicket] = React.useState(false);
  const handleAddOpenTicket = () => setAddOpenTicket(true);
  const handleAddCloseTicket = () => {
    setAddOpenTicket(false);
    set_ticket([]);
  };

  // ADD FLIGHT
  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  // ADD HOTEL
  const [addOpenHotel, setAddOpenHotel] = React.useState(false);
  const handleAddHotelOpen = () => setAddOpenHotel(true);
  const handleAddHotelClose = () => setAddOpenHotel(false);

  // ADD CRUISE
  const [addOpenCruise, setAddOpenCruise] = React.useState(false);
  const handleAddCruiseOpen = () => setAddOpenCruise(true);
  const handleAddCruiseClose = () => setAddOpenCruise(false);

  // ADD OTHER "SHOREX, CITY TOUR AND SO ON"
  const [addOpenOther, setAddOpenOther] = React.useState(false);
  const handleAddOtherOpen = () => setAddOpenOther(true);
  const handleAddOtherClose = () => setAddOpenOther(false);

  // RS DATA FOR DEPLOYMENT IN MONGODB
  const [rs, set_rs] = useState({
    particular: "",
    ref_no: "",
    booking_no: "",
    rs_no: "",
    acr: "",
    customer: {},
    product_service: [],
    product_service_compute: {},
    passenger: [],
    grand_total_cost: {},
    grand_total_selling: {},
    encode_by: {},
    handler_by: {},
    remarks: "",
    payment_detail: {},
    status: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  var myDate = new Date(acr.date);
  var pay_due = myDate.setDate(
    myDate.getDate() + parseInt(customer_data.acct_data.payment_term)
  );
  var date_pay = new Date(pay_due);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    grandtotal_compute();
    grandtotal_cost_compute();
    set_rs({
      particular: particular,
      ref_no: ref_no,
      booking_no: no_booking,
      rs_no: no_rs,
      acr: acr,
      customer: customer_data,
      product_service: [...products_services],
      product_service_compute: report,
      passenger: [...passengers],
      grand_total_cost: total_cost,
      grand_total_selling: total_selling,
      payment_due: date_pay,
      encode_by: {
        _id: user._id,
        name: user.first_name + " " + user.last_name,
      },
      handler_by: handler,
      remarks: remarks,
      payment_detail: payment_detail,
      status: "UNPAID",
    });
  };

  // DATA FOR PAYABLE
  const payable = passengers
    .map((e) => {
      return e.product_service_deploy
        .map((ee) => {
          return {
            no: no_rs,
            supplier_no: ee.supplier_no,
            product_no: ee.no,
            passenger_no: e.no,
            currency: ee.currency,
            cost_in_php: ee.cost_in_php,
            cost_in_usd: ee.cost_in_usd,
            status: "UNPAID",
          };
        })
        .flat();
    })
    .flat();

  // DATA FOR LIQUIDATION
  const liquidation_pass = passengers
    .map((e) => {
      return {
        passenger_no: e.no,
        name:
          e.title +
          " " +
          e.last_name +
          ", " +
          e.first_name +
          " " +
          e.suffix +
          " " +
          e.middle_name,
        received_php: 0,
        received_usd: 0,
        status: "UNPAID",
      };
    })
    .flat();

  const liquidation = {
    no: no_rs,
    passenger: liquidation_pass,
    received_php: 0,
    received_usd: 0,
    status: "UNPAID",
  };
  console.log(liquidation);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
    setOpen(false);
    set_products_services([]);
    set_acr({ rate: "", date: null });
    set_passengers([]);
    set_customer_data({
      customer_type: "",
      misc_name: "",
      acct_data: {
        acct_name: "",
        address: "",
        contact_no: "",
        payment_term: 0,
        email: "",
      },
    });
    set_handler(null);
  };

  // SUBMIT TO MONGO DB
  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createRs(rs));
    props.dispatch(props.createPsd(payable));
    props.dispatch(props.createLiquidation(liquidation));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
    overflowY: "scroll",
  };

  function getSteps() {
    return [
      "SELECT CUSTOMER",
      "PRODUCT AND SERVICES",
      "PASSENGER",
      "SELLING",
      "TICKETS NO",
      "PARTICULARS",
      "REVIEW INFORMATION",
    ];
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BookingCreateModalSelectCustomer
            customer={props.customer}
            customer_data={customer_data}
            set_customer_data={set_customer_data}
            set_customer_data_onChange={set_customer_data_onChange}
            user={props.user}
            handler={handler}
            set_handler={set_handler}
          />
        );
      case 1:
        return (
          <BookingCreateModalProductAndServices
            // MONGO DB
            suppliers={props.suppliers}
            acrs={props.acrs}
            // LOCAL STORAGE
            ref_no={ref_no}
            set_ref_no={set_ref_no}
            acr={acr}
            set_acr={set_acr}
            prod_serv_class={prod_serv_class}
            set_prod_serv_class={set_prod_serv_class}
            prod_serv_type={prod_serv_type}
            set_prod_serv_type={set_prod_serv_type}
            products_services_data={products_services_data}
            set_products_services_data={set_products_services_data}
            set_products_services_data_onChange={
              set_products_services_data_onChange
            }
            add_detail={add_detail}
            set_products_services_data_onChange_detail={
              set_products_services_data_onChange_detail
            }
            remove_detail={remove_detail}
            remove_cost={remove_cost}
            add_new_cost={add_new_cost}
            set_products_services_data_onChange_costing={
              set_products_services_data_onChange_costing
            }
            add_taxes={add_taxes}
            set_taxes_onChange={set_taxes_onChange}
            remove_taxes={remove_taxes}
            add_product_services={add_product_services}
            products_services={products_services}
            user={props.user}
            // OPEN ADD FLIGHT MODAL
            open={addOpen}
            onClose={handleAddClose}
            handleOpen={handleAddOpen}
            //  OPEN ADD HOTEL MODAL
            openHotel={addOpenHotel}
            closeHotel={handleAddHotelClose}
            handleAddHotelOpen={handleAddHotelOpen}
            //  OPEN ADD CRUISE MODAL
            openCruise={addOpenCruise}
            closeCruise={handleAddCruiseClose}
            handleAddCruiseOpen={handleAddCruiseOpen}
            //  OPEN ADD OTHER MODAL
            openOther={addOpenOther}
            closeOther={handleAddOtherClose}
            handleAddOtherOpen={handleAddOtherOpen}
          />
        );
      case 2:
        return (
          <BookingCreateModalPassenger
            products_services={products_services}
            acr={acr}
            year={year}
            rss_length={rss_length}
            passengers={passengers}
            set_passengers={set_passengers}
            remit_cur={remit_cur}
            set_remit_cur={set_remit_cur}
          />
        );
      case 3:
        return (
          <BookingCreateModalSelling
            products_services={products_services}
            acr={acr}
            year={year}
            rss_length={rss_length}
            passengers={passengers}
            set_passengers={set_passengers}
            remit_cur={remit_cur}
            set_remit_cur={set_remit_cur}
          />
        );
      case 4:
        return (
          <BookingCreateModalFlightTicketNo
            gds_series={gds_series}
            products_services={products_services}
            passengers={passengers}
            set_passengers={set_passengers}
            gds_validation={gds_validation}
            ticket={ticket}
            set_ticket={set_ticket}
            set_ticket_no_onChange={set_ticket_no_onChange}
            set_ticket_onChange={set_ticket_onChange}
            add_ticket={add_ticket}
            addOpenTicket={addOpenTicket}
            handleAddOpenTicket={handleAddOpenTicket}
            handleAddCloseTicket={handleAddCloseTicket}
            set_ticket_deploy={set_ticket_deploy}
            redeploy_passenger={redeploy_passenger}
            remove_ticket={remove_ticket}
          />
        );
      case 5:
        return (
          <BookingCreateModalParticulars
            particular={particular}
            set_particular={set_particular}
            prod_serv_class={prod_serv_class}
            part2={part2}
            part3={part3}
            set_part2={set_part2}
            set_part3={set_part3}
            remarks={remarks}
            set_remarks={set_remarks}
          />
        );
      case 6:
        return (
          <BookingCreateModalReviewInformation
            customer={customer_data}
            products_services={products_services}
            passengers={passengers}
            no_rs={no_rs_print}
            no_booking={no_booking_print}
            acr={acr}
            ref_no={ref_no}
            particular={particular}
            total_selling={total_selling}
            total_cost={total_cost}
            report={report}
            user={user}
            handler={handler}
          />
        );

      default:
        return "unknown step";
    }
  }

  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Create Booking
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} columns={16}>
                      <BookingCreateModalPrint
                        ref={componentRef}
                        customer={customer_data}
                        products_services={products_services}
                        passengers={passengers}
                        no_rs={no_rs_print}
                        no_booking={no_booking_print}
                        acr={acr}
                        ref_no={ref_no}
                        particular={particular}
                        total_selling={total_selling}
                        total_cost={total_cost}
                        report={report}
                        user={user}
                        handler={handler}
                      />
                    </Grid>
                  </CardContent>
                </Card>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <ReactToPrint
                  pageStyle={pageStyle}
                  content={() => componentRef.current}
                >
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          onClick={() => {
                            handleReset();
                            handlePrint();
                          }}
                        >
                          Print & Close
                        </Button>
                      </>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClose}
                  sx={{ mr: 1 }}
                >
                  CONTINUE LATER
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReset}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={onSubmit}
                    // onClick={handleNext}
                    variant="contained"
                    color="success"
                  >
                    SUBMIT
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BookingCreateModal;
