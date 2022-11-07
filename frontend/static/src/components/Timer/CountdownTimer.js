import "./timer.css";
import React from "react";
import useCountdown from "./Countdown";
import DateTimeDisplay from "./DateTimeDisplay";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Games have begun</span>
      <p>Check back tomorrow to play again!</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div className="countdown-link">
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </div>
      <div>before picks close!</div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (!seconds) {
    return (
      <div style={{ marginBottom: "30px" }}>
        calculating time until first game...
      </div>
    );
  }

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;
