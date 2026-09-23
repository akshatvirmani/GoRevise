import React, { useState } from "react";
import "./highlightCSS.css";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar";
import InputChange from "./InputChange";
import ReturnFocus from "./DialogPopover";
import { useDisclosure } from "@chakra-ui/react";
import SaveAndTakeQuiz from "./Save_take_Quiz";
import Instruction from "./Instruction";
import Texts from "./Texts";
import ShowButtons from "./ShowButtons";
import ResultButtons from "./ResultButtons";
import { gradeAnswers, countCorrect } from "../utils/gradeQuiz";
import { saveQuiz, updateQuiz, recordAttempt } from "../utils/quizStorage";
const Test = ({ inputText, editText, initialIndex, quizId: initialQuizId }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const [str_arr, setStr_arr] = useState(inputText.split(" ")); //split given input, each word is element of array.
  const finalRef = React.useRef();
  const [show_choice_page, setShow_page] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [correct_ans_count, setCorrect_ans_count] = useState(0);
  const [count_blank, setCount_blank] = useState(
    initialIndex ? initialIndex.length : 0
  );
  const [toggle, setToggle] = useState(false); //to go back in word selection phase
  const [disable_input_box, setDisable_input_box] = useState(!!initialIndex);
  const [index, setIndex] = useState(initialIndex || []);
  const [submit, setSubmit] = useState(false);
  const [hideBtn, setHideBtn] = useState(!!initialIndex);
  const [viewScore, setViewScore] = useState(false);
  const [viewDone, setViewDone] = useState(true);
  const [isHighlight_Done, setHighlight] = useState(!!initialIndex);
  const [disableInput, setDisableInput] = useState(false);
  const [quizId, setQuizId] = useState(initialQuizId || null);

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

  // Automatically blank out a random 20% of the words instead of hand-picking each one.
  const handleAutoBlank = () => {
    const wordIndexes = str_arr
      .map((word, idx) => idx)
      .filter((idx) => str_arr[idx].trim().length > 0);
    const blankCount = Math.max(1, Math.round(wordIndexes.length * 0.2));
    const randomIndexes = [...wordIndexes]
      .sort(() => Math.random() - 0.5)
      .slice(0, blankCount)
      .sort((a, b) => a - b);

    setIndex(randomIndexes);
    setCount_blank(randomIndexes.length);
    setToggle(true);
    setHighlight(true);
  };

  // Handle Done after selecting words
  const handleDone = () => {
    if (quizId) {
      updateQuiz(quizId, { text: inputText, blankIndexes: index });
    } else {
      const saved = saveQuiz({ text: inputText, blankIndexes: index });
      setQuizId(saved.id);
    }
    setShow_page(true);
    setDisable_input_box(true);
    setHideBtn(true);
  };

  // Go back from the save/take-quiz choice screen to adjust which words are blanked.
  const handleEditBlanks = () => {
    setShow_page(false);
    setDisable_input_box(false);
    setHideBtn(false);
  };

  //  Click on Done btn after filling the text in input.
  const handleSubmit = () => {
    onOpen();
    const sortedIndex = [...index].sort((a, b) => a - b);
    const ans_array = sortedIndex.map((idx) => document.getElementById(idx).value);
    const graded = gradeAnswers(str_arr, index, ans_array);
    setStr_arr(graded);
    setSubmit(true);
    return graded;
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
    const graded = handleSubmit();
    if (quizId) {
      recordAttempt(quizId, { correct: countCorrect(graded), total: index.length });
    }
    setViewScore(true);
    setViewDone(false);
    setDisableInput(true);
  };

  return (
    <>
      {show_choice_page ? (
        <SaveAndTakeQuiz
          handleSave={handleSave}
          handleEditBlanks={handleEditBlanks}
          shareableQuiz={{ text: inputText, blankIndexes: index }}
        />
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

          <Box bg={cardBg} m={20} rounded={"2xl"}>
            {!hideBtn && (
              <ShowButtons
                editText={editText}
                handleDone={handleDone}
                inputText={inputText}
                highlight={highlight}
                handleAutoBlank={handleAutoBlank}
                isHighlight_Done={isHighlight_Done}
              />
            )}

            {hideBtn && (
              <ResultButtons
                onOpenScore={onOpen}
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
                  onSubmit={handleViewScore_and_done}
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
