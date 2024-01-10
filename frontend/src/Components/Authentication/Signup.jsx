import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const toast = useToast();

  const postDetails = async (pics) => {
    setLoading(true)
    if(pics === undefined) {
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

    if(pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dpxdmwzeo");
      fetch("https://api.cloudinary.com/v1_1/dpxdmwzeo/image/upload");
    }
  };

  const submitHandler = () => {};

  return (
    <VStack>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="2.5rem">
            {show ? (
              <ViewOffIcon color="gray.700" onClick={() => setShow(!show)} />
            ) : (
              <ViewIcon color="gray.700" onClick={() => setShow(!show)} />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="re-enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="2.5rem">
            {show ? (
              <ViewOffIcon color="gray.700" onClick={() => setShow(!show)} />
            ) : (
              <ViewIcon color="gray.700" onClick={() => setShow(!show)} />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Profile picture</FormLabel>
        <Input
          type={"file"}
          p={"1.5"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
