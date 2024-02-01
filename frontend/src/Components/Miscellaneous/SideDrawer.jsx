import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/AxiosInstance";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../Config/ChatLogics";
import NotificationBadge, { Effect } from "react-notification-badge";
import EditProfileModal from "./EditProfileModal";

const SideDrawer = () => {
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const toast = useToast();

  const logoutHandler = async () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axiosInstance.get(
        `/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to Load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosInstance.post(
        "/api/chat",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip hasArrow label="Search users" bg="gray.300" color="black">
          <Button variant="ghost" onClick={onOpen}>
            <IoSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Lato" color="#ff6f61">
          GoChat
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon />
            </MenuButton>
            <MenuList px={2}>
              {!notification.length && "No new messages"}

              {notification.map((n) => (
                <MenuItem
                  key={n._id}
                  px={2}
                  onClick={() => {
                    setSelectedChat(n.chat);
                    setNotification(notification.filter((n) => n !== n));
                  }}
                >
                  {n.chat.isGroupChat
                    ? `New message in ${n.chat.chatName}`
                    : `New message from ${getSender(user, n.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon color="black" />}
              colorScheme="custom"
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={profilePic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem
                  _hover={{
                    textDecoration: "underline",
                    textUnderlineOffset: "1.5px",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    fontFamily: "Lato",
                  }}
                >
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <EditProfileModal user={user} setPic={setProfilePic}>
                <MenuItem
                  _hover={{
                    textDecoration: "underline",
                    textUnderlineOffset: "1.5px",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    fontFamily: "Lato",
                  }}
                >
                  Edit Profile
                </MenuItem>
              </EditProfileModal>
              <MenuDivider />
              <MenuItem
                color="red"
                _hover={{
                  textDecoration: "underline",
                  textUnderlineOffset: "1.5px",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  fontFamily: "Lato",
                }}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
