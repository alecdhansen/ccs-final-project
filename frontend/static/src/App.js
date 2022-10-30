import "./App.css";
import { useState, useEffect } from "react";
import STATIC_GAMES from "./JSONData";

function App() {
  const [games, setGames] = useState([]);

  // console.log(data);
  // const handleError = (err) => {
  //   console.warn(err);
  // };

  // useEffect(() => {
  //   getGames();
  // }, []);

  // const getGames = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "96829991a1msha14b40c221eeffbp14e515jsn3ef586a9f055",
  //       "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  //     },
  //   };
  //   const data = await fetch(
  //     "https://api-nba-v1.p.rapidapi.com/games?live=all",
  //     options
  //   ).then((response) => response.json());
  //   // .then((response) => console.log(response))
  //   // .catch((err) => console.error(err));
  //   setGames(data.response);
  //   console.log(data.response);
  // };

  const gameListHtml = STATIC_GAMES.map((game) => (
    <li>
      {game.teams.home.name} vs {game.teams.visitors.name}
      <div style={{ width: "100px" }}>
        <img style={{ width: "100%" }} src={game.teams.home.logo}></img>
      </div>
      <div style={{ width: "100px" }}>
        <img style={{ width: "100%" }} src={game.teams.visitors.logo}></img>
      </div>
    </li>
  ));

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
      }}
    >
      {gameListHtml} did he say strap in or strap on
    </div>
  );
}

export default App;
