import { useNavigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import LoginHome from "../Login/LoginHome";
import Register from "../Login/Register";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const newState = JSON.parse(window.sessionStorage.getItem("state"));

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
          {isAuth ? <Route path="card" element={<Card />} /> : null}
          <Route
            path="register"
            element={<Register setIsAuth={setIsAuth} setState={setState} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
