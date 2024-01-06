import { useEffect, useState } from 'react'
import axiosInstance from '../Axios/AxiosInstance';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const {data} = await axiosInstance.get('/api/chat');
    console.log(data)
    setChats(data);
  }

  useEffect(() => {
    fetchChats();
  }, [])
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>       
          {chat.chatName}
        </div>
        
      ))}
    </div>
  )
}

export default ChatPage