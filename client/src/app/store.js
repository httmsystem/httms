import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice.js";
import supplierReducer from "../features/supplier/supplierSlice.js";
import userReducer from "../features/user/userSlice.js";
import acrReducer from "../features/acr/acrSlice.js";
import gdsReducer from "../features/gds/gdsSlice.js";
import rsReducer from "../features/rs/rsSlice.js";
import receiptReducer from "../features/receipt/receiptSlice.js";
import paymentReducer from "../features/payment/paymentSlice.js";
import adjustmentReducer from "../features/adjustment/adjustmentSlice.js";
import psdReducer from "../features/psd/psdSlice.js";
import invoiceReducer from "../features/invoice/invoiceSlice.js";
import releaseReducer from "../features/release/releaseSlice.js";
import liquidationReducer from "../features/liquidation/liquidationSlice.js";
import bankReducer from "../features/bank/bankSlice.js";
import utilityReducer from "../features/utility/utilitySlice.js";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    suppliers: supplierReducer,
    users: userReducer,
    acrs: acrReducer,
    gdss: gdsReducer,
    rss: rsReducer,
    receipts: receiptReducer,
    payments: paymentReducer,
    adjustments: adjustmentReducer,
    psds: psdReducer,
    invoices: invoiceReducer,
    releases: releaseReducer,
    liquidations: liquidationReducer,
    banks: bankReducer,
    utilitys: utilityReducer,
  },
});
