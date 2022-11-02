import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [profile, setProfile] = useState({ avatar: null });
  const [preview, setPreview] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const navigate = useNavigate();

  const handleImage = (e) => {
    console.dir(e.target);
    const file = e.target.files[0];
    setProfile({ ...profile, avatar: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFavoriteTeam = (e) => {
    console.log(e);
    setFavoriteTeam(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", profile.avatar);
    formData.append("favorite_team", favoriteTeam);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/user/profile/", options);
    const data = await response.json();
    navigate("/card");
  };

  return (
    <div className="col-2 offset-5">
      <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
        Upload a Profile Image Below
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          style={{ marginBottom: "30px" }}
          type="file"
          name="avatar"
          onChange={handleImage}
        />
        {profile.avatar && <img src={preview} alt="" />}
        <Form.Select
          size="sm"
          aria-label="Default select example"
          onChange={handleFavoriteTeam}
        >
          <option>Favorite NBA Team</option>
          <option value="Atlanta Hawks">Atlanta Hawks</option>
          <option value="Brooklyn Nets">Brooklyn Nets</option>
          <option value="Boston Celtics">Boston Celtics</option>
          <option value="Charlotte Hornets">Charlotte Hornets</option>
          <option value="Chicago Bulls">Chicago Bulls</option>
          <option value="Cleveland Cavaliers">Cleveland Cavaliers</option>
          <option value="Dallas Mavericks">Dallas Mavericks</option>
          <option value="Denver Nuggets">Denver Nuggets</option>
          <option value="Detroit Pistons">Detroit Pistons</option>
          <option value="Golden State Warriors">Golden State Warriors</option>
          <option value="Houston Rockets">Houston Rockets</option>
          <option value="Indiana Pacers">Indiana Pacers</option>
          <option value="Los Angeles Clippers">Los Angeles Clippers</option>
          <option value="Los Angeles Lakers">Los Angeles Lakers</option>
          <option value="Memphis Grizzlies">Memphis Grizzlies</option>
          <option value="Miami Heat">Miami Heat</option>
          <option value="Milwaukee Bucks">Milwaukee Bucks</option>
          <option value="Minnesota Timberwolves">Minnesota Timberwolves</option>
          <option value="New Orleans Pelicans">New Orleans Pelicans</option>
          <option value="New York Knicks">New York Knicks</option>
          <option value="Oklahoma City Thunder">Oklahoma City Thunder</option>
          <option value="Orlanda Magic">Orlanda Magic</option>
          <option value="Philadelphia 76ers">Philadelphia 76ers</option>
          <option value="Phoenix Suns">Phoenix Suns</option>
          <option value="Portland Trailblazers">Portland Trailblazers</option>
          <option value="Sacramento Kings">Sacramento Kings</option>
          <option value="San Antonio Spurs">San Antonio Spurs</option>
          <option value="Toronto Raptors">Toronto Raptors</option>
          <option value="Utah Jazz">Utah Jazz</option>
          <option value="Washington Wizards">Washington Wizards</option>
        </Form.Select>
        <Button
          style={{ marginBottom: "180px" }}
          variant="success"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
export default ProfileForm;
