import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "./Navbar";

const STEPS = [
  {
    emoji: "📋",
    title: "1. Paste your notes",
    text: "Copy in anything you're studying - a paragraph, a summary, your class notes.",
    accent: "brand",
  },
  {
    emoji: "🖍️",
    title: "2. Pick the tricky words",
    text: "Highlight the words you want to be quizzed on, or hit Auto-blank to let us pick for you.",
    accent: "sunny",
  },
  {
    emoji: "🎮",
    title: "3. Take the quiz",
    text: "Fill in the blanks from memory. Press Enter to jump to the next blank!",
    accent: "sky",
  },
  {
    emoji: "🏆",
    title: "4. See your score",
    text: "Get an instant score with confetti for a great result, then review what you got right or wrong.",
    accent: "grape",
  },
];

function StepCard({ emoji, title, text, accent }) {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");

  return (
    <Box
      bg={cardBg}
      border="4px solid"
      borderColor={cardBorder}
      borderLeftWidth="10px"
      borderLeftColor={`${accent}.400`}
      rounded="20px"
      boxShadow={`6px 6px 0 0 ${shadowColor}`}
      p={5}
    >
      <Text fontSize="3xl">{emoji}</Text>
      <Heading size="md" mt={1}>
        {title}
      </Heading>
      <Text mt={2}>{text}</Text>
    </Box>
  );
}

export default function About() {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");

  return (
    <>
      <Navbar />
      <Container maxW={"5xl"} minH={"100vh"} pb={16}>
        <Box textAlign="center" mb={10}>
          <Text fontSize="5xl">🧐</Text>
          <Heading mt={1}>How GoRevise Works</Heading>
          <Text fontSize="lg" mt={2}>
            Turn anything you're studying into a fun fill-in-the-blank quiz!
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
          {STEPS.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </SimpleGrid>

        <Box
          bg={cardBg}
          border="4px solid"
          borderColor={cardBorder}
          rounded="20px"
          boxShadow={`6px 6px 0 0 ${shadowColor}`}
          p={6}
          textAlign="center"
        >
          <Text fontSize="2xl">💡</Text>
          <Heading size="sm" mt={1}>
            Good to know
          </Heading>
          <Text mt={2}>
            Your quizzes are saved right on this device, so you can come back
            and retake them anytime from "My Quizzes" on the home page. Use
            the share link to send a quiz to a friend!
          </Text>
        </Box>
      </Container>
    </>
  );
}
