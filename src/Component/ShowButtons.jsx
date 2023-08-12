import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { BiUndo, BiCheck, BiPencil } from "react-icons/bi";
import "./highlightCSS.css";

const ShowButtons = ({
  editText,

  highlight,
  handleDone,
  inputText,
  isHighlight_Done,
}) => {
  return (
    <HStack
      cursor="pointer"
      my={5}
      bg="black"
      color="white"
      justifyContent={"center"}
      alignItems={"center"}
      roundedTop={"2xl"}
      py={1}
      textAlign="center"
    >
      <Box mx={5} style={{ marginRight: "10px" }}>
        <Button
          color={"cyan"}
          backgroundColor={"black"}
          _hover={"black"}
          _focus={{ border: "none" }}
          variant={"unstyled"}
          onClick={(e) => editText(e, inputText)}
        >
          <BiUndo fontSize={"30px"} color={"cyan"} />
        </Button>
        <Text className="textshift">Edit</Text>
      </Box>

      {!isHighlight_Done && (
        <Box mx={5} onClick={highlight} style={{ marginRight: "10px" }}>
          <Button
            color={"cyan"}
            backgroundColor={"black"}
            _hover={"black"}
            _focus={{ border: "none" }}
            variant={"unstyled"}
          >
            <BiPencil fontSize={"30px"} color={"cyan"} />
          </Button>
          <Text className="textshift">Highlight</Text>
        </Box>
      )}
      {isHighlight_Done && (
        <Box mx={5} onClick={handleDone}>
          <Button
            color={"cyan"}
            backgroundColor={"black"}
            _hover={"black"}
            _focus={{ border: "none" }}
            variant={"unstyled"}
            // variant={"unstyled"}
          >
            <BiCheck fontSize={"30px"} color={"cyan"} />
          </Button>
          <Text className="textshift">Done</Text>
        </Box>
      )}
    </HStack>
  );
};

export default ShowButtons;
