import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useCallback, useEffect, useState } from "react";
import { validateLogin } from "../utils/validateLogin";
import { useCaptcha } from "../hooks/useCaptcha";
import SHA256 from "crypto-js/sha256";
import { Link, useNavigate } from "react-router";
import CachedIcon from "@mui/icons-material/Cached";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/authSlice";
import "../styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    inputCaptcha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const { generatedCaptcha, generateCaptcha } = useCaptcha(6);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    generateCaptcha(6);
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData, generatedCaptcha);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const hashedPassword = SHA256(formData.password).toString();
    const formDataWithHashedPwd = { ...formData, password: hashedPassword };
    let isAuth = allUsers.find(
      (user) =>
        user.username === formDataWithHashedPwd.username &&
        user.password === formDataWithHashedPwd.password,
    );
    isAuth = isAuth && formDataWithHashedPwd.inputCaptcha === generatedCaptcha;
    if (!isAuth) {
      generateCaptcha(6);
      setFormData((prev) => ({ ...prev, inputCaptcha: "" }));
      return;
    }
    dispatch(login(formDataWithHashedPwd.username));
    navigate("/dashboard");
    setFormData({ username: "", password: "", inputCaptcha: "" });
  };

  const handleRefreshClick = useCallback(() => {
    generateCaptcha(6);
  }, []);

  return (
    <div className="login-page">
      {/* Dot pattern background */}
      <div className="login-bg" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-dots">
            <span className="dot blue"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <span className="logo-text">Zenith</span>
        </div>

        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">
              Create one
            </Link>
          </p>
        </div>

        {/* Form */}
        <form noValidate onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-field">
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              type="text"
              name="username"
              onChange={handleLoginChange}
              value={formData.username}
              required
              error={!!error.username}
              helperText={error.username}
              className="login-input"
            />
          </div>

          <div className="form-field">
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleLoginChange}
              value={formData.password}
              required
              error={!!error.password}
              helperText={error.password}
              className="login-input"
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

          {/* Captcha row */}
          <div className="captcha-row">
            <div className="captcha-display">
              <span className="captcha-text">{generatedCaptcha}</span>
              <IconButton
                onClick={handleRefreshClick}
                className="captcha-refresh"
                size="small"
                title="Refresh captcha"
              >
                <CachedIcon fontSize="small" />
              </IconButton>
            </div>

            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Enter captcha"
                type="text"
                name="inputCaptcha"
                onChange={handleLoginChange}
                value={formData.inputCaptcha}
                required
                error={!!error.inputCaptcha}
                helperText={error.inputCaptcha}
                className="login-input"
              />
            </div>
          </div>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="login-btn"
            disableElevation
          >
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
