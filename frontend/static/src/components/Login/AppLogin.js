import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";

function AppLogin({ setIsAuth, setState }) {
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
      await setIsAuth(true);
      setState(data);
      sessionStorage.setItem("state", JSON.stringify(data));
      navigate("/card/");
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
export default AppLogin;
