import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {WhatsAppIcon} from "../common/images/whatsAppIcon";

export const NotFound = () => {
    return (
        <Box
            height="100vh"
            backgroundImage="linear-gradient(to bottom, #00a884 20%, #eae6df 20%)"
        >
            <Box position='absolute' margin='60px 0 0 560px'>
                <Flex alignItems='center'>
                    <WhatsAppIcon/>
                    <Text color='white' marginLeft='12px'>Green API WhatsApp</Text>
                </Flex>
            </Box>
            <Flex
                height="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize="50px" color="white">
                    Page is not found
                </Text>
            </Flex>


        </Box>
    )

}