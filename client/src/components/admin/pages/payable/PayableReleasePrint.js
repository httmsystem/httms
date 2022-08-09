import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

export const PayableReleasePrint = React.forwardRef((props, ref) => {
  const toWords = (amount) => {
    var string = amount.toString(),
      units,
      tens,
      scales,
      start,
      end,
      chunks,
      chunksLen,
      chunk,
      ints,
      i,
      word,
      words,
      and = "and";

    /* Remove spaces and commas */
    string = string.replace(/[, ]/g, "");

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return "zero";
    }

    /* Array of units as words */
    units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Sseven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    /* Array of tens as words */
    tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    /* Array of scales as words */
    scales = [
      "",
      "Thousand",
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quatttuor-Decillion",
      "Quindecillion",
      "Sexdecillion",
      "Septen-Decillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Centillion",
    ];

    /* Split user argument into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return "";
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split("").reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {
          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + " Hundred");
        }
      }
    }

    return words.reverse().join(" ");
  };
  function withDecimal(n) {
    var nums = n.toString().split(".");
    var whole = toWords(nums[0]);
    if (nums.length == 2) {
      var fraction = toWords(nums[1]);
      //  return whole + 'and ' + fraction;
      return whole + " & " + nums[1] + "/100";
    } else {
      return whole;
    }
  }

  return (
    <div ref={ref}>
      {" "}
      <Box sx={{ flexGrow: 1, fontSize: 12, m: 1 }}>
        <Grid container spacing={1} columns={30}>
          <Grid item xs={30} sx={{ p: 1, border: "1.5px solid black" }}>
            <div style={{ fontSize: 45, textAlign: "center" }}>
              <b>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
          </Grid>
          <Grid item xs={25} style={{ fontSize: 17 }}>
            PHP CHECK VOUCHER
          </Grid>
          <Grid item xs={5} style={{ fontSize: 18 }}>
            <b>CV-000001740</b>
          </Grid>
          <Grid item xs={30}></Grid>
          <Grid
            item
            xs={25}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            PAY TO
          </Grid>
          <Grid item xs={5} style={{ fontSize: 15 }}>
            DATE: {moment(new Date()).format("D MMM YYYY")}
          </Grid>
          <Grid item xs={30}></Grid>
          <Grid
            item
            xs={25}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            PARTICULARS
          </Grid>
          <Grid
            item
            xs={5}
            style={{ fontSize: 15, textAlign: "right" }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            AMOUNT
          </Grid>
          <Grid
            item
            xs={25}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black", height: 250 }}
          ></Grid>
          <Grid
            item
            xs={5}
            style={{ fontSize: 15, textAlign: "right" }}
            sx={{ p: 1, border: "1.5px solid black" }}
          ></Grid>
          <Grid
            item
            xs={25}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            TOTAL
          </Grid>
          <Grid
            item
            xs={5}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            PHP
          </Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid item xs={30}></Grid>
          <Grid
            item
            xs={20}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            <b>CHARGE TO THE FOLLOWING</b>
          </Grid>
          <Grid item xs={10} style={{ fontSize: 15 }}>
            Approved By __________________________
            <br />
          </Grid>
          <Grid
            item
            xs={20}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            <Grid container columns={20}>
              <Grid item xs={5} style={{ fontSize: 15 }}>
                <b>Bank Name</b>
              </Grid>
              <Grid item xs={5} style={{ fontSize: 15 }}>
                <b>Account No.</b>
              </Grid>
              <Grid item xs={5} style={{ fontSize: 15 }}>
                <b>Doc No.</b>
              </Grid>
              <Grid item xs={5} style={{ fontSize: 15 }}>
                <b>Amount</b>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} style={{ fontSize: 15 }}>
            <br />
            Prepared By __________________________
          </Grid>
          <Grid
            item
            xs={20}
            style={{ fontSize: 15, textAlign: "right", height: 100 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          ></Grid>
          <Grid item xs={10} style={{ fontSize: 15 }}>
            {" "}
            Received from <b>Horizon Travel & Tour Inc.</b> then sum of{" "}
            {withDecimal(101964.65)} Only {"("} <b>PHP 101,964.65</b> {")"} in
            full payment of the above.
            <br />
          </Grid>
          <Grid
            item
            xs={20}
            style={{ fontSize: 15 }}
            sx={{ p: 1, border: "1.5px solid black" }}
          >
            TOTAL AMOUNT
          </Grid>
          <Grid item xs={10} style={{ fontSize: 15 }}>
            <br />
            <br />
            <div>
              {" "}
              ____________________________________________________________
            </div>
            <div style={{ textAlign: "center" }}> Received By</div>
          </Grid>
          <Grid item xs={30}>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "text.primary",
              }}
            />
          </Grid>
          <Grid item xs={30} style={{ textAlign: "center" }}>
            {" "}
            FOR HORIZON TRAVEL
          </Grid>
          <Grid item xs={20} style={{ fontSize: 15 }}>
            <div>Date: {moment(new Date()).format("D MMM YYYY")}</div>
            <div>CV #: CV-0000001740</div>
            <div>Pay To:</div>
            <div>Total Amount:</div>
          </Grid>
          <Grid item xs={10} style={{ fontSize: 15 }}>
            <div>
              {" "}
              Received from <b>Horizon Travel & Tour Inc.</b> then sum of{" "}
              {withDecimal(101964.65)} Only {"("} <b>PHP 101,964.65</b> {")"} in
              full payment of the above.
            </div>
            <br />
            <br />
            <div>
              {" "}
              ____________________________________________________________
            </div>
            <div style={{ textAlign: "center" }}> Received By</div>
          </Grid>
          <Grid item xs={16}></Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default PayableReleasePrint;
