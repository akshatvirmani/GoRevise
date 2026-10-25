import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { getOverallStats } from "../utils/quizStorage";
import { getBadges } from "../utils/badges";

const MotionBox = motion(Box);

function StatTile({ emoji, value, label, accent }) {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");

  return (
    <Box
      bg={cardBg}
      border="4px solid"
      borderColor={cardBorder}
      borderTopWidth="8px"
      borderTopColor={`${accent}.400`}
      rounded="20px"
      boxShadow={`6px 6px 0 0 ${shadowColor}`}
      p={5}
      textAlign="center"
    >
      <Text fontSize="4xl">{emoji}</Text>
      <Heading size="xl" mt={1}>
        {value}
      </Heading>
      <Text fontWeight="700" color={useColorModeValue("ink.600", "ink.100")}>
        {label}
      </Text>
    </Box>
  );
}

function BadgeTile({ badge, index }) {
  const cardBg = useColorModeValue("white", "ink.600");
  const cardBorder = useColorModeValue("ink.700", "sunny.400");
  const shadowColor = useColorModeValue("#2B2250", "#00000055");

  return (
    <Tooltip label={badge.description} hasArrow placement="top">
      <MotionBox
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 18 }}
        bg={cardBg}
        border="4px solid"
        borderColor={cardBorder}
        rounded="20px"
        boxShadow={`5px 5px 0 0 ${shadowColor}`}
        p={4}
        textAlign="center"
        opacity={badge.unlocked ? 1 : 0.4}
        filter={badge.unlocked ? "none" : "grayscale(1)"}
        cursor="default"
      >
        <Text fontSize="3xl">{badge.unlocked ? badge.emoji : "🔒"}</Text>
        <Text fontWeight="800" fontSize="sm" mt={1}>
          {badge.label}
        </Text>
      </MotionBox>
    </Tooltip>
  );
}

export default function Progress() {
  const stats = getOverallStats();
  const badges = getBadges(stats);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <>
      <Navbar />
      <Container maxW={"5xl"} minH={"100vh"} pb={16}>
        <Box textAlign="center" mb={8}>
          <Text fontSize="5xl">📊</Text>
          <Heading mt={1}>My Progress</Heading>
          <Text fontSize="lg" mt={1}>
            Keep quizzing to unlock more badges!
          </Text>
        </Box>

        {stats.totalQuizzes === 0 ? (
          <Box textAlign="center" fontSize="lg" fontWeight="700" py={10}>
            You haven't made any quizzes yet — go create one and come back! 🚀
          </Box>
        ) : (
          <>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5} mb={10}>
              <StatTile emoji="📝" value={stats.totalQuizzes} label="Quizzes Made" accent="brand" />
              <StatTile emoji="🎮" value={stats.totalAttempts} label="Attempts" accent="sky" />
              <StatTile emoji="🏅" value={`${stats.bestScorePct}%`} label="Best Score" accent="sunny" />
              <StatTile emoji="📈" value={`${stats.averageScorePct}%`} label="Average Score" accent="grape" />
            </SimpleGrid>

            <Heading size="md" mb={4}>
              🎖️ Badges ({unlockedCount}/{badges.length})
            </Heading>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={4}>
              {badges.map((badge, i) => (
                <BadgeTile key={badge.id} badge={badge} index={i} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
    </>
  );
}
