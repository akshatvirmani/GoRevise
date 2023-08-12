import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCreate } from "react-icons/md";
import { MdReply } from "react-icons/md";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const SaveAndTakeQuiz = ({ handleSave }) => {
  return (
    <>
      <Navbar color="gray.200" />
      <Center>
      <Link to='/create'>
        <Button
          rounded={"full"}
          size={"lg"}
          mt={20}
          px={6}
          bg={"cyan.400"}
          _hover={{ bg: "cyan.500" }}
          _focus={{ border: "none" }}

        >
          <MdReply fontSize={"28px"} />
          <Text>Go Back</Text>
        </Button>
        </Link>
      </Center>
      <Center pt="24" mt={"-60px"}>
        {/* <Flex
          h={"380px"}
          w={"350px"}
          bg={"gray.100"}
          flexDir={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={"3xl"}
        >
          <Box textAlign={"center"}>
            <Heading>SaveAndTakeQuiz</Heading>
            <Text mt={7} fontSize={"xl"}>
              SaveAndTakeQuiz your fill-in quiz test as a pdf document
            </Text>
          </Box>
          <Box mt={-5}>
            <Button
              rounded={"full"}
              size={"lg"}
              mt={"auto"}
              px={6}
              bg={"cyan.400"}
              _hover={{ bg: "cyan.500" }}
              _focus={{ border: "none" }}
            >
              <MdOutlineCreate fontSize={"24px"} />
              <Text>SaveAndTakeQuiz</Text>
            </Button>
          </Box>
        </Flex> */}
        <Flex
          h={"380px"}
          w={"350px"}
          bg={"gray.100"}
          flexDir={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={"3xl"}
          marginLeft="20px"
        >
          <Box textAlign={"center"}>
            <Heading>Take the Quiz</Heading>
            <Text mt={7} fontSize={"xl"}>
              Challenge yourself and take the quiz
            </Text>
            <Text mt={7} fontSize={"xl"}>
              We will be rooting for you.
            </Text>
          </Box>
          <Box mt={-5}>
            <Button
              rounded={"full"}
              size={"lg"}
              mt={"auto"}
              px={6}
              bg={"cyan.400"}
              _hover={{ bg: "cyan.500" }}
              _focus={{ border: "none" }}
              onClick={() => handleSave(false)}
            >
              <MdOutlineCreate fontSize={"24px"} />
              <Text>Quiz</Text>
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
};
export default SaveAndTakeQuiz;
