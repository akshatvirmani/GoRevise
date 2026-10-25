import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getSavedQuizzes, deleteQuiz, getQuizStats } from "../utils/quizStorage";
import { buildShareUrl } from "../utils/shareQuiz";

const MotionBox = motion(Box);

function SavedQuizzes() {
  const navigate = useNavigate();
  const toast = useToast();
  const rowBg = useColorModeValue("white", "ink.600");
  const rowBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");
  const [quizzes, setQuizzes] = useState(getSavedQuizzes());

  if (quizzes.length === 0) return null;

  const handleDelete = (id) => {
    deleteQuiz(id);
    setQuizzes(getSavedQuizzes());
  };

  const handleShare = async (quiz) => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(quiz));
      toast({ title: "Share link copied! 🔗", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Couldn't copy link", status: "error", duration: 2000 });
    }
  };

  const preview = (text) =>
    text.length > 60 ? `${text.slice(0, 60)}...` : text;

  const accents = ["brand", "sky", "grape", "sunny"];

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Heading size={"lg"} mb={5}>
        🗂️ My Quizzes
      </Heading>
      <VStack align={"stretch"} spacing={5}>
        {quizzes.map((quiz, i) => {
          const stats = getQuizStats(quiz);
          const accent = accents[i % accents.length];
          return (
            <HStack
              key={quiz.id}
              justify={"space-between"}
              p={4}
              pl={5}
              bg={rowBg}
              rounded={"20px"}
              flexWrap={"wrap"}
              border="4px solid"
              borderColor={rowBorder}
              borderLeftWidth="10px"
              borderLeftColor={`${accent}.400`}
              boxShadow={`5px 5px 0 0 ${shadowColor}`}
              transition={"transform 0.15s ease, box-shadow 0.15s ease"}
              _hover={{
                transform: "translate(-2px, -2px)",
                boxShadow: `7px 7px 0 0 ${shadowColor}`,
              }}
            >
              <Box>
                <Text noOfLines={1} fontWeight="700">
                  {preview(quiz.text)}
                </Text>
                {stats ? (
                  <Badge colorScheme={accent} borderRadius="full" px={2} mt={1}>
                    🎯 {stats.attemptCount} attempt{stats.attemptCount > 1 ? "s" : ""} · best {stats.bestScorePct}%
                  </Badge>
                ) : (
                  <Text fontSize={"sm"} color={"gray.500"}>
                    Not attempted yet
                  </Text>
                )}
              </Box>
              <HStack>
                <Button
                  size={"sm"}
                  colorScheme={accent}
                  onClick={() => navigate("/test", { state: { savedQuiz: quiz } })}
                >
                  ▶ Take Quiz
                </Button>
                <Button size={"sm"} variant={"outline"} colorScheme={accent} onClick={() => handleShare(quiz)}>
                  Share
                </Button>
                <Button size={"sm"} variant={"ghost"} onClick={() => handleDelete(quiz.id)}>
                  🗑️
                </Button>
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
}

function FloatingShape({ emoji, top, left, right, size = "48px", duration = 4, delay = 0 }) {
  return (
    <motion.div
      style={{ position: "absolute", top, left, right, fontSize: size, userSelect: "none" }}
      animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {emoji}
    </motion.div>
  );
}

export default function Home() {
  const heroBg = useColorModeValue("white", "ink.600");
  const heroBorder = useColorModeValue("ink.700", "sunny.400");

  return (
    <>
      <Navbar />
      <Container maxW={"7xl"} minH={"100vh"} mt={-4} pb={16}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 16 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 8 }}>
            <Heading
              lineHeight={1.15}
              fontWeight={700}
              fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              color={useColorModeValue("ink.800", "white")}
            >
              Turn your notes into a{" "}
              <Text as={"span"} color={"brand.500"}>
                fun
              </Text>{" "}
              quiz{" "}
              <Text as={"span"} color={"sunny.500"}>
                ✨
              </Text>
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color={useColorModeValue("ink.600", "ink.100")}>
              Paste what you're studying, blank out the tricky words, and
              quiz yourself like a game. No boring flashcards here! 🎉
            </Text>
            <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: "column", sm: "row" }}>
              <Link to="/create">
                <Button rounded={"full"} size={"lg"} px={8} colorScheme="brand">
                  🚀 Get Started
                </Button>
              </Link>
            </Stack>
          </Stack>

          <Flex flex={1} justify={"center"} align={"center"} position={"relative"} w={"full"} minH="300px">
            <MotionBox
              initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              position={"relative"}
              height={"280px"}
              width={"90%"}
              rounded={"28px"}
              bg={heroBg}
              border="5px solid"
              borderColor={heroBorder}
              boxShadow={`10px 10px 0 0 ${useColorModeValue("#2B2250", "#00000055")}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="visible"
            >
              <Text fontSize="7xl">📝</Text>
              <FloatingShape emoji="⭐" top="-10px" left="-14px" size="36px" duration={3.2} />
              <FloatingShape emoji="🎈" top="-26px" right="10%" size="40px" duration={4.5} delay={0.4} />
              <FloatingShape emoji="💡" top="60%" left="-30px" size="34px" duration={3.8} delay={0.8} />
              <FloatingShape emoji="🏆" top="70%" right="-20px" size="38px" duration={4.1} delay={1.2} />
            </MotionBox>
          </Flex>
        </Stack>
        <SavedQuizzes />
      </Container>
    </>
  );
}
