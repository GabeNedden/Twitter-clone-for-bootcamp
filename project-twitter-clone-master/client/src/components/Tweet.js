import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiRepeat } from "react-icons/fi";
import moment from "moment";
import ActionBar from "./ActionBar";

const Tweet = ({ tweet }) => {
  let navigate = useNavigate();

  const navigateToUser = (event) => {
    event.stopPropagation();
    navigate(`/${tweet.author.handle}`);
  };
  return (
    <>
      {tweet.retweetFrom ? (
        <div style={{ marginLeft: "50px", marginTop: "20px" }}>
          <FiRepeat />
          &nbsp; {tweet?.retweetFrom?.displayName} Remeowed
        </div>
      ) : null}
      <Wrapper
        onClick={() => {
          navigate(`/tweet/${tweet.id}`);
        }}
      >
        <Avatar src={tweet.author.avatarSrc} />
        <Section>
          <Header onClick={navigateToUser}>
            <Title>{tweet.author.displayName}</Title>
            <div>@{tweet.author.handle} &#183;</div>
            <div>{moment(tweet.timestamp).format("MMM D")}</div>
          </Header>

          <Status>{tweet.status}</Status>

          {tweet.media[0] && <Media src={tweet.media[0].url} />}
        </Section>
      </Wrapper>
      <ActionBar />
    </>
  );
};

export default Tweet;

const Wrapper = styled.section`
  margin: 10px;
  width: 99%;
  margin: 14px 0 14px 8px;
  display: flex;
  gap: 15px;
  color: black;
  font-family: "myfont";
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Section = styled.div`
  width: 85%;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Header = styled.div`
  display: flex;

  & > * {
    margin: 0 2px;
  }
`;

const Title = styled.div`
  font-weight: 700;
`;

const Media = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 10px;
`;

const Status = styled.p`
  overflow: wrap;
  max-width: 100%;
  word-wrap: break-word;
`;
