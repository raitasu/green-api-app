import {Avatar, Box, chakra, Flex, HStack, Text} from "@chakra-ui/react";
import {DeliveredIcon} from "../../common/images/icons";
import {useContext} from "react";
import {ChatContext} from "../ChatContext";

export const Contact = ({name, message, date, seen, src, ...rest}) => {

    const { setSelectedMessage } = useContext(ChatContext);

    const handleContactClick = (contactId) => {
        setSelectedMessage(contactId);
    };

    return (
        <HStack
            onClick={() => handleContactClick(message) }
            _hover={{
                cursor: 'pointer',
                backgroundColor: '#f5f6f6',
            }}
            py='3'
            {...rest}
        >
            <Avatar mx='3' name={name} src={src}/>
            <Box flex='1' pr='4'>
                <Flex justify='space-between' align='baseline'>
                    <Box>
                        <Text fontWeight='medium'>{name}</Text>
                        <HStack>
                            <DeliveredIcon color={seen ? '#53bdeb' : '#667781'}/>
                            <Text color='#667781' fontSize='sm'>
                                {message.replace('@c.us', '')}
                            </Text>
                        </HStack>
                    </Box>
                    <chakra.time fontSize='xs' color='#667781'>
                        {date}
                    </chakra.time>
                </Flex>
            </Box>
        </HStack>
    );
}