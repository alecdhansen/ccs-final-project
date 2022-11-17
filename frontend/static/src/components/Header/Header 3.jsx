import "./HeaderNav.css";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user } = useAuth();
  return (
    <div className="mainheader">
      <div className="curvehead col-10 offset-1">
        <div className="circle"></div>
        <h2 className="headertitle">Braggem</h2>
        {user ? (
          <div className="courtlogo">
            <img
              style={{ width: "100%" }}
              src={require(`../../media/${user?.favorite_team}.png`)}
              alt=""
            ></img>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Header;
