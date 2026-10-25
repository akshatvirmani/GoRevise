import React from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { BiCheck, BiSpreadsheet } from "react-icons/bi";
import { Link } from "react-router-dom";

function ResultButtons({
  handleViewScore_and_done,
  viewScore,
  onOpenScore,
  viewDone,
}) {
  return (
    <HStack
      bg="grape.600"
      color="white"
      px={{ base: 4, md: 8 }}
      justifyContent={"flex-end"}
      alignItems={"center"}
      roundedTop={"24px"}
      py={3}
      spacing={6}
      textAlign="center"
      cursor="pointer"
    >
      {viewScore && (
        <Box onClick={onOpenScore}>
          <IconButton
            aria-label="View score"
            icon={<BiSpreadsheet fontSize={"24px"} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
            rounded="full"
            onClick={onOpenScore}
          />
          <Text fontWeight="700" fontSize="sm">Score 🏆</Text>
        </Box>
      )}
      {viewScore && (
        <Link to="/">
          <Box>
            <IconButton
              aria-label="Done"
              icon={<BiCheck fontSize={"26px"} />}
              colorScheme="whiteAlpha"
              variant="ghost"
              color="white"
              rounded="full"
            />
            <Text fontWeight="700" fontSize="sm">Done</Text>
          </Box>
        </Link>
      )}
      {viewDone && (
        <Box onClick={(e) => handleViewScore_and_done()}>
          <IconButton
            aria-label="Done"
            icon={<BiCheck fontSize={"26px"} />}
            colorScheme="whiteAlpha"
            variant="ghost"
            color="white"
            rounded="full"
            onClick={(e) => handleViewScore_and_done()}
          />
          <Text fontWeight="700" fontSize="sm">Done</Text>
        </Box>
      )}
    </HStack>
  );
}

export default ResultButtons;
