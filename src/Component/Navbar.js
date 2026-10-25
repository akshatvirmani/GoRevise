import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BiSun, BiMoon } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const MotionBox = motion(Box);

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/progress", label: "Progress" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const bg = useColorModeValue("white", "ink.600");
  const border = useColorModeValue("ink.700", "sunny.400");
  const headingColor = useColorModeValue("ink.800", "white");
  const linkInactive = useColorModeValue("ink.600", "ink.100");

  return (
    <Center px={{ base: 2, md: 0 }}>
      <MotionBox
        initial={{ opacity: 0, y: -16, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        bg={bg}
        border="4px solid"
        borderColor={border}
        boxShadow={`6px 6px 0 0 ${useColorModeValue("#2B2250", "#FFD23F")}`}
        m={{ base: 4, md: 10 }}
        w={{ base: "95%", md: "70rem" }}
        borderRadius={"28px"}
        py="2"
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"56px"}
          px={{ base: 3, md: 6 }}
        >
          <Link to="/">
            <chakra.a display="flex" alignItems="center" gap={2}>
              <motion.span
                style={{ fontSize: "28px", display: "inline-block" }}
                animate={{ rotate: [0, -10, 10, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2 }}
              >
                ✏️
              </motion.span>
              <Heading size={{ base: "md", md: "lg" }} color={headingColor}>
                Go
                <Text as={"span"} color={"brand.500"}>
                  Revise
                </Text>
              </Heading>
            </chakra.a>
          </Link>

          <Flex alignItems={"center"} gap={{ base: 1, md: 3 }}>
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <chakra.a
                  as={Link}
                  key={link.to}
                  to={link.to}
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize={{ base: "sm", md: "md" }}
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg={active ? "sunny.300" : "transparent"}
                  color={active ? "ink.800" : linkInactive}
                  _hover={{ bg: "sunny.200", color: "ink.800" }}
                  transition="all 0.15s ease"
                >
                  {link.label}
                </chakra.a>
              );
            })}
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
                    borderRadius="full"
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
