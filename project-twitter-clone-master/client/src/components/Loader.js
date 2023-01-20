import styled from "styled-components";
import { COLORS } from "../constants";

const Loader = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 300px;
  width: 100%;
  height: 300px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid ${COLORS.primary5};
  border-top: 10px solid ${COLORS.primary3};
  border-radius: 50%;
  animation: spinner 0.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
