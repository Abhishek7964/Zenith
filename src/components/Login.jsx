import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { validateLogin } from "../utils/validateLogin";

function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    } else {
      setFormData({});
      setError({});
      console.log("successfully login");
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        {" "}
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          name="username"
          onChange={handleLoginChange}
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
        <Button variant="contained" type="submit">
          Get Started
        </Button>
      </form>
    </div>
  );
}

export default Login;
