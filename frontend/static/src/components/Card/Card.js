import "./Card.css";
import "../Timer/timer.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import Button from "react-bootstrap/Button";
import CountdownTimer from "../Timer/CountdownTimer";
import Aos from "aos";
import "aos/dist/aos.css";

function Card() {
  const [todaysGames, setTodaysGames] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [userPick, setUserPick] = useState("");
  const [firstGameTime, setFirstGameTime] = useState("");

  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  const currentDay = dd + "-" + mm + "-" + yyyy;
  console.log("today's date is", currentDay);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    getTodaysGames();
  }, []);

  const getTodaysGames = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
        "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
      },
    };
    const data = await fetch(
      `https://nba-schedule.p.rapidapi.com/schedule?date=${currentDay}`,
      options
    ).then((response) => response.json());
    setTodaysGames(data[0].games);
    setFirstGameTime(data[0].games[1].gameDateTimeEst);
    setGameDate(moment(data[0].games[0].gameDateTimeEst).format("YYYY-MM-DD"));
  };

  const handleAwayTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  const handleHomeTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this", e.target);
    const formData = new FormData();
    formData.append("gameid", gameID);
    formData.append("date", gameDate);
    formData.append("user_pick", userPick);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/picks/current/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
    }
    e.target.style.display = "none";
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const gameListHtml = todaysGames.map((game) => (
    <div data-aos="zoom-in-up" className="maincard" key={game.gameId}>
      {/* <li key={game.gameId} className="card"> */}
      <form className="formbox" onSubmit={handleSubmit}>
        <h4 className="gamestatus">{game.gameStatusText}</h4>
        <div className="spanbar"></div>
        <div className="gamebtnhouse">
          <button
            type="button"
            id={game.gameId}
            name="awayTeam"
            onClick={handleAwayTeamInput}
            value={game.awayTeam.teamName}
            className={`gamebtn${game.awayTeam.teamTricode} gamebtn`}
          >
            <div className="imghouse">
              {" "}
              <img
                src={require(`../../media/${game.awayTeam.teamTricode}.png`)}
                alt=""
                className="teamlogo"
              ></img>
            </div>
            <div className="gamedetails">
              <div className="cityteam">
                {game.awayTeam.teamCity} {game.awayTeam.teamName}
              </div>
              <div div className="winloss">
                {game.awayTeam.wins}-{game.awayTeam.losses}
              </div>
            </div>
          </button>
          <button
            type="button"
            id={game.gameId}
            name="homeTeam"
            onClick={handleHomeTeamInput}
            value={game.homeTeam.teamName}
            className={`gamebtn${game.homeTeam.teamTricode} gamebtn`}
          >
            <div className="imghouse">
              <img
                src={require(`../../media/${game.homeTeam.teamTricode}.png`)}
                alt=""
                className="teamlogo"
              ></img>
            </div>
            <div className="gamedetails">
              <div className="cityteam">
                {game.homeTeam.teamCity} {game.homeTeam.teamName}
              </div>
              <div className="winloss">
                {game.homeTeam.wins}-{game.homeTeam.losses}
              </div>
            </div>
          </button>
        </div>
        <div>
          <button type="submit" className="gamesubmitbtn">
            Submit Picks!
          </button>
        </div>
      </form>
      {/* </li> */}
    </div>
  ));

  const firstGameStartingTime = new Date(firstGameTime);
  const firstGameStartingTimeInMS = firstGameStartingTime.getTime();
  const fourHoursInMS = 14400000;
  const nowInMS = new Date().getTime();
  const timeUntilGameInMS = firstGameStartingTimeInMS - nowInMS;
  const gameTimeCountDownInMS = nowInMS + timeUntilGameInMS + fourHoursInMS;

  return (
    <>
      <div className="carddiv">
        <CountdownTimer targetDate={gameTimeCountDownInMS} />
      </div>
      <div className="cards col-md-8 offset-md-2 col-10 offset-1 divist">
        {gameListHtml}
      </div>
    </>
  );
}

export default Card;
