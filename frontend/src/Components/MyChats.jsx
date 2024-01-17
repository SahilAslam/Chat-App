import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider"
import { useToast } from "@chakra-ui/react";
import axiosInstance from "../Axios/AxiosInstance";


const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosInstance.get("/api/chat", config);
      console.log(data)
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, [])

  return (
    <div>MyChats</div>
  )
}

export default MyChats