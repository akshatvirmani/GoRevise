import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  IconButton,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getSavedQuizzes, deleteQuiz, getQuizStats } from "../utils/quizStorage";
import { buildShareUrl } from "../utils/shareQuiz";

function SavedQuizzes() {
  const navigate = useNavigate();
  const toast = useToast();
  const rowBg = useColorModeValue("gray.100", "gray.700");
  const [quizzes, setQuizzes] = useState(getSavedQuizzes());

  if (quizzes.length === 0) return null;

  const handleDelete = (id) => {
    deleteQuiz(id);
    setQuizzes(getSavedQuizzes());
  };

  const handleShare = async (quiz) => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(quiz));
      toast({ title: "Share link copied!", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Couldn't copy link", status: "error", duration: 2000 });
    }
  };

  const preview = (text) =>
    text.length > 60 ? `${text.slice(0, 60)}...` : text;

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Heading size={"lg"} mb={4}>
        My Quizzes
      </Heading>
      <VStack align={"stretch"} spacing={3}>
        {quizzes.map((quiz) => {
          const stats = getQuizStats(quiz);
          return (
            <HStack
              key={quiz.id}
              justify={"space-between"}
              p={4}
              bg={rowBg}
              rounded={"xl"}
              flexWrap={"wrap"}
            >
              <Box>
                <Text noOfLines={1}>{preview(quiz.text)}</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  {stats
                    ? `${stats.attemptCount} attempt${stats.attemptCount > 1 ? "s" : ""} · best ${stats.bestScorePct}%`
                    : "Not attempted yet"}
                </Text>
              </Box>
              <HStack>
                <Button
                  size={"sm"}
                  colorScheme={"cyan"}
                  onClick={() => navigate("/test", { state: { savedQuiz: quiz } })}
                >
                  Take Quiz
                </Button>
                <Button size={"sm"} variant={"outline"} onClick={() => handleShare(quiz)}>
                  Share
                </Button>
                <Button size={"sm"} variant={"ghost"} onClick={() => handleDelete(quiz.id)}>
                  Delete
                </Button>
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Navbar color="gray.100" />
      <Container maxW={"7xl"} minH={"100vh"} mt={-10}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text as={"span"} position={"relative"}>
                A simple tool to help
              </Text>
              <br />
              <Text as={"span"}>you revise ✍️</Text>
            </Heading>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Link to="/create">
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  bg={"cyan.400"}
                  _hover={{ bg: "cyan.500" }}
                  _focus={{ border: "none" }}
                >
                  Get Started
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <IconButton
                aria-label={"Play Button"}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                size={"lg"}
                color={"white"}
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                transform={"translateX(-50%) translateY(-50%)"}
              />
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://videoigniter.com/wp-content/uploads/2022/11/Unlimited-Revisions.svg"
                }
              />
            </Box>
          </Flex>
        </Stack>
        <SavedQuizzes />
      </Container>
    </>
  );
}
