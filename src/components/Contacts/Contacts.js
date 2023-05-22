import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {Header} from "./Heades";
import {SearchPanel} from "./SearchPanel";
import {ContactsList} from "./ContactsList";

export const Contacts = () => {
    return (
        <Flex direction='column' w="30%" bg='white'>
            <Box>
                <Header />
                <SearchPanel />
            </Box>
            <ContactsList flex='1' overflow='auto' />
        </Flex>
    );
};
