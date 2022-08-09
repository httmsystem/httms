import React from "react";
import "./index.css";
import { Divider } from "@mui/material";
import {
  Home,
  Airlines,
  PointOfSale,
  Language,
  TrendingUp,
  Person,
  Group,
  ContactPage,
  CurrencyExchange,
  Feed,
  Description,
  AccountBalance,
  CleaningServices

} from "@mui/icons-material";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sideMenu">
          <ul className="sidebarList">
            <Link to="/admin/">
              <li className="sidebarListItem active">
                <Home className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
          </ul>
        </div>

        <div className="sideMenu">
          <h3 className="sidebarTitle">Booking & Reservation</h3>
          <Divider />
          <ul className="sidebarList">
            <Link to="/admin/booking/">
              <li className="sidebarListItem ">
                <Airlines className="sidebarIcon" />
                Booking Management
              </li>
            </Link>
            <Link to="/admin/gds/">
              <li className="sidebarListItem">
                <Language className="sidebarIcon" />
                GDS Profiling
              </li>
            </Link>
            <Link to="/admin/liquidation/">
              <li className="sidebarListItem">
                <PointOfSale className="sidebarIcon" />
                Liquidation
              </li>
            </Link>
            <Link to="/admin/payable/">
              <li className="sidebarListItem">
                <PointOfSale className="sidebarIcon" />
                Payable
              </li>
            </Link>
          </ul>
        </div>

        <div className="sideMenu">
          <h3 className="sidebarTitle">Data</h3>
          <Divider />
          <ul className="sidebarList">
            <Link to="/admin/rss">
              <li className="sidebarListItem">
                <Feed className="sidebarIcon" />
                RS / SOA Print
              </li>
            </Link>

            <li className="sidebarListItem">
              <Feed className="sidebarIcon" />
              Passenger List
            </li>
            <li className="sidebarListItem">
              <Description className="sidebarIcon" />
              Official Receipt
            </li>
            <li className="sidebarListItem">
              <Description className="sidebarIcon" />
              Acknowledgement Receipt
            </li>
            <li className="sidebarListItem">
              <Description className="sidebarIcon" />
              Invoice / Bill
            </li>
          </ul>
        </div>

        <div className="sideMenu">
          <h3 className="sidebarTitle">Reports</h3>
          <Divider />
          <ul className="sidebarList">
            <Link to="/admin/report/ars">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Account Receivables Summary Report
              </li>
            </Link>
            <Link to="/admin/report/ard">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Account Receivables Detailed Report
              </li>
            </Link>
            <Link to="/admin/report/pay">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Payable Report
              </li>
            </Link>
          </ul>
        </div>

        <div className="sideMenu">
          <h3 className="sidebarTitle">Accounts</h3>
          <Divider />
          <ul className="sidebarList">
            <Link to="/admin/user/">
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                User Accounts
              </li>
            </Link>
            <Link to="/admin/customer/">
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                Customer Accounts
              </li>
            </Link>
            <Link to="/admin/supplier/">
              <li className="sidebarListItem">
                <ContactPage className="sidebarIcon" />
                Suppliers Accounts
              </li>
            </Link>
            <Link to="/admin/acr/">
              <li className="sidebarListItem">
                <CurrencyExchange className="sidebarIcon" />
                ACR
              </li>
            </Link>
            <Link to="/admin/bank/">
              <li className="sidebarListItem">
                <AccountBalance className="sidebarIcon" />
                Bank Accounts
              </li>
            </Link>
            <Link to="/admin/utility/">
              <li className="sidebarListItem">
                <CleaningServices className="sidebarIcon" />
                Utility Accounts
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
