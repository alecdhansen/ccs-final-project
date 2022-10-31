import "./Card.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function Card() {
  const [todaysGames, setTodaysGames] = useState([]);
  const [card, setCard] = useState([]);

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
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": {apiKey},
    //     "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    //   },
    // };
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
        "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
      },
    };
    // const data = await fetch(
    //   "https://api-nba-v1.p.rapidapi.com/games?live=all",
    //   options
    // ).then((response) => response.json());
    // setTodaysGames(data.response);
    // console.log(data.response);
    const data = await fetch(
      `https://nba-schedule.p.rapidapi.com/schedule?date=${currentDay}`,
      options
    ).then((response) => response.json());
    setTodaysGames(data[0].games);
    console.log(data[0].games);
  };
  const gameListHtml = todaysGames.map((game) => (
    <li key={game.gameId} className="gamelist">
      <div>
        <Button>{game.awayTeam.teamName}</Button>
        {game.awayTeam.score}pts
        <Button>{game.homeTeam.teamName}</Button>
        {game.homeTeam.score}pts
        <span>{game.gameStatusText}</span>
      </div>
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
        <img src={game.homeTeam.teamLogo} />
      </div>
    </li>
  ));

  return <ul className="cards">{gameListHtml}</ul>;
}

export default Card;
