import {
  UpperContainer,
  LowerContainer,
  BasketballContainer,
  Basketball,
  Title,
  Text,
  Button,
} from "./basketball.style";
import img from "../../media/basketball.png";

const Fof = () => {
  return (
    <>
      <UpperContainer>
        <BasketballContainer animation="0.5s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.7s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.3s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.4s" timing="0.5, 0.15, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.4s" timing="0.5, 0.05, 1, 0.15">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.8s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.4s" timing="0.15, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.5s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.55s" timing="0.5, 0.05, 1, 0.5">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
        <BasketballContainer animation="0.3s" timing="0.55, 0.09, 1, 0.55">
          <Basketball src={img} alt=""></Basketball>
        </BasketballContainer>
      </UpperContainer>
      <LowerContainer>
        <Title>404</Title>
        <Text>Oh no! It's raining 404s over here!</Text>
        <Button
          onClick={() => {
            window.history.back();
          }}
        >
          Take me back
        </Button>
      </LowerContainer>
    </>
  );
};
export default Fof;
