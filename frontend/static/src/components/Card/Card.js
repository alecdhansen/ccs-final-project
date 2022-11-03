import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import Button from "react-bootstrap/Button";

function Card() {
  const [todaysGames, setTodaysGames] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [userPick, setUserPick] = useState("");

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
    setGameDate(moment(data[0].games[0].gameDateTimeEst).format("YYYY-MM-DD"));
    console.log(data[0].games);
  };

  const handleAwayTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  const handleHomeTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(parseInt(e.target.id));
  };

  console.log({ gameID });
  console.log({ gameDate });
  console.log({ userPick });

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
    const response = await fetch("/api_v1/picks/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
    }
    e.target.style.display = "none";
  };

  const gameListHtml = todaysGames.map((game) => (
    <li key={game.gameId} className="card">
      <form onSubmit={handleSubmit}>
        <Button
          type="button"
          id={game.gameId}
          name="awayTeam"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
        >
          {game.awayTeam.teamName}
        </Button>
        {game.awayTeam.score}pts
        <Button
          type="button"
          id={game.gameId}
          name="homeTeam"
          onClick={handleAwayTeamInput}
          value={game.homeTeam.teamName}
        >
          {game.homeTeam.teamName}
        </Button>
        {game.homeTeam.score}pts
        <span>{game.gameStatusText}</span>
        <Button type="submit">Submit Picks!</Button>
      </form>
      <div style={{ display: "flex" }}>
        <div className="imgcontainer">
          <img
            src={require(`../../media/${game.awayTeam.teamTricode}.png`)}
            alt=""
            className="teamlogo"
          ></img>
        </div>
        <div className="imgcontainer">
          <img
            src={require(`../../media/${game.homeTeam.teamTricode}.png`)}
            alt=""
            className="teamlogo"
          ></img>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <ul className="cards col-4 offset-4">{gameListHtml}</ul>
    </>
  );
}

export default Card;
