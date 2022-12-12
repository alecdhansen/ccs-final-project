import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handleError } from "../utils";
//Bootstrap
import Form from "react-bootstrap/Form";
//npm
import Cookies from "js-cookie";
//React Icons
import { MdArrowBackIosNew } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
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
    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data);
      throw new Error("Uh oh. Something went wrong. Check your network tab!");
    } else {
      Cookies.set("Authorization", `Token ${data.key}`);
      login(data);
      navigate("/home/games/");
    }
  };
  return (
    <>
      <main className="mainloginscreenregister">
        <button
          className="registergobackbtn"
          onClick={() => {
            window.history.back();
          }}
        >
          <MdArrowBackIosNew />
        </button>
        <div className="loginbox col-md-4 offset-md-4 col-10 offset-1">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={handleInput}
                name="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={user.email}
                onChange={handleInput}
                name="email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={user.password1}
                onChange={handleInput}
                required
                name="password1"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={user.password2}
                onChange={handleInput}
                required
                name="password2"
              />
            </Form.Group>
            {error &&
              error?.password1?.map((error) => {
                return (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    <RiErrorWarningFill
                      style={{ marginRight: "3px", fontSize: "12px" }}
                    />
                    {error}
                  </p>
                );
              })}
            {error &&
              error?.non_field_errors?.map((error) => {
                return (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    <RiErrorWarningFill
                      style={{ marginRight: "3px", fontSize: "12px" }}
                    />
                    {error}
                  </p>
                );
              })}
            <button className="registersubmitbtn" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </main>
    </>
  );
}
export default Register;
