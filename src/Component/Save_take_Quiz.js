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
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { buildShareUrl } from "../utils/shareQuiz";

const SaveAndTakeQuiz = ({ handleSave, handleEditBlanks, shareableQuiz }) => {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");
  const toast = useToast();

  const handleCopyShareLink = async () => {
    const url = buildShareUrl(shareableQuiz);
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Share link copied! 🔗", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Couldn't copy link", status: "error", duration: 2000 });
    }
  };

  return (
    <>
      <Navbar />
      <Center>
        <Link to="/create">
          <Button rounded={"full"} size={"md"} mt={4} px={6} colorScheme="sky">
            ↩ Go Back
          </Button>
        </Link>
      </Center>
      <Center pt="10" pb={16}>
        <Flex
          h={"460px"}
          w={"360px"}
          bg={cardBg}
          flexDir={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={"28px"}
          border="5px solid"
          borderColor={cardBorder}
          boxShadow={`10px 10px 0 0 ${shadowColor}`}
        >
          <Box textAlign={"center"}>
            <Text fontSize="6xl">🎉</Text>
            <Heading mt={2}>Ready, Set, Quiz!</Heading>
            <Text mt={3} fontSize={"lg"} px={6}>
              Challenge yourself and see how many you get right!
            </Text>
          </Box>
          <Box mt={-5} display={"flex"} flexDir={"column"} gap={3} alignItems={"center"}>
            <Button rounded={"full"} size={"lg"} px={8} colorScheme="brand" onClick={() => handleSave(false)}>
              🚀 Start Quiz
            </Button>
            <Button rounded={"full"} size={"sm"} px={6} variant={"outline"} colorScheme="grape" onClick={handleEditBlanks}>
              ✏️ Edit Blanks
            </Button>
            <Button rounded={"full"} size={"sm"} px={6} variant={"outline"} colorScheme="sky" onClick={handleCopyShareLink}>
              🔗 Copy Share Link
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
};
export default SaveAndTakeQuiz;
