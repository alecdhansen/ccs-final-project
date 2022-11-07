import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import LoginHome from "../Login/LoginHome";
import Fof from "./Fof";
import Register from "../Login/Register";
import ProfileForm from "../Profile/ProfileForm";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedLayout } from "./ProtectedLayout";

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
      // debugger;
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
        <Route
          element={
            <Layout
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              state={state}
              setState={setState}
            />
          }
        >
          <Route
            path="/"
            element={<LoginHome setIsAuth={setIsAuth} setState={setState} />}
          />
          <Route
            path="/register/"
            element={<Register setIsAuth={setIsAuth} setState={setState} />}
          />
        </Route>

        <Route path="home/" element={<ProtectedLayout />}>
          <Route path="card/" element={<Card />} />

          <Route path="profile" element={<ProfileForm state={state} />} />
          <Route
            path="leaderboard/"
            element={<p>this will be the leaderboard</p>}
          />
          <Route
            path="headtohead/"
            element={<p>this will be the headtohead</p>}
          />
        </Route>

        <Route path="*" element={<Fof />} />
      </Routes>
    </>
  );
}

export default App;
