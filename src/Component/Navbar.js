import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  chakra,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiSun, BiMoon } from "react-icons/bi";
import { Link } from "react-router-dom";

function Navbar({ color = "white" }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue(color, "gray.700");
  const headingColor = useColorModeValue("black", "white");

  return (
    <Center>
      <Box bg={bg} m={10} w={"70rem"} borderRadius={"25px"} py="2">
        <Flex
          justifyContent={"space-around"}
          alignItems={"center"}
          height={"50px"}
        >
          <Link to="/">
            <chakra.a>
              <Heading color={headingColor}>
                Go
                <Text as={"span"} color={"teal.300"}>
                  Revise
                </Text>
              </Heading>
            </chakra.a>
          </Link>
          <Flex
            w={"240px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"lg"}
            color={headingColor}
          >
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <IconButton
              aria-label={"Toggle color mode"}
              icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
              onClick={toggleColorMode}
              size={"sm"}
              variant={"ghost"}
              color={headingColor}
            />
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}

export default Navbar;
