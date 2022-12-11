import { Link } from "react-router-dom";
import { BasketballContainer, Basketball } from "./basketball.style";
import img from "../../media/basketball.png";

function Fof() {
  return (
    <main>
      <div className="main404">
        <BasketballContainer>
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <div className="ball2">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball3">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball4">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball5">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball6">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball7">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball8">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball9">
          <Basketball src={img} alt=""></Basketball>
        </div>
        <div className="ball10">
          <Basketball src={img} alt=""></Basketball>
        </div>
      </div>
      <div className="lower404">
        <h2 className="title404">404</h2>
        <p className="ohnotext">Oh no! It's raining 404s over here!</p>
        <Link to="card">
          <button
            className="btn404"
            onClick={() => {
              window.history.back();
            }}
          >
            Take me back
          </button>
        </Link>
      </div>
    </main>
  );
}
export default Fof;
