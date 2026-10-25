import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Create() {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");

  return (
    <>
      <Navbar />
      <Center pt="16" pb={16}>
        <Flex
          h={"400px"}
          w={"350px"}
          bg={cardBg}
          flexDir={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={"28px"}
          border="5px solid"
          borderColor={cardBorder}
          boxShadow={`10px 10px 0 0 ${shadowColor}`}
          transition={"transform 0.2s ease, box-shadow 0.2s ease"}
          _hover={{
            transform: "translate(-4px, -4px) rotate(-1deg)",
            boxShadow: `14px 14px 0 0 ${shadowColor}`,
          }}
        >
          <Box textAlign={"center"}>
            <Text fontSize="6xl">🖍️</Text>
            <Heading mt={2}>Create</Heading>
            <Text mt={3} fontSize={"xl"} px={6}>
              Build your very own fill-in quiz!
            </Text>
          </Box>
          <Box mt={-5}>
            <Link to="/test">
              <Button rounded={"full"} size={"lg"} px={8} colorScheme="sunny">
                ✨ Create
              </Button>
            </Link>
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export default Create;
