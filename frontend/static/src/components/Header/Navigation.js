import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./HeaderNav.css";
import Swal from "sweetalert2";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsArrowLeftSquare } from "react-icons/bs";

function Navigation({ isAuth, setIsAuth, state }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };
  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      document.cookie =
        "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      await setIsAuth(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "You are now logged out.",
      });
      handleClose();
      navigate("/");
    }
  };

  const whoseHandIsItAnyway = () => {
    if (!state.right_handed) {
      return "end";
    } else {
      return "start";
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="mobilenav">
          <button className="d-md-none offcanvasopenbtn" onClick={handleShow}>
            <BsArrowLeftSquare />
          </button>
        </div>
      ) : null}
      <header className="col-12 navheader">
        <Offcanvas
          placement="end"
          show={show}
          onHide={handleClose}
          responsive="md"
        >
          <Offcanvas.Header closeButton className="offcanvasheader">
            {" "}
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvasbody">
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"/profile/"} className="link">
                  <button className="navbtn" onClick={handleClose}>
                    Profile
                  </button>
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"leaderboard"}>
                  <button className="navbtn" onClick={handleClose}>
                    Leaderboard
                  </button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item autofocus className="navlink">
                <Link to={"card"}>
                  <button
                    type="button"
                    autoFocus
                    className="navbtn"
                    onClick={handleClose}
                  >
                    Home
                  </button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"h2h"}>
                  <button className="navbtn" onClick={handleClose}>
                    Head to Head
                  </button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item className="navlink">
                <button className="navbtn" onClick={() => logout()}>
                  <a>Logout</a>
                </button>
              </Nav.Item>
            ) : null}
          </Offcanvas.Body>
        </Offcanvas>
      </header>
    </>
  );
}
export default Navigation;
