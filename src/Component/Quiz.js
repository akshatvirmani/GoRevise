import { Box, Button, Center, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
import Navbar from './Navbar';

function Quiz() {
    const cardBg = useColorModeValue("white", "ink.600");
    const cardBorder = useColorModeValue("ink.700", "sunny.400");
    const shadowColor = useColorModeValue("#2B2250", "#00000055");

    return (
        <>
        <Navbar/>
        <Center minH={'100vh'}>
            <Flex
                h={'sm'}
                w={'sm'}
                bg={cardBg}
                flexDir={'column'}
                justifyContent={'space-around'}
                alignItems={'center'}
                rounded={'28px'}
                border="5px solid"
                borderColor={cardBorder}
                boxShadow={`10px 10px 0 0 ${shadowColor}`}
            >
                <Box textAlign={'center'}>
                    <Text fontSize="6xl">🎮</Text>
                    <Heading>Take the Quiz</Heading>
                    <Text mt={4} fontSize={'xl'}>Challenge yourself and take the quiz.</Text>
                </Box>
                <Box>
                    <Link to="/">
                        <Button rounded={'full'} size={'lg'} px={8} colorScheme="brand">
                            🏠 Home
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Center>
        </>
    )
}

export default Quiz
