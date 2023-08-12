import React, { useState } from "react";
import "./highlightCSS.css";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import InputChange from "./InputChange";
import ReturnFocus from "./DialogPopover";
import { useDisclosure } from "@chakra-ui/react";
import SaveAndTakeQuiz from "./Save_take_Quiz";
import Instruction from "./Instruction";
import Texts from "./Texts";
import ShowButtons from "./ShowButtons";
import ResultButtons from "./ResultButtons";
const Test = ({ inputText, editText }) => {
  const [str_arr, setStr_arr] = useState(inputText.split(" ")); //split given input, each word is element of array.
  const finalRef = React.useRef();
  const [show_choice_page, setShow_page] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [correct_ans_count, setCorrect_ans_count] = useState(0);
  const [count_blank, setCount_blank] = useState(0);
  const [toggle, setToggle] = useState(false); //to go back in word selection phase
  const [disable_input_box, setDisable_input_box] = useState(false);
  const [index, setIndex] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const [viewScore, setViewScore] = useState(false);
  const [viewDone, setViewDone] = useState(true);
  const [isHighlight_Done, setHighlight] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  // select and deselect words
  const handleHighlight = (e, idx) => {
    let newIndexArr;
    if (index.indexOf(idx) === -1) {
      newIndexArr = [...index, idx];
      setIndex(newIndexArr);
    } else {
      newIndexArr = index.filter((item) => item !== idx);
      console.log(newIndexArr);
      setIndex(newIndexArr);
    }
    setToggle(false); //to go back in word selection phase
    setCount_blank(index.length + 1);
    // console.log(count_blank);
    // e.preventDefault();
  };

  // Handle highlight to change buttons
  const highlight = () => {
    setToggle(true);
    setHighlight(true);
  };
  // Handle Done after selecting words
  const handleDone = () => {
    // debugger;
    setShow_page(true);
    setDisable_input_box(true);
    setHideBtn(true);
  };

  //  Click on Done btn after filling the text in input.
  const handleSubmit = () => {
    onOpen();
    index.sort();
    const ans_array = [];
    str_arr.map((item, idx) => {
      if (index.includes(idx)) {
        const val = document.getElementById(idx).value;
        ans_array.push(val);
        // console.log(val);
      }
      return 0;
    });
    index.map((item, idx) => {
      const prevVal = str_arr[item]; // old value at index[item].
      if (prevVal === ans_array[idx]) {
        // debugger;

        // setCorrect_ans_count(correct_ans_count + 1);
        const inp_obj = {
          item: ans_array[idx],
          result: true,
        };
        str_arr[item] = inp_obj;
        const new_str_arr = str_arr;
        setStr_arr(new_str_arr);
      } else {
        let id = Date.now().toString() + prevVal;
        const inp_obj = {
          id: id,
          prevVal: prevVal,
          item: ans_array[idx],
          result: false,
        };
        str_arr[item] = inp_obj;
        const new_str_arr = str_arr;
        setStr_arr(new_str_arr);
        // console.log("Wrong");
      }
      return 0;
    });
    // console.log(str_arr);
    setSubmit(true);
  };

  const handleSave = () => {
    setShow_page(false);
  };

  // count correct answers.
  const corrcet_ans = () => {
    let cnt = 0;
    str_arr.map((item) => {
      if (item.result === true) {
        cnt++;
      }
      return cnt;
    });
    return cnt;
  };
  const handleViewScore_and_done = () => {
    handleSubmit();
    onOpen();
    setViewScore(true);
    setViewDone(false);
    setDisableInput(true);
  };

  return (
    <>
      {show_choice_page ? (
        <SaveAndTakeQuiz handleSave={handleSave} />
      ) : (
        <Box
          overflow="hidden"
          bgImage={"/bg.png"}
          minH={"100vh"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          <Navbar color="white" />
          {/* viewscore popup */}
          <ReturnFocus
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            finalRef={finalRef}
            correct_ans_count={corrcet_ans}
            count_blank={count_blank}
          />
          <Instruction />

          <Box bg={"white"} m={20} rounded={"2xl"}>
            {!hideBtn && (
              <ShowButtons
                editText={editText}
                handleDone={handleDone}
                inputText={inputText}
                highlight={highlight}
                isHighlight_Done={isHighlight_Done}
              />
            )}

            {hideBtn && (
              <ResultButtons
                handleSubmit={handleSubmit}
                viewScore={viewScore}
                handleViewScore_and_done={handleViewScore_and_done}
                viewDone={viewDone}
              />
            )}
            {/* </HStack> */}

            <Text id="new_para" as={"p"} mt={"-35px"} fontSize={"lg"} p="8">
              {disable_input_box ? (
                //Taking input in to input boxes, and disabling those when click on submit
                <InputChange
                  id=""
                  index={index}
                  str_arr={str_arr}
                  submit={submit}
                  setSubmit={setSubmit}
                  disableInput={disableInput}
                />
              ) : (
                // Normal Text to select and deselect
                <Texts
                  handleHighlight={handleHighlight}
                  index={index}
                  str_arr={str_arr}
                  toggle={toggle}
                />
              )}
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Test;
