import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Card() {
  const [todaysGames, setTodaysGames] = useState([]);
  const [gameID, setGameID] = useState("");
  const [gamedate, setGameDate] = useState("");
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
    setGameDate(data[0].gameDate);
    // console.log(data);
    console.log(data[0].games);
  };

  const handleAwayTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(e.target.id);
  };

  const handleHomeTeamInput = (e) => {
    setUserPick(e.target.value);
    setGameID(e.target.id);
  };

  const handleSubmit = async (e, gameID, date, userPick) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gameid", gameID);
    formData.append("date", date);
    formData.append("user_pick", userPick);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/cards/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
    }
  };

  const gameListHtml = todaysGames.map((game) => (
    <li key={game.gameId}>
      <form onSubmit={handleSubmit}>
        <input
          type="radio"
          id={game.gameId}
          name="game"
          onClick={handleAwayTeamInput}
          value={game.awayTeam.teamName}
        />
        <label htmlFor="game">{game.awayTeam.teamName}</label>
        {game.awayTeam.score}pts
        <input
          type="radio"
          id={game.gameId}
          name="game"
          onClick={handleHomeTeamInput}
          value={game.homeTeam.teamName}
        />
        <label htmlFor="game">{game.homeTeam.teamName}</label>
        {game.homeTeam.score}pts
        <span>{game.gameStatusText}</span>
        <button type="submit">Submit Picks</button>
      </form>
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
    </li>
  ));

  return (
    <>
      <ul className="cards">{gameListHtml}</ul>
    </>
  );
}

export default Card;
