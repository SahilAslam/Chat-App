/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axiosInstance from "../../Axios/AxiosInstance";
import { useNavigate } from "react-router-dom";

const EditProfileModal = ({ user, setPic, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

  const toast = useToast();

  const navigate = useNavigate();

  const postDetails = async (pics) => {
    setImgLoading(true);
    if (pics === undefined) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);
      fetch(uploadUrl, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePic(data.secure_url.toString());
          console.log(data);
          setImgLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setImgLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setImgLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axiosInstance.post(
        "/api/user/edit",
        {
          userId: user._id,
          name,
          email,
          profilePic,
          token: user.token,
        },
        config
      );

      toast({
        title: "Updated",
        description: "Profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      setPic(profilePic);
      onClose();
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName(user.name);
    setEmail(user.email);
    setProfilePic(user.profilePic);
    onClose();
  };

  return (
    <>
      {children && <span onClick={onOpen}>{children}</span>}
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Spinner w={12} h={12} alignSelf="center" margin="auto" />
            ) : (
              <VStack>
                <FormControl id="first-name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="pic">
                  <FormLabel>Change Profile</FormLabel>
                  <Input
                    type={"file"}
                    p={"1.5"}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </FormControl>
                {imgLoading ? (
                  <Spinner w={12} h={12} alignSelf="center" margin="auto" />
                ) : (
                  <Image src={profilePic} />
                )}
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            {imgLoading ? (
              <Button isLoading colorScheme="blue">
                Update
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={submitHandler}>
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
