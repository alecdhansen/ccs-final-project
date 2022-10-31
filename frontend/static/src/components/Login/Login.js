function Login() {
  const redirectURI = "http://localhost:3000/card/";

  function randomStringGenerator(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const randomChallengeString = randomStringGenerator(64);
  const randomStateString = randomStringGenerator(20);
  const base64Encode = (str) => {
    return btoa(str).replace(/=+$/, "");
  };
  const codeChallenge = base64Encode(randomChallengeString);
  console.log(codeChallenge);
  const twitterSignIn = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&scope=tweet.read%20users.read%20tweet.write%20offline.access&state=${randomStateString}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  return (
    <div>
      Login
      <a href={twitterSignIn}>Login with Twitter</a>
    </div>
  );
}
export default Login;
