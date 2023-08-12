import React from "react";
import Result from "./Result";
import "./input.css";
import Pdf from "react-to-pdf";
const ref = React.createRef();
const InputChange = ({
  index,
  str_arr,
  submit,
  setSubmit,
  disable_input_box,
}) => {
  let i = 1;
  return (
    <div>
      <Pdf  targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button style={{color: "white", backgroundColor: "#FAC898" , fontSize: 20}}  onClick={toPdf}>Generate PDF</button>}
      </Pdf>
      <div id="makepdf" className="pdf" ref={ref} style={{ margin: 12 }}>
        {submit ? (
          <Result str_arr={str_arr} /> // showing correct and wrong ans with colored border and tooltip
        ) : (
          str_arr.map((item, idx) => {
            if (index.includes(idx)) {
              // taking input in input boxes
              return (
                <span>
                  <b>{i++}</b>
                  <input
                    className="inputBorder"
                    disabled={disable_input_box}
                    id={idx}
                  ></input>
                </span>
              );
            } else return <span key={idx}>{item} </span>; //not selected words
          })
        )}
      </div>
    </div>
  );
};

export default InputChange;
