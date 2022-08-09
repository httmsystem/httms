import React from "react";
import "../../index.css";
import { Divider, Chip  } from "@mui/material";
import {} from "@mui/icons-material";

const WidgetLg = () => {
  return (
    <div className="widgetLg">
      <div className="widgetLgTitle">Lastest Transaction</div>
      <Divider />
      <table className="widgetLgTable">
        
        <tr className="widgetLgTr">
          <th className="widgetLgTh">REF NO.</th>
          <th className="widgetLgTr">ACCOUNT NAME</th>
          <th className="widgetLgTr">PARTICULARS</th>
          <th className="widgetLgTr">PAX NO.</th>
          <th className="widgetLgTr">TOTAL COST</th>
          <th className="widgetLgTr">INCOME</th>
          <th className="widgetLgTr">Status of Payment</th>
          
        </tr>
        
{/*         
        <tr className="widgetLgTr">
          <td className="widgetLgRefNo">202101</td>
          <td className="widgetLgAcctN">FLYRICH TRAVEL & TOUR</td>
          <td className="widgetLgDescrpt">TO BILL FOR COST OF 4D/3N HGK PACKAGE</td>
          <td className="widgetLgPax">1</td>
          <td className="widgetLgCost">₱106,863.65</td>
          <td className="widgetLgIncm">₱250.65</td>
          <td className="widgetLgStat"><Chip label="Paid" color="success" /></td>
        </tr>

        <tr className="widgetLgTr">
          <td className="widgetLgRefNo">202101</td>
          <td className="widgetLgAcctN">FLYRICH TRAVEL & TOUR</td>
          <td className="widgetLgDescrpt">TO BILL FOR COST OF 4D/3N HGK PACKAGE</td>
          <td className="widgetLgPax">1</td>
          <td className="widgetLgCost">₱106,863.65</td>
          <td className="widgetLgIncm">₱250.65</td>
          <td className="widgetLgStat"><Chip label="Paid" color="success" /></td>
        </tr>

        <tr className="widgetLgTr">
          <td className="widgetLgRefNo">202101</td>
          <td className="widgetLgAcctN">FLYRICH TRAVEL & TOUR</td>
          <td className="widgetLgDescrpt">TO BILL FOR COST OF 4D/3N HGK PACKAGE</td>
          <td className="widgetLgPax">1</td>
          <td className="widgetLgCost">₱106,863.65</td>
          <td className="widgetLgIncm">₱250.65</td>
          <td className="widgetLgStat"><Chip label="Pending" color="warning" /></td>
        </tr>

        <tr className="widgetLgTr">
          <td className="widgetLgRefNo">202101</td>
          <td className="widgetLgAcctN">FLYRICH TRAVEL & TOUR</td>
          <td className="widgetLgDescrpt">TO BILL FOR COST OF 4D/3N HGK PACKAGE</td>
          <td className="widgetLgPax">1</td>
          <td className="widgetLgCost">₱106,863.65</td>
          <td className="widgetLgIncm">₱250.65</td>
          <td className="widgetLgStat"><Chip label="Pending" color="warning" /></td>
        </tr>
        
        
        <tr className="widgetLgTr">
          <td className="widgetLgRefNo">202101</td>
          <td className="widgetLgAcctN">FLYRICH TRAVEL & TOUR</td>
          <td className="widgetLgDescrpt">TO BILL FOR COST OF 4D/3N HGK PACKAGE</td>
          <td className="widgetLgPax">1</td>
          <td className="widgetLgCost">₱106,863.65</td>
          <td className="widgetLgIncm">₱250.65</td>
          <td className="widgetLgStat"><Chip label="Pending" color="warning" /></td>
        </tr> */}
      </table>
    </div>
  );
};

export default WidgetLg;
