import React from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { BiUndo, BiCheck, BiPencil, BiShuffle } from "react-icons/bi";
import "./highlightCSS.css";

const ShowButtons = ({
  editText,
  highlight,
  handleDone,
  inputText,
  handleAutoBlank,
  isHighlight_Done,
}) => {
  return (
    <HStack
      cursor="pointer"
      bg="grape.600"
      color="white"
      justifyContent={"center"}
      alignItems={"center"}
      roundedTop={"24px"}
      py={3}
      spacing={{ base: 4, md: 8 }}
      textAlign="center"
    >
      <Box onClick={(e) => editText(e, inputText)}>
        <IconButton
          aria-label="Edit"
          icon={<BiUndo fontSize={"24px"} />}
          colorScheme="whiteAlpha"
          variant="ghost"
          color="white"
          rounded="full"
          onClick={(e) => editText(e, inputText)}
        />
        <Text fontWeight="700" fontSize="sm">Edit</Text>
      </Box>

      {!isHighlight_Done && (
        <Box onClick={highlight}>
          <IconButton
            aria-label="Highlight"
            icon={<BiPencil fontSize={"24px"} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
            rounded="full"
            onClick={highlight}
          />
          <Text fontWeight="700" fontSize="sm">Highlight</Text>
        </Box>
      )}
      {!isHighlight_Done && (
        <Box onClick={handleAutoBlank}>
          <IconButton
            aria-label="Auto-blank"
            icon={<BiShuffle fontSize={"24px"} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
            rounded="full"
            onClick={handleAutoBlank}
          />
          <Text fontWeight="700" fontSize="sm">Auto-blank 🎲</Text>
        </Box>
      )}
      {isHighlight_Done && (
        <Box onClick={handleDone}>
          <IconButton
            aria-label="Done"
            icon={<BiCheck fontSize={"26px"} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
            rounded="full"
            onClick={handleDone}
          />
          <Text fontWeight="700" fontSize="sm">Done</Text>
        </Box>
      )}
    </HStack>
  );
};

export default ShowButtons;
