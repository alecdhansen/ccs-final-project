import { Link, Navigate, useOutlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Nav from "react-bootstrap/Nav";
import Cookies from "js-cookie";
import "../Header/HeaderNav.css";
import Swal from "sweetalert2";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiOutlineMenu } from "react-icons/hi";
import Header from "../Header/Header";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const outlet = useOutlet();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };
  const logoutUser = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      //   document.cookie =
      //     "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      //   localStorage.clear();
      //   await setIsAuth(false);
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
      //   navigate("/");
    }
    logout();
  };

  const whoseHandIsItAnyway = () => {
    if (user?.right_handed) {
      return "end";
    } else {
      return "start";
    }
  };
  const whoseHandIsItAnywayStyle = () => {
    if (user?.right_handed) {
      return "d-md-none mobilenav";
    } else {
      return "lefthand";
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className={whoseHandIsItAnywayStyle()}>
        <button className="d-md-none offcanvasopenbtn" onClick={handleShow}>
          <HiOutlineMenu />
        </button>
      </div>

      <header className="col-12 navheader">
        <Offcanvas
          placement={whoseHandIsItAnyway()}
          show={show}
          onHide={handleClose}
          responsive="md"
        >
          <Offcanvas.Header closeButton className="offcanvasheader">
            {" "}
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvasbody">
            <Nav.Item className="navlink">
              <Link to={"/home/profile/"} className="link">
                <button className="navbtn" onClick={handleClose}>
                  Profile
                </button>
              </Link>
            </Nav.Item>
            <Nav.Item className="navlink">
              <Link to={"leaderboard"}>
                <button className="navbtn" onClick={handleClose}>
                  Leaderboard
                </button>
              </Link>
            </Nav.Item>
            <Nav.Item className="navlink">
              <Link to={"/home/card/"}>
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
            <Nav.Item className="navlink">
              <Link to={"headtohead"}>
                <button className="navbtn" onClick={handleClose}>
                  Head to Head
                </button>
              </Link>
            </Nav.Item>
            <Nav.Item className="navlink">
              <button className="navbtn" onClick={() => logoutUser()}>
                <a>Logout</a>
              </button>
            </Nav.Item>
          </Offcanvas.Body>
        </Offcanvas>
      </header>
      {outlet}
    </>
  );
};
