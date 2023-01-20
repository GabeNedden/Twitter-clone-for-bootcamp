import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { u1F634 } from "react-icons-kit/noto_emoji_regular/u1F634";

const Error = () => {
  return (
    <Wrapper>
      <Icon icon={u1F634} size={124} />
      <Header>An unknown Server has fallen asleep!</Header>
      <p>
        Refresh the page to wake it up, or contact support if the problem
        persists
      </p>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  font-size: 32px;
  font-weight: 700px;
`;
