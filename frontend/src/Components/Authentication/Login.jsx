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


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = () => {};

  const guestHandler = () => {};

  return (
    <VStack>
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="login-password" isRequired>
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

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
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