import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineCreate, MdReply, MdEdit, MdShare } from "react-icons/md";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { buildShareUrl } from "../utils/shareQuiz";

const SaveAndTakeQuiz = ({ handleSave, handleEditBlanks, shareableQuiz }) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();

  const handleCopyShareLink = async () => {
    const url = buildShareUrl(shareableQuiz);
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Share link copied!", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Couldn't copy link", status: "error", duration: 2000 });
    }
  };

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
        <Flex
          h={"420px"}
          w={"350px"}
          bg={cardBg}
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
          <Box mt={-5} display={"flex"} flexDir={"column"} gap={3} alignItems={"center"}>
            <Button
              rounded={"full"}
              size={"lg"}
              px={6}
              bg={"cyan.400"}
              _hover={{ bg: "cyan.500" }}
              _focus={{ border: "none" }}
              onClick={() => handleSave(false)}
            >
              <MdOutlineCreate fontSize={"24px"} />
              <Text>Quiz</Text>
            </Button>
            <Button
              rounded={"full"}
              size={"sm"}
              px={6}
              variant={"outline"}
              onClick={handleEditBlanks}
            >
              <MdEdit fontSize={"18px"} />
              <Text ml={1}>Edit Blanks</Text>
            </Button>
            <Button
              rounded={"full"}
              size={"sm"}
              px={6}
              variant={"outline"}
              onClick={handleCopyShareLink}
            >
              <MdShare fontSize={"18px"} />
              <Text ml={1}>Copy Share Link</Text>
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
};
export default SaveAndTakeQuiz;
