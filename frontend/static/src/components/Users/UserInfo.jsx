import "./UserInfo.css";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//npm
import moment from "moment";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
//React Icons
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

function UserInfo() {
  const { user, refreshUser } = useAuth();
  const [userData, setUserData] = useState("");
  const [lifetimePicks, setLifetimePicks] = useState([]);
  const navigate = useNavigate();
  let { username } = useParams();

  const handleError = (err) => {
    console.warn(err);
  };

  const day = new Date();
  const today = moment(day).format("YYYY-MM-DD");

  useEffect(() => {
    getUserData();
    getLifetimePicks();
  }, []);

  const getUserData = async () => {
    const response = await fetch(`/api_v1/user/profile/${username}/`).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setUserData(data[0]);
    }
  };
  console.log({ userData });

  const getLifetimePicks = async () => {
    const response = await fetch(`/api_v1/picks/lifetime/${username}`).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setLifetimePicks(data);
    }
  };
  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };
  const lifetimeWinLoss = lifetimePicks.map((pick) => pick.is_correct);
  const lifetimeCorrectGuesses = getOccurrence(lifetimeWinLoss, true); //here
  const lifetimeIncorrectGuesses = getOccurrence(lifetimeWinLoss, false);
  const lifetimeTotalGuesses =
    lifetimeCorrectGuesses + lifetimeIncorrectGuesses; //here
  const lifetimeGuessPercentage = (
    (lifetimeCorrectGuesses / lifetimeTotalGuesses) *
    100
  ).toFixed(0); //here

  const initialSignUpDate = userData?.date_joined;
  const dateJoined = moment(initialSignUpDate).format("MMM YYYY");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("challenger", user.user);
    formData.append("opponent", userData.user);

    console.log({ user });

    formData.append("date", today);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/competitions/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: `You challenged ${username}!`,
    });
    navigate("/home/headtohead");
  };

  return (
    <>
      <section className="takemebackbtn">
        <Link to="/home/leaderboard/">
          <button className="btn404 backtoleaderboard">
            <IoIosArrowBack /> Back to Leaderboard
          </button>
        </Link>
      </section>
      <div className="col-md-6 offset-md-3 col-10 offset-1 userbox">
        <div className={`landscape${userData?.favorite_team}`}>
          <div className="teamimgboxuser">
            <img
              src={require(`../../media/${userData?.favorite_team}.png`)}
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>

        <div className="avatarsection">
          <div className="avatarbox">
            <img
              src={userData?.avatar}
              alt=""
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="usernameedit">
          <h4 className="username hello">{userData?.username}</h4>
        </div>
        <span className="datejoined dj2">User since {dateJoined}</span>
        <div className="mainstats">
          <div className="lifetime2">
            <h2 className="mystatsheader2">Lifetime Stats</h2>
            <div className="guesstitles row">
              <span className="spanlabels2 col-4">Correct Picks</span>
              <span className="spanlabels2 col-4">Games</span>
              <span className="spanlabels2 col-4">Percentage</span>
            </div>
            <div className="guessnumbers row">
              <span className="col-4">{lifetimeCorrectGuesses}</span>
              <span className="col-4">{lifetimeTotalGuesses}</span>
              <span className="col-4">{lifetimeGuessPercentage}%</span>
            </div>
          </div>
          <div>
            <Link to="/home/headtohead" className="challengelink">
              <button className="challengebtn" onClick={handleSubmit}>
                Challenge <MdOutlinePersonAddAlt />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserInfo;
