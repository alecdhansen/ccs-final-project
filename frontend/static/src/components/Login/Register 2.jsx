import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//Bootstrap
import Form from "react-bootstrap/Form";
//npm
import Cookies from "js-cookie";
//React Icons
import { MdArrowBackIosNew } from "react-icons/md";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
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

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      // localStorage.setItem("state", JSON.stringify(data));
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