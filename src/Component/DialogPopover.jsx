import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
  Box,
  HStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

const MotionBox = motion(Box);

const messageFor = (pct) => {
  if (pct === 100) return "Perfect score! You're a superstar! 🌟";
  if (pct >= 75) return "Awesome job! You really know your stuff! 🎉";
  if (pct >= 50) return "Nice work! Keep it up, champ! 🎸";
  return "Good try! Practice makes perfect 💪";
};

const ReturnFocus = ({
  isOpen,
  onClose,
  finalRef,
  correct_ans_count,
  count_blank,
}) => {
  const ca = correct_ans_count();
  const percentage = Math.round((ca / count_blank) * 100);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const ringTrack = useColorModeValue("#F2F1FA", "#412A7D");
  const modalBg = useColorModeValue("white", "ink.600");
  const modalBorder = useColorModeValue("ink.700", "sunny.400");

  useEffect(() => {
    if (!isOpen) {
      setDisplayPercentage(0);
      return;
    }
    let frame;
    const start = performance.now();
    const duration = 700;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayPercentage(Math.round(progress * percentage));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, percentage]);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          size="4xl"
          position="relative"
          overflow="hidden"
          bg={modalBg}
          borderRadius="28px"
          border="5px solid"
          borderColor={modalBorder}
        >
          {isOpen && percentage >= 50 && <Confetti key={String(isOpen)} />}
          <ModalHeader
            my={"2"}
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            🥁 Drumroll please... 🥁
          </ModalHeader>
          <Box>
            <Center>
              <MotionBox
                key={String(isOpen)}
                initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                width="140px"
                height="140px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  background: `conic-gradient(#FF6B6B ${displayPercentage}%, ${ringTrack} 0)`,
                }}
              >
                <Center
                  bg={modalBg}
                  width="112px"
                  height="112px"
                  borderRadius="full"
                  fontSize="2xl"
                  fontWeight="800"
                  border="3px solid"
                  borderColor={modalBorder}
                >
                  {displayPercentage}%
                </Center>
              </MotionBox>
            </Center>
          </Box>

          <Box mt={"5"} fontSize="lg" fontWeight="700" textAlign="center" px={4}>
            {messageFor(percentage)}
          </Box>
          <ModalCloseButton borderRadius="full" />
          <ModalBody mt={"2"}>
            <Center>
              <HStack spacing={6}>
                <Flex direction={"column"} align="center">
                  <Text fontSize="2xl">📝</Text>
                  <Text fontWeight="700">{count_blank}</Text>
                  <Text fontSize="sm">blanks</Text>
                </Flex>
                <Flex direction={"column"} align="center">
                  <Text fontSize="2xl">✅</Text>
                  <Text fontWeight="700">{ca}</Text>
                  <Text fontSize="sm">correct</Text>
                </Flex>
                <Flex direction={"column"} align="center">
                  <Text fontSize="2xl">❌</Text>
                  <Text fontWeight="700">{count_blank - ca}</Text>
                  <Text fontSize="sm">wrong</Text>
                </Flex>
              </HStack>
            </Center>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="sunny" rounded="full" size="lg" px={10} onClick={onClose}>
              👀 View Answers
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReturnFocus;
