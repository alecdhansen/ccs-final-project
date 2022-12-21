import "./CardStyles/Card.css";
import "../Timer/timer.css";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import CountdownTimer from "../Timer/CountdownTimer";
import CardFooter from "./CardFooter";
import { handleError } from "../../utils";
//npm
import Cookies from "js-cookie";
import moment from "moment";
import Aos from "aos";
//React Icons
import { BsCheckCircleFill } from "react-icons/bs";

const Card = () => {
  const [todaysGames, setTodaysGames] = useState([]);
  const [todaysPicks, setTodaysPicks] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [userPick, setUserPick] = useState("");
  const [opponent, setOpponent] = useState("");
  const [awayTeamFocus, setAwayTeamFocus] = useState(false);
  const [homeTeamFocus, setHomeTeamFocus] = useState(false);
  const [firstGameTime, setFirstGameTime] = useState("");
  const { user } = useAuth();

  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  const currentDay = dd + "-" + mm + "-" + yyyy;

  useEffect(() => {
    getTodaysGames();
    getTodaysPicks();
  }, []);

  useEffect(() => {
    getTodaysPicks();
  }, [userPick]);

  const getTodaysPicks = async () => {
    const response = await fetch(`/api_v1/picks/current/${user.id}`).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not OK");
    } else {
      const data = await response.json();
      setTodaysPicks(data);
    }
  };

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
    setFirstGameTime(data[0].games[0].gameDateTimeEst);
    setGameDate(moment(data[0].games[0].gameDateTimeEst).format("YYYY-MM-DD"));
  };

  const getTodaysGamesNBA = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-Gravitee-Api-Key": process.env.REACT_APP_NBAKEY,
        "X-Gravitee-Host": "https://api.nba.com/v0",
      },
      mode: "no-cors",
    };
    const data = await fetch(
      "https://api.nba.com/v0/api/stats/pbp?gameId=0022100001",
      options
    ).then((response) => response.json());
    console.log({ data });
  };

  getTodaysGamesNBA();

  const handleAwayTeamInput = (e) => {
    setUserPick(e.target.value);
    setOpponent(e.target.name);
    setGameID(parseInt(e.target.id));
    setAwayTeamFocus(true);
    setHomeTeamFocus(false);
  };

  const handleHomeTeamInput = (e) => {
    setUserPick(e.target.value);
    setOpponent(e.target.name);
    setGameID(parseInt(e.target.id));
    setHomeTeamFocus(true);
    setAwayTeamFocus(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gameid", gameID);
    formData.append("date", gameDate);
    formData.append("user_pick", userPick);
    formData.append("opponent", opponent);
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
      localStorage.setItem(`00${gameID}`, userPick);
    }
    e.target.children[3].children[0].disabled = true;
    window.scrollBy(0, 330);
    setUserPick("");
    setHomeTeamFocus(false);
    setAwayTeamFocus(false);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  //Before Tip Off//
  const gameListHtml = todaysGames.map((game) => (
    <form
      className="formbox"
      data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      <h4 className="gamestatus">
        {game.day}, {game.gameStatusText}
      </h4>
      <h5 className="gamelocation">
        {game.arenaName} - {game.arenaCity}, {game.arenaState}
      </h5>
      <div className="spanbar"></div>
      <div className="gamebtnhouse row">
        <button
          type="button"
          id={game.gameId}
          name={game.homeTeam.teamName}
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          className={
            gameID == game.gameId && awayTeamFocus
              ? `gamebtn${game.awayTeam.teamTricode} gamebtn col-12 selected-border`
              : `gamebtn${game.awayTeam.teamTricode} gamebtn col-12`
          }
          disabled={localStorage.getItem(game.gameId) ? true : false}
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
          name={game.awayTeam.teamName}
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          className={
            gameID == game.gameId && homeTeamFocus
              ? `gamebtn${game.homeTeam.teamTricode} gamebtn col-12 selected-border`
              : `gamebtn${game.homeTeam.teamTricode} gamebtn col-12`
          }
          disabled={localStorage.getItem(game.gameId) ? true : false}
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
        {localStorage.getItem(game.gameId) ? (
          <div className="picksubmitted">
            Pick Submitted <BsCheckCircleFill style={{ marginLeft: "5px" }} />
          </div>
        ) : (
          <button
            type="submit"
            disabled={gameID == game.gameId ? false : true}
            className="submitbtn submit"
          >
            {gameID == game.gameId ? "Submit Pick" : "Choose a team!"}
          </button>
        )}
      </div>
    </form>
  ));

  const picksCompletedPercentage =
    (todaysPicks.length / todaysGames.length) * 100;

  //After Tip Off//
  const afterHoursGameListHtml = todaysGames.map((game) => (
    <form
      className="formboxah"
      data-aos="zoom-in"
      key={game.gameId}
      onSubmit={handleSubmit}
    >
      <div className="gameinfo">
        {game.gameStatus === 1 ? (
          <div>
            <h4 className="gamestatus">
              {game.day}, {game.gameStatusText}
            </h4>
            <h5 className="gamelocationah">
              {game.arenaName} - {game.arenaCity}, {game.arenaState}
            </h5>
          </div>
        ) : game.gameStatus === 2 ? (
          <div>
            <h4 className="gamestatusah">{game.gameStatusText}</h4>
            <h5 className="gamelocationah">
              {game.arenaName} - {game.arenaCity}, {game.arenaState}
            </h5>
          </div>
        ) : (
          <div>
            <h4 className="gamestatusah">{game.gameStatusText}</h4>
            <div className="gamescore3">
              <span className="tricode">{game.awayTeam.teamTricode}</span>{" "}
              <span className="score">{game.awayTeam.score}</span> -{" "}
              <span className="tricode">{game.homeTeam.teamTricode}</span>{" "}
              <span className="score">{game.homeTeam.score}</span>
            </div>
          </div>
        )}
      </div>
      <div className="spanbar"></div>
      <div className="gamebtnhouse row">
        <button
          disabled
          type="button"
          id={game.gameId}
          name="awayTeam"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
          className={`gamebtn${game.awayTeam.teamTricode} gamebtn col-12`}
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
          disabled
          type="button"
          id={game.gameId}
          name="homeTeam"
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
          className={`gamebtn${game.homeTeam.teamTricode} gamebtn col-12`}
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
    </form>
  ));

  const firstGameStartingTime = new Date(firstGameTime);
  const firstGameStartingTimeInMS = firstGameStartingTime.getTime();
  const fiveHoursInMS = 18000000; //use this line for production
  // const fiveHoursInMS = 111144000000; //use this for evening testing
  const nowInMS = new Date().getTime();
  const timeUntilGameInMS = firstGameStartingTimeInMS - nowInMS;
  const gameTimeCountDownInMS = nowInMS + timeUntilGameInMS + fiveHoursInMS;
  const timeUntilEstGameInMS = timeUntilGameInMS + fiveHoursInMS;

  return (
    <>
      <main>
        {timeUntilEstGameInMS > 0 ? (
          <h4 className="welcome">
            Welcome, {user?.username}!{" "}
            <p className="instructions">
              Select your favorite teams to win and check back tomorrow to see
              how you did!
            </p>
          </h4>
        ) : (
          <h4 className="welcome">Welcome, {user?.username}!</h4>
        )}
        <div className="carddiv">
          <CountdownTimer targetDate={gameTimeCountDownInMS} />
        </div>
        {timeUntilEstGameInMS > 0 ? (
          <div className="cards col-md-10 offset-md-1 col-12">
            {gameListHtml}
          </div>
        ) : (
          <div className="cards col-md-10 offset-md-1 col-12">
            {afterHoursGameListHtml}
          </div>
        )}
        <CardFooter
          todaysPicks={todaysPicks}
          setTodaysPicks={setTodaysPicks}
          picksCompletedPercentage={picksCompletedPercentage}
          todaysGames={todaysGames}
          getTodaysPicks={getTodaysPicks}
          timeUntilEstGameInMS={timeUntilEstGameInMS}
        />
      </main>
    </>
  );
};

export default Card;
