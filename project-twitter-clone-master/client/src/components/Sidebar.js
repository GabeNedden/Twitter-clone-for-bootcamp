import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/logo.svg";
import TweetInput from "./TweetInput";
import { COLORS } from "../constants";

import { CurrentUserContext } from "./CurrentUserContext";

const activeStyle = {
  color: `${COLORS.primary}`,
  textDecoration: "none",
};
const nonActiveStyle = {
  color: "black",
  textDecoration: "none",
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, status } = useContext(CurrentUserContext);

  let links = [];

  if (status === "loaded") {
    links = [
      { display: "Home", path: "/", icon: <FiHome /> },
      { display: "Profile", path: `/${currentUser.handle}`, icon: <FiUser /> },
      { display: "Notifications", path: "/notifications", icon: <FiBell /> },
      { display: "Bookmarks", path: "/bookmarks", icon: <FiBookmark /> },
    ];
  }

  return (
    <>
      <Dialog
        open={open}
        onBackdropClick={() => setOpen(false)}
        fullWidth={true}
      >
        <DialogTitle>Meow!</DialogTitle>
        <DialogContent>
          {status === "loaded" && (
            <TweetInput avatar={currentUser.avatarSrc} setOpen={setOpen} />
          )}
        </DialogContent>
      </Dialog>
      <Wrapper>
        <div>
          <StyledLogo />
          <ul>
            {links.map((link) => {
              return (
                <Line key={link.display}>
                  {link.icon}
                  <NavLink
                    to={link.path}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    {" "}
                    {link.display}
                  </NavLink>
                </Line>
              );
            })}
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Meow
            </Button>
          </ul>
        </div>
      </Wrapper>
    </>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 25%;
  margin-right: 100px;
`;

const StyledLogo = styled(Logo)`
  width: 50px;
  height: 50px;
  margin: 20px 0 0 45px;
`;

const Line = styled.li`
  list-style-type: none;
  font-size: 22px;
  margin-bottom: 25px;
  align-items: center;
  border-radius: 25px;
  padding: 10px;
  color: black;

  &:hover {
    color: ${COLORS.primary2};
    background-color: ${COLORS.primary5};

    & > * {
      color: ${COLORS.primary2} !important;
    }
  }

  & > * {
    margin: 0 10px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${COLORS.primary2};
  width: 100%;
  color: white;
  border-radius: 20px;
  border: none;
  font-size: 18px;

  &:active {
    transform: scale(0.9);
  }
`;
