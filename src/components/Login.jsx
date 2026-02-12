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
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    setError((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(generatedCaptcha);
    const validationErrors = validateLogin(formData, generatedCaptcha);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});

    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    //Generate hashed password
    const hashedPassword = SHA256(formData.password).toString();

    //Object with hashed password
    const formDataWithHashedPwd = { ...formData, password: hashedPassword };
    console.log(formDataWithHashedPwd);

    let isAuth = allUsers.find((user) => {
      return (
        user.username === formDataWithHashedPwd.username &&
        user.password === formDataWithHashedPwd.password
      );
    });
    isAuth = isAuth && formDataWithHashedPwd.inputCaptcha === generatedCaptcha;
    if (!isAuth) {
      console.log("Invalid username or password!");
      generateCaptcha(6);
      setFormData((prev) => ({ ...prev, inputCaptcha: "" }));
      return;
    }
    console.log("logged in successfully!");

    dispatch(login(formDataWithHashedPwd.username));
    navigate("/dashboard");

    // localStorage.setItem("isAuth", JSON.stringify(true));
    setFormData({ username: "", password: "", inputCaptcha: "" });
  };

  const handleRefreshClick = useCallback(() => {
    generateCaptcha(6);
  }, []);

  return (
    <form noValidate onSubmit={handleLoginSubmit}>
      {" "}
      <div>
        Don't have an account? <Link to="/">Register</Link>
      </div>
      <TextField
        variant="outlined"
        label="Username"
        type="text"
        name="username"
        onChange={handleLoginChange}
        value={formData.username}
        required
        error={error.username}
        helperText={error.username}
      />
      <TextField
        variant="outlined"
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        onChange={handleLoginChange}
        value={formData.password}
        required
        error={error.password}
        helperText={error.password}
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
      <div>{generatedCaptcha}</div>
      <IconButton onClick={handleRefreshClick}>
        <CachedIcon />
      </IconButton>
      <TextField
        variant="outlined"
        label="Enter Captcha"
        type="text"
        name="inputCaptcha"
        onChange={handleLoginChange}
        value={formData.inputCaptcha}
        required
        error={error.inputCaptcha}
        helperText={error.inputCaptcha}
      />
      <Button variant="contained" type="submit">
        Get Started
      </Button>
    </form>
  );
}

export default Login;
