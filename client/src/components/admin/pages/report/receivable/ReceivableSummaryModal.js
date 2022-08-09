import React, { useRef } from "react";
import { Box, Button, Modal } from "@mui/material";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ReceivableSummaryPrint from "./ReceivableSummaryPrint";
const ReceivableSummaryModal = (props) => {
  const componentRef = useRef();
  const pageStyle = `
    
    @page {
      size: 210mm 297mm;
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
          <ReceivableSummaryPrint
            ref={componentRef}
            date={props.date}
            report_php={props.report_php}
            report_usd={props.report_usd}
            grand_total_php={props.grand_total_php}
            grand_total_usd={props.grand_total_usd}
          />
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

export default ReceivableSummaryModal;
