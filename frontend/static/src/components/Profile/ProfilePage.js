import "./Profile.css";
import "../Card/Card.css";
import UserStats from "./UserStats";
import ProfileBox from "./ProfileBox";

function ProfilePage() {
  return (
    <main className="row mainprofilepage">
      <section className="col-md-4 offset-md-1 col-10 offset-1 profilebox">
        <ProfileBox />
      </section>
      <section className="col-md-5 offset-md-1 col-10 offset-1 statbox">
        <UserStats />
      </section>
    </main>
  );
}
export default ProfilePage;
