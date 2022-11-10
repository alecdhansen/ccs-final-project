import "./UserInfo.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//npm
import moment from "moment";

function UserInfo() {
  const { user, refreshUser } = useAuth();
  let { username } = useParams();
  const [userData, setUserData] = useState("");
  const [lifetimePicks, setLifetimePicks] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

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

  return (
    <>
      <section className="takemebackbtnmobile">
        <Link to="/home/leaderboard/">
          <button className="btn404 backtoleaderboard">
            Back to Leaderboard
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
        </div>
        <section className="takemebackbtn">
          <Link to="/home/leaderboard/">
            <button className="btn404">Back to Leaderboard</button>
          </Link>
        </section>
      </div>
    </>
  );
}
export default UserInfo;
