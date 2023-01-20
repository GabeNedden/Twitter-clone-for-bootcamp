import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import moment from "moment";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";
import Tweet from "./Tweet";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import Loader from "./Loader";

const Profile = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  const { profileId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [profileFeed, setProfileFeed] = useState(null);
  const [feedFetchStatus, setFeedFetchStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("tweets");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedUser(data.profile);
        setFetchStatus("loaded");
      })
      .catch((error) => {
        setFetchStatus("error");

        throw new Error(error);
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setProfileFeed(data);
        setFeedFetchStatus("loaded");
      })
      .catch((error) => {
        setFeedFetchStatus("error");

        throw new Error(error);
      });
  }, [profileId]);

  if (fetchStatus === "loaded") {
    console.log(selectedUser);
  }

  return (
    <Wrapper>
      {status === "error" ||
      fetchStatus === "error" ||
      feedFetchStatus === "error" ? (
        <Error />
      ) : status === "loaded" && fetchStatus === "loaded" ? (
        <>
          <Jumbotron src={selectedUser?.bannerSrc} />
          <Avatar src={selectedUser?.avatarSrc} />
          <Button>
            {currentUser.handle === profileId
              ? "Edit Account"
              : selectedUser.isBeingFollowedByYou
              ? "Unfollow"
              : "Follow"}
          </Button>
          <Container>
            <Title>{selectedUser?.displayName}</Title>
            <FlexWrapper>
              <Grey>@{selectedUser?.handle}</Grey>
              {selectedUser.isFollowingYou ? (
                <ReverseGrey>Follows you</ReverseGrey>
              ) : null}
            </FlexWrapper>
            <div>{selectedUser?.bio}</div>
            <FlexWrapper>
              {selectedUser.location ? (
                <Grey>
                  <FiMapPin />
                  {` ${selectedUser.location}`}
                </Grey>
              ) : null}
              <Grey>
                <FiCalendar /> Joined{" "}
                {moment(selectedUser.joined).format("MMMM YYYY")}
              </Grey>
            </FlexWrapper>
            <FlexWrapper>
              <div>{selectedUser.numFollowing} Following</div>
              <div>{selectedUser.numFollowers} Followers</div>
            </FlexWrapper>
          </Container>
          <FlexWrapper>
            <Tab
              className={activeTab === "tweets" && "purple"}
              onClick={() => setActiveTab("tweets")}
            >
              Tweets
            </Tab>
            <Tab
              className={activeTab === "media" && "purple"}
              onClick={() => setActiveTab("media")}
            >
              Media
            </Tab>
            <Tab
              className={activeTab === "likes" && "purple"}
              onClick={() => setActiveTab("likes")}
            >
              Likes
            </Tab>
          </FlexWrapper>
          {feedFetchStatus === "loaded" ? (
            Object.values(profileFeed?.tweetsById)
              .sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
              })
              .map((tweet) => {
                return <Tweet key={tweet.id} tweet={tweet} />;
              })
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 800px;
  border: 1px solid lightgray;
`;

const FlexWrapper = styled.div`
  display: flex;

  & > * {
    margin: 10px 20px 0 0;
  }
`;

const Jumbotron = styled.img`
  width: 100%;
`;

const Avatar = styled.img`
  border-radius: 50%;
  max-width: 20%;
  margin: -80px 0 0 20px;
  border: 5px solid white;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const Button = styled.button`
  border-radius: 20px;
  float: right;
  margin: 30px 20px;
  padding: 10px 30px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: ${COLORS.primary3};
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    transform: scale(1);
    background-color: ${COLORS.primary5};
    cursor: default;
  }
`;

const Container = styled.div`
  margin-left: 20px;

  & > * {
    margin-bottom: 5px;
  }
`;

const Tab = styled.div`
  border-bottom: 1px solid lightgray;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-weight: 600;

  &.purple {
    border-bottom: 1px solid ${COLORS.primary};
    font-weight: 700;
    color: ${COLORS.primary};
  }
`;

const Grey = styled.div`
  color: #505050;
`;

const ReverseGrey = styled.div`
  color: #505050;
  background-color: lightgray;
  padding: 1px 5px;
  margin-bottom: 5px;
`;
