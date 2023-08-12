import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineCreate } from 'react-icons/md';
// import Highlight from './Highlight';
import {
  
    Link
  } from "react-router-dom";
import Navbar from './Navbar';
function Quiz() {
    return (
        <>
        <Navbar/>
        <Center minH={'100vh'}>
            <Flex h={'sm'} w={'sm'} bg={'gray.100'} flexDir={'column'} justifyContent={'space-around'} alignItems={'center'} rounded={'xl'}>
                <Box textAlign={'center'}>
                    <Heading>Take the Quiz</Heading>
                    <Text mt={10} fontSize={'xl'}>Challenge yourself and take the quiz.</Text>
                    <Text mt={10} fontSize={'xl'}>We will be rooting for you!</Text>
                </Box>
                <Box>
                    <Button
                        rounded={'full'}
                        size={'lg'}
                        mt={'auto'}
                        px={6}
                        bg={'cyan.400'}
                        _hover={{ bg: 'cyan.500' }}
                        _focus={{ border: 'none' }}
                    >
                        <MdOutlineCreate fontSize={'24px'} />
                        <Link to="/">Quiz</Link>
                    </Button>
                </Box>
            </Flex>
        </Center>
        </>
    )
}

export default Quiz