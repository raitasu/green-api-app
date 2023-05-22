import axios from "axios";
import {url} from "../utils/constants";

export const auth = (IdInstance, ApiTokenInstance) => {
    return axios.get(`${url}/waInstance${IdInstance}/getSettings/${ApiTokenInstance}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const sendMessage = ({
                                idInstance,
                                apiTokenInstance,
                                chatId,
                                message,
                            }) => {
    return axios
        .post(
            `${url}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
            {chatId, message},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error(error);
        });
};

export const receiveNotification = ({
                                        idInstance,
                                        apiTokenInstance,
                                    }) => {
    return axios
        .get(
            `${url}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 400) {
                throw new Error(error);
            }
            throw new Error(error);
        });
};

export const deleteNotification = ({
                                       idInstance,
                                       apiTokenInstance,
                                       receiptId,
                                   }) => {
    return axios
        .delete(
            `${url}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 400) {
                throw new Error(error);
            }
            throw new Error(error);
        });
};

export const getSettings = ({
                                idInstance,
                                apiTokenInstance,
                            }) => {
    return axios
        .get(
            `${url}/waInstance${idInstance}/GetSettings/${apiTokenInstance}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 400) {
                throw new Error(error);
            }
            throw new Error(error);
        });
};

export const setSettings = ({
                                idInstance,
                                apiTokenInstance,
                                incomingWebhook,
                                outgoingWebhook,
                            }) => {
    return axios
        .post(
            `${url}/waInstance${idInstance}/SetSettings/${apiTokenInstance}`,
            {incomingWebhook, outgoingWebhook},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error(error);
        });
};
