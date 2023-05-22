import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import {Chat} from "./Chat";
import {Contacts} from "./Contacts/Contacts";
import {ChatProvider} from "./ChatContext";

export const Main = () => {
    return (
        <ChatProvider>
            <Box
                height="100vh"
                backgroundImage="linear-gradient(to bottom, #00a884 10%, #eae6df 10%)"
            >
                <Flex padding='20px'>
                    <Contacts/>
                    <Chat/>
                </Flex>

            </Box>
        </ChatProvider>
    )
}

// export const Main = ({
//                          roomContact,
//                          roomMessages,
//                          sendMessage
//                      }) => {
//     const {register, handleSubmit} = useForm();
//     const [roomName, setRoomName] = useState("");
//     const [messages, setMessages] = useState([]);
//
//     useEffect(() => {
//         setRoomName(roomContact);
//         setMessages(roomMessages);
//     }, [roomContact, roomMessages]);
//
//     const onSubmit = (data) => {
//         const {message} = data;
//         if (message) {
//             const response = sendMessage(roomName.chatId, message);
//             const newMessage = {
//                 type: "outgoing",
//                 idMessage: response.idMessage,
//                 timestamp: new Date().toString(),
//                 typeMessage: "textMessage",
//                 chatId: "79037202775@c.us",
//                 textMessage: message,
//                 statusMessage: "read",
//                 sendByApi: true
//             };
//             setMessages((prev) => [newMessage, ...prev]);
//         }
//     };
//
//     return (
//         <Box>
//             <Box>
//                 <Box>
//                     <img src={roomName?.avatar} alt="Avatar roomMeeting"/>
//                 </Box>
//                 <Box>
//                     <h3>{roomName?.name}</h3>
//                     <p>last seen at: {" "}</p>
//                 </Box>
//                 <Box>
//                     <Button/>
//                     <Button/>
//                     <Button/>
//                 </Box>
//             </Box>
//             <Box>
//                 {messages?.map((message) => (
//                     <p
//                         key={message.idMessage}
//                         className={`chat_message ${!message?.senderName ? "chat_reciever" : ""}`}
//                     >
//                         {/*<span>{message?.senderName ? message?.senderName : currentUser?.name}</span>*/}
//                         {(message?.typeMessage === "textMessage" || message?.typeMessage === "extendedTextMessage") ? message?.textMessage : 'Отправлена фото'}
//                         <span>
//               {new Date(message?.timestamp).getHours().toString()}:{new Date(message?.timestamp).getMinutes().toString()}
//             </span>
//                     </p>
//                 ))}
//             </Box>
//             <Box>
//                 <button/>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Input
//                         type="text"
//                         placeholder="Type a message"
//                         name="message"
//                         minLength="1"
//                         maxLength="100"
//                         disabled={!roomName?.chatId}
//                         {...register('chat')}
//                     />
//                     <Button type="submit">
//                         Send
//                     </Button>
//                 </form>
//                 <button/>
//             </Box>
//         </Box>
//     );
// };

