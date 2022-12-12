import styled from "styled-components";

export const BasketballContainer = styled.div`
  width: 100px;
  height: 100px;
  animation: bounce ${(props) => props.animation};
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(${(props) => props.timing});
  animation-iteration-count: infinite;

  @keyframes bounce {
    from {
      transform: translate3d(0, -100px, 0);
    }
    to {
      transform: translate3d(0, 150px, 0);
    }
  }
`;

export const Basketball = styled.img`
  width: 100%;
  border-radius: 50%;
`;

export const UpperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export const LowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`;

export const Title = styled.h2`
  color: var(--offwhite);
  font-size: 175px;
`;

export const Text = styled.p`
  color: var(--offwhite);
`;

export const Button = styled.button`
  padding: 4px 52px;
  margin: 6px 0px 50px 0px;
  border: none;
  border-radius: 24px;
  background-color: var(--offwhite);
  color: var(--navyblue);
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #b3b3b3;
    transition: 0.3s;
  }
`;
