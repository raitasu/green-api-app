import { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react';
import { deleteNotification, receiveNotification, sendMessage } from './api/api';

export const Test = ({ contactId }) => {
    const [chats, setChats] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [checkNotification, setCheckNotification] = useState(false);

    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem('chats'));
        if (savedChats && savedChats.length > 0) {
            setChats(savedChats);
        }
    }, []);

    const handleSendMessage = useCallback(() => {
        if (contactId) {
            const IdInstance = localStorage.getItem('IdInstance');
            const ApiTokenInstance = localStorage.getItem('ApiTokenInstance');
            console.log(IdInstance, ApiTokenInstance);
            sendMessage({
                idInstance: IdInstance,
                apiTokenInstance: ApiTokenInstance,
                chatId: contactId,
                message: messageInput,
            }).then((res) => {
                if (res) {
                    const newMessage = {
                        sender: 'me',
                        message: messageInput,
                        timestamp: Date.now(),
                    };
                    setMessageInput('');
                    setChats((prev) => {
                        const prevChats = [...prev];
                        const chatIndex = prevChats.findIndex((chat) => chat.recipient === contactId);
                        if (chatIndex > -1) {
                            prevChats[chatIndex].messages.push(newMessage);
                        } else {
                            const newChat = {
                                recipient: contactId,
                                messages: [newMessage],
                            };
                            prevChats.push(newChat);
                        }
                        localStorage.setItem('chats', JSON.stringify(prevChats));
                        return prevChats;
                    });
                } else {
                    console.error('Error');
                }
            });
        }
    }, [contactId, messageInput]);

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    useEffect(() => {
        const handleDeleteNotification = async (receiptId) => {
            const IdInstance = localStorage.getItem('IdInstance');
            const ApiTokenInstance = localStorage.getItem('ApiTokenInstance');
            const res = await deleteNotification({
                idInstance: IdInstance,
                apiTokenInstance: ApiTokenInstance,
                receiptId: receiptId,
            });

            if (res) {
                console.log(res.result ? 'Уведомление успешно удалено' : 'Ошибка удаления уведомления');
            }
        };

        const asyncReceiveNotification = async () => {
            const IdInstance = localStorage.getItem('IdInstance');
            const ApiTokenInstance = localStorage.getItem('ApiTokenInstance');
            const res = await receiveNotification({ idInstance: IdInstance, apiTokenInstance: ApiTokenInstance });

            if (res) {
                if (res.body.typeWebhook === 'incomingMessageReceived' && res.body.messageData.typeMessage === 'textMessage') {
                    const newMessage = {
                        sender: '',
                        message: '',
                        timestamp: 0,
                    };
                    newMessage.sender = res.body.senderData.chatId.split('@')[0];
                    newMessage.message = res.body.messageData.textMessageData.textMessage;
                    newMessage.timestamp = res.body.timestamp * 1000;
                    setChats((prev) => {
                        const prevChats = [...prev];
                        const chatIndex = prevChats.findIndex((chat) => chat.recipient === newMessage.sender);
                        if (chatIndex > -1) {
                            prevChats[chatIndex].messages.push(newMessage);
                        } else {
                            const newChat = {
                                recipient: newMessage.sender,
                                messages: [newMessage],
                            };
                            prevChats.push(newChat);
                        }
                        localStorage.setItem('chats', JSON.stringify(prevChats));
                        return prevChats;
                    });

                    await handleDeleteNotification(res.receiptId);
                } else {
                    await handleDeleteNotification(res.receiptId);
                }
            }
            setCheckNotification((prev) => !prev);
        };

        asyncReceiveNotification();
    }, [checkNotification]);

    return (
        <Flex width="100%">
            <Box
                backgroundColor="#f0f2f5"
                borderLeft="10px solid $border-color"
                flexGrow={1}
                boxSizing="border-box"
                display={{ base: 'none', md: 'flex' }}
                flexDirection="column"
                overflowY="hidden"
                height="100%"
            >
                <Flex padding="10px">{contactId}</Flex>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    padding="10px"
                    maxHeight="800px"
                    gap={'40px'}
                    overflowY="auto"
                >
                    {chats.map((chat, index) => (
                        <Flex key={index} width="100%" direction="column">
                            {chat.messages.map((message, messageIndex) => (
                                <Flex
                                    key={messageIndex}
                                    justifyContent={message.sender === 'me' ? 'flex-end' : 'flex-start'}
                                >
                                    <Box
                                        backgroundColor={message.sender === 'me' ? '#4ada80' : 'gray'}
                                        color="#fff"
                                        padding="5px"
                                        borderRadius="5px"
                                        maxWidth="400px"
                                        wordBreak="break-word"
                                    >
                                        <Box>
                                            <Text pr="10px">{message.message}</Text>
                                            <Text color="green" fontSize="12px" alignSelf="flex-end">
                                                {`${new Date(message.timestamp).getHours()}:${
                                                    new Date(message.timestamp).getMinutes() < 10
                                                        ? '0' + new Date(message.timestamp).getMinutes()
                                                        : new Date(message.timestamp).getMinutes()
                                                }`}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Flex>
                            ))}
                        </Flex>
                    ))}
                </Box>

                <Box flex="1 1 auto" />

                <Flex padding="10px" alignItems="center">
                    <Input
                        focusBorderColor="#4ada80"
                        variant="outline"
                        fontSize="16px"
                        fontWeight={400}
                        minHeight="72px"
                        maxHeight="104px"
                        boxSizing="border-box"
                        value={messageInput}
                        onChange={handleInputChange}
                    />
                    <Button marginLeft="10px" fontSize="20px" colorScheme="green" onClick={handleSendMessage}>
                        Send
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};
