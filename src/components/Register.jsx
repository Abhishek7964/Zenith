import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { validateRegister } from "../utils/validateRegitser";
import { Link, useNavigate } from "react-router";
import SHA256 from "crypto-js/sha256";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    setError((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationError = validateRegister(formData);
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    setError({});

    alert("Registration successful!");
    //Generate hashed password
    const hashedPassword = SHA256(formData.password).toString();
    console.log(hashedPassword);

    //Object with hashed password
    const formDataWithHashedPwd = {
      username: formData.username,
      password: hashedPassword,
    };

    //Push data to the localStorage
    allUsers.push(formDataWithHashedPwd);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    setFormData({});
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div>
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          name="name"
          error={error.name}
          helperText={error.name}
          onChange={handleRegisterChange}
          required
        />
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          name="username"
          error={error.username}
          helperText={error.username}
          onChange={handleRegisterChange}
          required
        />
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          error={error.email}
          helperText={error.email}
          onChange={handleRegisterChange}
          required
        />
        <TextField
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          error={error.password}
          helperText={error.password}
          onChange={handleRegisterChange}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          variant="outlined"
          label="Contact Number"
          type="number"
          name="contact"
          error={error.contact}
          helperText={error.contact}
          onChange={handleRegisterChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms((prev) => !prev)}
            />
          }
          label="I agree to Terms and Conditions"
          required
        ></FormControlLabel>
        <Button
          variant="contained"
          type="submit"
          disabled={agreeToTerms ? false : true}
        >
          Create account
        </Button>
      </div>
    </form>
  );
}

export default Register;
