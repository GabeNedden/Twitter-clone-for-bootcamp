import { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentFeedContext } from "./CurrentFeedContext";
import Error from "./Error";
import { COLORS } from "../constants";

const TweetInput = ({ avatar, setOpen }) => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");
  const { feedUpdated, setFeedUpdated } = useContext(CurrentFeedContext);

  const submitPost = (ev) => {
    ev.preventDefault();
    fetch(`/api/tweet`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    })
      .then((res) => res.json())
      .then((res) => {
        setValue("");

        setFeedUpdated(!feedUpdated);
        if (setOpen) {
          setOpen(false);
        }
      })
      .catch((error) => {
        setStatus("error");

        throw new Error(error);
      });
  };

  return (
    <Wrapper>
      {status !== "error" ? (
        <>
          <Avatar src={avatar} />
          <form onSubmit={submitPost}>
            <TweetArea
              onChange={(event) => setValue(event.target.value)}
              value={value}
              placeholder="What's happening?"
            ></TweetArea>
            <Section>
              <Number
                color={
                  value.length < 225
                    ? ""
                    : value.length <= 280
                    ? "caution"
                    : "danger"
                }
              >
                {280 - value.length}
              </Number>
              <Button
                yellow={value.length > 10}
                disabled={value.length < 1 || value.length > 280}
                type="submit"
              >
                Meow
              </Button>
            </Section>
          </form>
        </>
      ) : (
        <Section style={{ flexDirection: "column" }}>
          <Error />
          <p>
            If you just tried to Tweet, it did not reach our server. Please try
            again!
          </p>
        </Section>
      )}
    </Wrapper>
  );
};

export default TweetInput;

const handleColorType = (color) => {
  switch (color) {
    case "caution":
      return "orange";
    case "danger":
      return "red";
    default:
      return "black";
  }
};

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  gap: 15px;
  display: flex;

  & > * {
    width: 100%;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const TweetArea = styled.textarea`
  width: 100%;
  border: none;
  font-size: 26px;
  resize: none;

  &:focus {
    border: none;
    outline: none;
  }
`;

const Button = styled.button`
  border-radius: 20px;
  margin: 10px;
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

const Section = styled.section`
  display: flex;

  justify-content: flex-end;
  align-items: center;
`;

const Number = styled.div`
  margin-top: 5px;
  color: ${({ color }) => handleColorType(color)};
`;
