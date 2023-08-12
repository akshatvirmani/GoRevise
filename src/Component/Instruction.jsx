import React from "react";
import { Box } from "@chakra-ui/react";
import { BiCheck, BiPencil } from "react-icons/bi";
function Instruction() {
  return (
    <div className="field">
      <Box
        color="white"
        rounded={"2xl"}
        px={"20"}
        m={20}
        bg={"rgb(255,160,122,.9)"}
      >
        <p className="title">Instructions:</p>
        <div className="tag">
          <p className="list">
            Edit the text like a normal word document. You can add and remove
            text too.
          </p>
        </div>
        <div className="tag">
          <p className="list">
            Click on "Highlight" <BiPencil fontSize={"20px"} color={"cyan"} />
            and simply highlight the words you want to blank out.
          </p>
        </div>
        <div className="tag">
          <p className="list">
            After editing, click on "done"{" "}
            <BiCheck fontSize={"30px"} color={"cyan"} /> to create your fill-in
            quiz.
          </p>
        </div>
      </Box>
    </div>
  );
}

export default Instruction;
