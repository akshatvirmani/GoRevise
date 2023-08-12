import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { BiCheck, BiShare, BiSpreadsheet } from "react-icons/bi";
import { Link } from "react-router-dom";

function ResultButtons({
  handleViewScore_and_done,
  viewScore,
  handleSubmit,
  viewDone,
}) {
  return (
    <HStack
      my={5}
      bg="black"
      color="white"
      px={"8"}
      justifyContent={"right"}
      alignItems={"center"}
      roundedTop={"2xl"}
      py={1}
      textAlign="center"
      cursor="pointer"
    >
      {viewScore && (
        <Box mx={5} onClick={handleSubmit}>
          <Button
            color={"cyan"}
            backgroundColor={"black"}
            _hover={"black"}
            _focus={{ border: "none" }}
            variant={"unstyled"}
          >
            <BiSpreadsheet fontSize={"30px"} color={"cyan"} />
          </Button>
          <Text className="textshift">view score</Text>
        </Box>
      )}
      {/* {viewScore && (
        <Box mx={5}>
          <Button
            color={"cyan"}
            backgroundColor={"black"}
            _hover={"black"}
            _focus={{ border: "none" }}
            variant={"unstyled"}
          >
            <BiShare fontSize={"30px"} color={"cyan"} />
          </Button>
          <Text className="textshift">Go back</Text>
        </Box>
      )} */}
      {viewScore && (
        <Link to="/">
          <Box mx={5} onClick={(e) => handleViewScore_and_done()}>
            <Button
              color={"cyan"}
              backgroundColor={"black"}
              _hover={"black"}
              _focus={{ border: "none" }}
              variant={"unstyled"}
            >
              <BiCheck fontSize={"30px"} color={"cyan"} />
            </Button>
            <Text className="textshift">Done</Text>
          </Box>
        </Link>
      )}
      {viewDone && (
        <Box mx={5} onClick={(e) => handleViewScore_and_done()}>
          <Button
            color={"cyan"}
            backgroundColor={"black"}
            _hover={"black"}
            _focus={{ border: "none" }}
            variant={"unstyled"}
          >
            <BiCheck fontSize={"30px"} color={"cyan"} />
          </Button>
          <Text className="textshift">Done </Text>
        </Box>
      )}
    </HStack>
  );
}

export default ResultButtons;
