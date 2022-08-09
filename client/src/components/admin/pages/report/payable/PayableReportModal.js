import React, { useRef } from "react";
import { Box, Button, Modal } from "@mui/material";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import PayableReportPrint from "./PayableReportPrint";

const PayableReportModal = (props) => {
  const componentRef = useRef();
  const pageStyle = `
      
      @page {
        size: 297mm 210mm;
        margin: 15mm
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
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <PayableReportPrint
            ref={componentRef}
            suppliers_filter={props.suppliers_filter}
            data_filter={props.data_filter}
            cur={props.cur}
            stat={props.stat}
            date={props.date}
          ></PayableReportPrint>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
              onClick={props.close}
            >
              Cancel
            </Button>
            <ReactToPrint
              pageStyle={pageStyle}
              content={() => componentRef.current}
            >
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <>
                    <Box sx={{ flex: "1 1 auto" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handlePrint();
                          props.close();
                        }}
                      >
                        Print & Close
                      </Button>
                    </Box>
                  </>
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PayableReportModal;
