import React from "react";
import { Box } from "@chakra-ui/react";
import { BiCheck, BiPencil } from "react-icons/bi";
function Instruction() {
  return (
    <div className="field">
      <Box
        color="white"
        rounded={"24px"}
        px={"10"}
        py={4}
        m={20}
        border="4px solid"
        borderColor="grape.800"
        bg={"sky.500"}
      >
        <p className="title">🧐 How it works:</p>
        <div className="tag">
          <p className="list">
            Type or paste your text below — like a normal word document.
          </p>
        </div>
        <div className="tag">
          <p className="list">
            Tap "Highlight" <BiPencil fontSize={"20px"} />
            and pick the words you want to turn into blanks.
          </p>
        </div>
        <div className="tag">
          <p className="list">
            Hit "Done" <BiCheck fontSize={"24px"} /> to build your fill-in
            quiz!
          </p>
        </div>
      </Box>
    </div>
  );
}

export default Instruction;
