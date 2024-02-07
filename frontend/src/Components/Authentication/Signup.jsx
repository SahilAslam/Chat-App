import { useState } from "react";
import { useNavigate } from "react-router-dom"
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
import axiosInstance from "../../Axios/AxiosInstance";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

  const toast = useToast();

  const navigate = useNavigate();

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
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);
      fetch(uploadUrl, {
        method: "post",
        body: data,
      }).then((res) => res.json())
        .then(data => {
          setProfilePic(data.secure_url.toString());
          console.log(data);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        })
    } else {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword) {
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

    if(password !== confirmPassword) {
      toast({
        title: "Please select a matching password",
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
      
      const { data }  = await axiosInstance.post("/api/user", {
        name,
        email,
        password,
        profilePic
      }, config);

      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate('/chats')
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured",
        description: error?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false)
    }
  };

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
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
