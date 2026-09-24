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
  Circle,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

const MotionCircle = motion(Circle);

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

  // Count the score up from 0 whenever the modal opens, instead of just snapping to the final number.
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
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent size="4xl" position="relative" overflow="hidden">
          {isOpen && percentage >= 50 && <Confetti key={String(isOpen)} />}
          <ModalHeader
            my={"4"}
            textAlign="center"
            fontSize="3xl"
            fontWeight="bold"
          >
            Your final percentage is
            <Text fontSize="2xl" fontWeight="bold">
              🥁 (Drumroll) 🥁
            </Text>
          </ModalHeader>
          <Box>
            <Center>
              <MotionCircle
                key={String(isOpen)}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                size="110px"
                bg="#f0f0f0"
                color="back"
                fontSize="3xl"
                fontWeight="bold"
                mt={"-25px"}
              >
                <Text>{displayPercentage}%</Text>
              </MotionCircle>
            </Center>
          </Box>

          <Box mt={"10"} fontSize="lg" fontWeight="600">
            <Center mt={"-34px"}>
              {percentage >= 50
                ? "Go..little..Rockstar 🎸"
                : "You must be in Spain without the 'S' 😩"}
            </Center>
          </Box>
          <ModalCloseButton />
          <ModalBody mt={"-20px"}>
            <Box>
              <HStack mt={"15px"} ml={"30px"}>
                <Flex direction={"column"}>
                  <Text>Fill in the blanks: {count_blank}</Text>
                  <Text>Correct answers: {ca}</Text>
                  <Text>
                    Wrong answers:&nbsp;
                    <Text display={"inline"} ml={"-1px"}>
                      {" "}
                      {count_blank - ca}
                    </Text>
                  </Text>
                </Flex>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#14dbd1"
              mr={"auto"}
              ml="auto"
              mt={"-10px"}
              mb={"8px"}
              w={"230px"}
              fontSize="23px"
              fontWeight="extrabold"
              letterSpacing={"0.5px"}
              onClick={onClose}
              borderRadius="60px"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            >
              View Answers
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReturnFocus;
