import "./Login.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
//Bootstrap
import Form from "react-bootstrap/Form";
//npm
import Cookies from "js-cookie";
//React Icons
import { RiErrorWarningFill } from "react-icons/ri";

const AppLogin = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

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
    const data = await response.json();
    if (!response.ok) {
      setError(data);
      throw new Error("Uh oh. Something went wrong. Check your network tab!");
    } else {
      Cookies.set("Authorization", `Token ${data.key}`);
      delete data.key;
      login(data);
    }
  };
  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user.username}
              onChange={handleUsernameInput}
              name="username"
              required
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
              required
            />
          </Form.Group>
          {error &&
            error?.non_field_errors?.map((error) => {
              return (
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  <RiErrorWarningFill style={{ marginRight: "3px" }} />
                  {error}
                </p>
              );
            })}
          <div>
            <button
              className="submitbtn"
              type="submit"
              style={{ width: "100%", borderRadius: "8px" }}
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default AppLogin;
