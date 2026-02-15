import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>HomePage</div>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Register
      </Button>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
    </div>
  );
}

export default HomePage;
