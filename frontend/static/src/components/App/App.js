import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProtectedLayout } from "./ProtectedLayout";
import Card from "../Card/Card";
import UnprotectedLayout from "./UnprotectedLayout";
import LoginHome from "../Login/LoginHome";
import Fof from "./Fof";
import Register from "../Login/Register";
import ProfilePage from "../Profile/ProfilePage";
import Leaderboard from "../Leaderboard/LeaderBoard";
import HeadToHead from "../HeadToHead/HeadToHead";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const newState = JSON.parse(window.localStorage.getItem("state"));

  useEffect(() => {
    setState(newState);
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<UnprotectedLayout />}>
          <Route path="/" element={<LoginHome />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/home" element={<ProtectedLayout />}>
          <Route path="games" element={<Card />} />

          <Route path="profile" element={<ProfilePage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="headtohead" element={<HeadToHead />} />
        </Route>

        <Route path="*" element={<Fof />} />
      </Routes>
    </>
  );
}

export default App;
