import { useState } from "react";
import styled from "styled-components";
import { FiHeart, FiMessageCircle, FiRepeat, FiShare } from "react-icons/fi";

const ActionBar = () => {
  const [liked, setLiked] = useState(false);
  const [messaged, setMessaged] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <Wrapper>
      <Grey>{liked ? "1 Like" : ""}</Grey>
      <Ul>
        <Icons>
          <FiMessageCircle
            size={24}
            color={messaged ? "orange" : ""}
            onClick={() => {
              setMessaged(!messaged);
            }}
          />
        </Icons>
        <Icons>
          <FiRepeat
            size={24}
            color={retweeted ? "blue" : ""}
            onClick={() => {
              setRetweeted(!retweeted);
            }}
          />
        </Icons>
        <Icons>
          <FiHeart
            size={24}
            color={liked ? "red" : ""}
            onClick={() => {
              setLiked(!liked);
            }}
          />
        </Icons>
        <Icons>
          <FiShare
            size={24}
            color={shared ? "green" : ""}
            onClick={() => {
              setShared(!shared);
            }}
          />
        </Icons>
      </Ul>
    </Wrapper>
  );
};

export default ActionBar;

const Wrapper = styled.div`
  border-bottom: 1px solid lightgray;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  color: #505050;
  width: 80%;
  padding: 0 0 20px 80px;
`;

const Icons = styled.li``;

const Grey = styled.div`
  color: #505050;
  font-size: 18px;
  height: 10px;
  margin: 10px 0 20px 80px;
`;
