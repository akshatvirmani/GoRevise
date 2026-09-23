import React from "react";
import Result from "./Result";
import "./input.css";
import Pdf from "react-to-pdf";
import { useColorModeValue } from "@chakra-ui/react";
const ref = React.createRef();
const InputChange = ({
  index,
  str_arr,
  submit,
  setSubmit,
  disableInput,
  onSubmit,
}) => {
  const inputBg = useColorModeValue("white", "#4A5568");
  const inputColor = useColorModeValue("black", "white");
  let i = 0;
  const sortedIndex = [...index].sort((a, b) => a - b);

  const handleKeyDown = (e, position) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const nextId = sortedIndex[position + 1];
    if (nextId !== undefined) {
      document.getElementById(nextId)?.focus();
    } else if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div>
      {submit && (
        <Pdf targetRef={ref} filename="gorevise-quiz-results.pdf">
          {({ toPdf }) => (
            <button
              style={{ color: "white", backgroundColor: "#FAC898", fontSize: 20 }}
              onClick={toPdf}
            >
              Generate PDF
            </button>
          )}
        </Pdf>
      )}
      <div id="makepdf" className="pdf" ref={ref} style={{ margin: 12 }}>
        {submit ? (
          <Result str_arr={str_arr} /> // showing correct and wrong ans with colored border and tooltip
        ) : (
          str_arr.map((item, idx) => {
            if (index.includes(idx)) {
              // taking input in input boxes
              const position = i++;
              return (
                <span key={idx}>
                  <b>{position + 1}</b>
                  <input
                    className="inputBorder"
                    disabled={disableInput}
                    id={idx}
                    autoFocus={position === 0}
                    onKeyDown={(e) => handleKeyDown(e, position)}
                    style={{ backgroundColor: inputBg, color: inputColor }}
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
