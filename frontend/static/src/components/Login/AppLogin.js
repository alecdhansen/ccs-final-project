import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import "./Login.css";

const AppLogin = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    const value = e.target.value;
    setUser((prevState) => ({ ...prevState, username: value }));
  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    setUser((prevState) => ({ ...prevState, password: value }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Uh oh. Something went wrong. Check your network tab!");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      delete data.key;
      login(data);
      // await setIsAuth(true);
      // setState(data);
      // // debugger;
      // localStorage.setItem("state", JSON.stringify(data));
      // await navigate("/home/card/");
    }
  };
  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user.username}
              onChange={handleUsernameInput}
              name="username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              value={user.password}
              onChange={handlePasswordInput}
              name="password"
            />
          </Form.Group>
          <div>
            <button className="submitbtn" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default AppLogin;
