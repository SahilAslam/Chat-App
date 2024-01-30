import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import EditProfile from './Pages/EditProfile';

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/chats' element={<ChatPage />} />
          <Route path='/UpdateProfile' element={<EditProfile />} />
        </Routes>
      </div>
      
    </>
  )
}

export default App
