import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { CurrentFeedContext } from "./CurrentFeedContext";

import Tweet from "../components/Tweet";
import styled from "styled-components";
import TweetInput from "./TweetInput";
import Error from "./Error";
import Loader from "./Loader";

const HomeFeed = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  const { currentFeed, feedStatus } = useContext(CurrentFeedContext);

  return (
    <Wrapper>
      <Title>Home</Title>
      {status === "loaded" ? (
        <>
          <TweetInput avatar={currentUser?.avatarSrc} />
          <Section>
            {feedStatus === "loaded" ? (
              Object.values(currentFeed?.tweetsById)
                .sort((a, b) => {
                  return new Date(b.timestamp) - new Date(a.timestamp);
                })
                .map((tweet) => {
                  return <Tweet key={tweet.id} tweet={tweet} />;
                })
            ) : feedStatus === "loading" ? (
              <Loader />
            ) : (
              <Error />
            )}
          </Section>
        </>
      ) : status === "loading" ? (
        <Loader />
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

export default HomeFeed;

const Wrapper = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 28px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
  padding: 10px;
`;

const Section = styled.div`
  border-top: 10px solid lightgray;
`;
