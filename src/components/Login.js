import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import {WhatsAppIcon} from "../common/images/whatsAppIcon";
import {useForm} from "react-hook-form";
import {auth} from "../api/api";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const [error, serError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const IdInstance = localStorage.getItem('IdInstance');
        const ApiTokenInstance = localStorage.getItem('ApiTokenInstance');
        if (IdInstance && ApiTokenInstance) {
            auth(IdInstance, ApiTokenInstance)
                .then((res) => {
                    if (res) {
                        serError(null);
                        navigate('/main')
                    }
                })
                .catch((error) => {
                    serError(error)
                    console.error(error);
                });
        }
    }, []);

    const onSubmit = (IdInstance, ApiTokenInstance) => {
        auth(IdInstance, ApiTokenInstance)
            .then((res) => {
                if (res) {
                    serError(null);
                    localStorage.setItem('IdInstance', IdInstance);
                    localStorage.setItem('ApiTokenInstance', ApiTokenInstance);
                    navigate('/main')
                }
            })
            .catch((error) => {
                serError(error)
                console.error(error);
            });
    };


    const handleFormSubmit = (data) => {
        const {idInstance, apiTokenInstance} = data;
        onSubmit(idInstance, apiTokenInstance);
    };

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
                <Box
                    width="800px"
                    height="700px"
                    padding="4"
                    backgroundColor="white"
                    borderRadius="md"
                    margin="auto"
                    boxShadow="0px 0px 4px gray"
                >
                    <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        gap="40px"
                    >
                        <Box marginBottom="4">
                            <Text fontSize="20px" fontWeight="bold">
                                Sign in to your account green API
                            </Text>
                        </Box>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Box height='80px'>
                                <Input
                                    focusBorderColor="#00a884"
                                    variant="flushed"
                                    placeholder="Enter your idInstance"
                                    marginBottom="4"
                                    {...register("idInstance", {required: true})}
                                />
                                {errors.idInstance ? (
                                    <Text color="red">This field is required</Text>
                                ) : error ? <Text color="red">Please enter valid values</Text> : ''}
                            </Box>
                            <Box height='80px'>
                                <Input
                                    focusBorderColor="#00a884"
                                    variant="flushed"
                                    placeholder="Enter your ApiTokenInstance"
                                    marginBottom="4"
                                    {...register("apiTokenInstance", {required: true})}
                                />
                                {errors.apiTokenInstance ? (
                                    <Text color="red">This field is required</Text>
                                ) : error ? <Text color="red">Please enter valid values</Text> : ''}
                            </Box>

                            <Button
                                type="submit"
                                width="180px"
                                height="40px"
                                bg="#00a884"
                                borderRadius="3px"
                                _hover={{bg: "#008f70"}}
                                _active={{boxShadow: "0px 0px 8px gray"}}
                            >
                                Log In
                            </Button>
                        </form>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
