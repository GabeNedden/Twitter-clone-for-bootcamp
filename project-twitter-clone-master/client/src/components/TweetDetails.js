import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import ActionBar from "./ActionBar";
import Loader from "./Loader";

const TweetDetails = () => {
  const { tweetId } = useParams();
  let navigate = useNavigate();

  const [currentTweet, setCurrentTweet] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTweet(data.tweet);
        setStatus("loaded");
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [tweetId]);

  const navigateToUser = (event) => {
    event.stopPropagation();
    navigate(`/${currentTweet.author.handle}`);
  };

  return status !== "loaded" ? (
    <Loader />
  ) : (
    <Wrapper>
      <Section>
        <Header onClick={navigateToUser}>
          <Avatar src={currentTweet.author.avatarSrc} />
          <Container>
            <Title>{currentTweet.author.displayName}</Title>
            <Grey>@{currentTweet.author.handle} </Grey>
          </Container>
        </Header>

        <Status>{currentTweet.status}</Status>

        {currentTweet.media[0] && <Media src={currentTweet.media[0].url} />}
        <Grey>
          {moment(currentTweet.timestamp).format(
            "h:mm A [·] MMM D YYYY [· Critter web app]"
          )}
        </Grey>
        <ActionBar />
      </Section>
    </Wrapper>
  );
};

export default TweetDetails;

const Wrapper = styled.section`
  border-bottom: 1px solid lightgray;
  padding-right: 20px;
  margin: 10px;
  width: 600px;
  margin: 14px 14px 8px;
  display: flex;
  gap: 15px;
  color: black;
  font-family: "myfont";
  font-size: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Avatar = styled.img`
  height: 80px;
  border-radius: 50%;
`;

const Media = styled.img`
  border-radius: 20px;
  max-width: 700px;
  margin: 10px 0;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 300px;
  width: 40%;
`;

const Section = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;

  & > * {
    margin: 0 20px 0 0;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
`;

const Status = styled.div`
  font-size: 28px;
  width: 800px;
  margin: 10px 0;
`;

const Grey = styled.div`
  color: #505050;
  font-size: 18px;
`;
