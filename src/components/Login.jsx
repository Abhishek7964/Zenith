import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useCallback, useEffect, useState } from "react";
import { validateLogin } from "../utils/validateLogin";
import { useCaptcha } from "../hooks/useCaptcha";
import SHA256 from "crypto-js/sha256";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    inputCaptcha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const { generatedCaptcha, generateCaptcha } = useCaptcha(6);

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
    const userDataWithHashedPwd = { ...formData, password: hashedPassword };
    console.log(userDataWithHashedPwd);

    let isAuth = allUsers.find((user) => {
      return (
        user.username === userDataWithHashedPwd.username &&
        user.password === userDataWithHashedPwd.password
      );
    });
    isAuth = isAuth && userDataWithHashedPwd.inputCaptcha === generatedCaptcha;
    if (!isAuth) {
      console.log("Invalid username or password!");
      generateCaptcha(6);
      setFormData((prev) => ({ ...prev, inputCaptcha: "" }));
      return;
    }
    console.log("logged in successfully!");
    localStorage.setItem("isAuth", JSON.stringify(true));
    setFormData({ username: "", password: "", inputCaptcha: "" });
  };

  const handleRefreshClick = useCallback(() => {
    generateCaptcha(6);
  }, []);

  return (
    <form noValidate onSubmit={handleLoginSubmit}>
      {" "}
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
      <Button variant="contained" onClick={handleRefreshClick}>
        Refresh Captcha
      </Button>
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
