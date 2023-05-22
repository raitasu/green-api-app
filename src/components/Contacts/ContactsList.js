import {
    Stack,
    StackDivider,
} from '@chakra-ui/react';
import {Contact} from "./Contact";
import {useEffect, useState} from "react";
import axios from "axios";
import {url} from "../../utils/constants";

export const ContactsList = (props) => {

    const [contactsList, setContactsList] = useState([])

    const IdInstance = () => localStorage.getItem('IdInstance');
    const ApiTokenInstance = () => localStorage.getItem('ApiTokenInstance');

    const getAllContacts = () => {
        return axios.get(`${url}/waInstance${IdInstance()}/getContacts/${ApiTokenInstance()}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return setContactsList(response.data)
            })
            .catch((err) => {
                console.log(`Ошибка при получении списка пользователей: ${err}`);
                throw err;
            });
    };

    useEffect(() => {
        getAllContacts()
    }, [])

    return (
        <Stack
            spacing='0'
            pr='1'
            divider={<StackDivider w='82%' alignSelf='flex-end'/>}
            maxHeight='850px'
            {...props}
        >
            {contactsList.map((item, index) => (
                <Contact
                    key={index}
                    date={new Date().getDate()}
                    message={item.id}
                    name={item.name}
                    seen={index % 2 === 0}
                />
            ))}
        </Stack>
    );
}
