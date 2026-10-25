import React, { useState } from "react";
import "./highlightCSS.css";
import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Test from "./TestHome";
import Navbar from "./Navbar";
import { BsCheck2Circle } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import Instruction from "./Instruction";
import { decodeQuiz } from "../utils/shareQuiz";
// Taking input
function InputHighlight() {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");
  const textColor = useColorModeValue("black", "white");
  const location = useLocation();
  const savedQuiz = location.state?.savedQuiz;
  const sharedQuiz = !savedQuiz
    ? decodeQuiz(new URLSearchParams(location.search).get("share"))
    : null;
  const activeQuiz = savedQuiz || sharedQuiz;
  const [para, setPara] = useState(activeQuiz?.text || "");
  const [showInput, setShowInpt] = useState(!activeQuiz);

  const handleInput = (e) => {
    setPara(e.target.value);
  };

  // Done with text input ready to select and test.
  const handleSubmit = () => {
    setShowInpt(false);
  };
  // execute: edit text again.
  const editText = (e, text) => {
    setPara(para);
    setShowInpt(true);
  };

  return (
    <>
      {showInput ? (
        <Box overflow="hidden" minH={"100vh"}>
          <Navbar />
          <Instruction />

          <Box
            bg={cardBg}
            m={20}
            rounded={"24px"}
            border="5px solid"
            borderColor={cardBorder}
            boxShadow={`10px 10px 0 0 ${shadowColor}`}
            overflow="hidden"
          >
            <HStack
              bg="grape.600"
              color="white"
              px={"5"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              roundedTop={"24px"}
              py={2}
              textAlign="center"
              cursor="pointer"
            >
              <Box onClick={handleSubmit}>
                <Button
                  color={"white"}
                  backgroundColor={"transparent"}
                  _hover={{ transform: "scale(1.1)" }}
                  _focus={{ border: "none" }}
                  variant={"unstyled"}
                  onClick={handleSubmit}
                >
                  <BsCheck2Circle fontSize={"28px"} />
                </Button>
                <Text className="textshift" fontWeight="700" fontSize="sm">Done</Text>
              </Box>
            </HStack>

            <TextareaAutosize
              placeholder="Enter your text here!"
              value={para}
              style={{
                width: "95%",
                marginLeft: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                outline: "none",
                border: "none",
                padding: "10px",
                paddingLeft: "20px",
                resize: "none",
                overflow: "hidden",
                backgroundColor: "transparent",
                color: textColor,
                fontFamily: "'Nunito', sans-serif",
                fontSize: "18px",
                lineHeight: 1.6,
              }}
              onChange={(e) => handleInput(e)}
            />
          </Box>
        </Box>
      ) : (
        <Test
          inputText={para}
          editText={editText}
          initialIndex={activeQuiz?.blankIndexes}
          quizId={savedQuiz?.id}
        />
      )}
    </>
  );
}

export default InputHighlight;
