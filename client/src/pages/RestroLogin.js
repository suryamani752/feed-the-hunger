import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const RestroLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    // name: '',
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/restro/login", {
        // username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("restrosId", data?.user._id);
        dispatch(authActions.login());

        toast.success("user login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={3}
            textAlign={"center"}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>
          {/* <TextField
            placeholder='name'
            value={inputs.name}
            onChange={handleChange}
            name='name'
            margin='normal'
            type={"text"}
            required
          /> */}
          <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"email"}
            required
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"password"}
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
            // variant='contained'
          >
            Not a Restro ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RestroLogin;
