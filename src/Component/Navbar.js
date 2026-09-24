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
import { AnimatePresence, motion } from "framer-motion";
import { BiSun, BiMoon } from "react-icons/bi";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

function Navbar({ color = "white" }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue(color, "gray.700");
  const headingColor = useColorModeValue("black", "white");

  return (
    <Center>
      <MotionBox
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        bg={bg}
        m={10}
        w={"70rem"}
        borderRadius={"25px"}
        py="2"
      >
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
            <Box position="relative" width="32px" height="32px">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={colorMode}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <IconButton
                    aria-label={"Toggle color mode"}
                    icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
                    onClick={toggleColorMode}
                    size={"sm"}
                    variant={"ghost"}
                    color={headingColor}
                  />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Flex>
        </Flex>
      </MotionBox>
    </Center>
  );
}

export default Navbar;
