import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { validateRegister } from "../utils/validateRegister";
import { Link, useNavigate } from "react-router";
import SHA256 from "crypto-js/sha256";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Register.css";

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
    const hashedPassword = SHA256(formData.password).toString();
    const formDataWithHashedPwd = {
      username: formData.username,
      password: hashedPassword,
    };
    allUsers.push(formDataWithHashedPwd);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    setFormData({});
    navigate("/login");
  };

  return (
    <div className="register-page">
      {/* Dot pattern background */}
      <div className="register-bg" />

      <div className="register-card">
        {/* Logo */}
        <div className="register-logo">
          <div className="logo-dots">
            <span className="dot blue"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <span className="logo-text">Zenith</span>
        </div>

        {/* Heading */}
        <div className="register-header">
          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="register-form">
          <div className="form-row">
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                type="text"
                name="name"
                error={!!error.name}
                helperText={error.name}
                onChange={handleRegisterChange}
                required
                className="register-input"
              />
            </div>
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                type="text"
                name="username"
                error={!!error.username}
                helperText={error.username}
                onChange={handleRegisterChange}
                required
                className="register-input"
              />
            </div>
          </div>

          <div className="form-field">
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              error={!!error.email}
              helperText={error.email}
              onChange={handleRegisterChange}
              required
              className="register-input"
            />
          </div>

          <div className="form-field">
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              error={!!error.password}
              helperText={error.password}
              onChange={handleRegisterChange}
              required
              className="register-input"
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
          </div>

          <div className="form-field">
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Number"
              type="number"
              name="contact"
              error={!!error.contact}
              helperText={error.contact}
              onChange={handleRegisterChange}
              className="register-input"
            />
          </div>

          <div className="form-terms">
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms((prev) => !prev)}
                  sx={{
                    color: "#d1d5db",
                    "&.Mui-checked": { color: "#3b82f6" },
                  }}
                />
              }
              label={
                <span className="terms-label">
                  I agree to the{" "}
                  <span className="register-link">Terms and Conditions</span>
                </span>
              }
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={!agreeToTerms}
            className="register-btn"
            disableElevation
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
