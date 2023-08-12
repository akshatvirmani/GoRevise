import React, { useState } from "react";
import "./highlightCSS.css";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Test from "./TestHome";
import Navbar from "./Navbar";
import { BsCheck2Circle } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import Instruction from "./Instruction";
// Taking input
function InputHighlight() {
  const [para, setPara] = useState("");
  const [showInput, setShowInpt] = useState(true);

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
        <Box
          overflow="hidden"
          bgImage={"/bg.png"}
          minH={"100vh"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          <Navbar color="white" />
          <Instruction />

          <Box bg={"white"} m={20} rounded={"2xl"}>
            <HStack
              my={5}
              bg="black"
              color="white"
              px={"5"}
              justifyContent={"right"}
              alignItems={"center"}
              roundedTop={"2xl"}
              py={0.5}
              textAlign="center"
              cursor="pointer"
            >
              <Box mx={5} onClick={handleSubmit}>
                <Button
                  color={"cyan"}
                  backgroundColor={"black"}
                  _hover={"black"}
                  _focus={{ border: "none" }}
                  variant={"unstyled"}
                >
                  <BsCheck2Circle fontSize={"30px"} color={"cyan"} />
                </Button>
                <Text className="textshift">Done</Text>
              </Box>
            </HStack>

            <TextareaAutosize
              placeholder="Enter your text here!"
              value={para}
              style={{
                width: "95%",
                marginLeft: "10px",
                marginBottom: "10px",
                outline: "none",
                border: "none",
                padding: "10px",
                paddingLeft: "20px",
                resize: "none",
                overflow: "hidden",
              }}
              onChange={(e) => handleInput(e)}
            />
          </Box>
        </Box>
      ) : (
        <Test inputText={para} editText={editText} />
      )}
    </>
  );
}

export default InputHighlight;
