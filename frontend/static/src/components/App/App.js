import "./App.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import LoginHome from "../Login/LoginHome";
import Register from "../Login/Register";
import ProfileForm from "../Profile/ProfileForm";
import Button from "react-bootstrap/Button";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState(null);
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
        <Route
          path="/"
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
            index
            element={<LoginHome setIsAuth={setIsAuth} setState={setState} />}
          />
          <Route
            path="card"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Card />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={<Register setIsAuth={setIsAuth} setState={setState} />}
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <ProfileForm />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <main>
              <p>there is nothing here! try again! lol!</p>
              <Link to="card">
                <Button
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Take me back
                </Button>
              </Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
