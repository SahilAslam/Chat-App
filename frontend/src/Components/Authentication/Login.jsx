import React, { useState } from 'react'
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axiosInstance from '../../Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const guestEmail = import.meta.env.VITE_GUESTUSER_EMAIL;
  const guestPassword = import.meta.env.VITE_GUESTUSER_PASSWORD;

  const toast = useToast();

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if(!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return; 
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      
      const { data }  = await axiosInstance.post("/api/user/login", {
        email,
        password,
      }, config);

      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chat')

    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false)
    }
  };
  

  const guestHandler = () => {
    setEmail(guestEmail);
    setPassword(guestPassword);
  };

  return (
    <VStack>
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            value={password}
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

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Log In
      </Button>

      <Box position="relative" padding="7" width="100%">
        <Divider />
        <AbsoluteCenter bg="white" color="gray" px="4">
          or
        </AbsoluteCenter>
      </Box>

      <Button
        variant="outline"
        colorScheme="orange"
        width="100%"
        style={{}}
        onClick={guestHandler}
      >
        Login as Guest
      </Button>
    </VStack>
  );
}

export default Login