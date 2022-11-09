import "./UserInfo.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//npm
import moment from "moment";

function UserInfo() {
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
    <div className="col-md-6 offset-md-3 col-10 offset-1 userbox">
      <div className={`landscape${userData?.favorite_team}`}>
        <div className="teamimgbox">
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
      <span className="datejoined">User since {dateJoined}</span>
      <div className="mainstats">
        <h2 className="mystatsheader">Lifetime Stats</h2>
        <div className="lifetime">
          <div className="guesstitles">
            <span className="spanlabels">Correct Picks</span>
            <span className="spanlabels">Games</span>
            <span className="spanlabels">Percentage Correct</span>
          </div>
          <div className="guessnumbers">
            <span>{lifetimeCorrectGuesses}</span>
            <span>{lifetimeTotalGuesses}</span>
            <span>{lifetimeGuessPercentage}%</span>
          </div>
        </div>
      </div>
      <section className="takemebackbtn">
        <button
          className="btn404"
          onClick={() => {
            window.history.back();
          }}
        >
          Back to leaderboard
        </button>
      </section>
    </div>
  );
}
export default UserInfo;
