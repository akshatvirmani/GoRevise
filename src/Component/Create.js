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
import { MdOutlineCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
function Create() {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Navbar color="gray.200" />
      <Center pt="24" mt={"-60px"}>
        <Flex
          h={"380px"}
          w={"350px"}
          bg={cardBg}
          flexDir={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={"3xl"}
        >
          <Box textAlign={"center"}>
            <Heading>Create</Heading>
            <Text mt={7} fontSize={"xl"}>
              Create a fill-in quiz from scratch.
            </Text>
          </Box>
          <Box mt={-5}>
            <Link to="/test">
              <Button
                rounded={"full"}
                size={"lg"}
                mt={"auto"}
                px={6}
                bg={"cyan.400"}
                _hover={{ bg: "cyan.500" }}
                _focus={{ border: "none" }}
              >
                <MdOutlineCreate fontSize={"24px"} />Create
              </Button>
            </Link>
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export default Create;
