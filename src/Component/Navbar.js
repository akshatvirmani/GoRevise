import React from "react";
import { Box, Center, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar({ color }) {
  return (
    <Center>
      <Box bg={color} m={10} w={"70rem"} borderRadius={"25px"} py="2">
        <Flex
          justifyContent={"space-around"}
          alignItems={"center"}
          height={"50px"}
        >
          <Link to="/">
            <chakra.a>
              <Heading color={"black"}>
                Go
                <Text as={"span"} color={"teal.300"}>
                  Revise
                </Text>
              </Heading>
            </chakra.a>
          </Link>
          <Flex
            w={"200px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"lg"}
          >
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}

export default Navbar;
