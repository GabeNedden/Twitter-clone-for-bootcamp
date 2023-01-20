import { createContext, useEffect, useState } from "react";

export const CurrentFeedContext = createContext(null);

export const CurrentFeedProvider = ({ children }) => {
  const [currentFeed, setCurrentFeed] = useState(null);
  const [feedStatus, setFeedStatus] = useState("loading");
  const [feedUpdated, setFeedUpdated] = useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setCurrentFeed(data);
        setFeedStatus("loaded");
      })
      .catch((error) => {
        setFeedStatus("error");
        throw new Error(error);
      });
  }, [feedUpdated]);

  return (
    <CurrentFeedContext.Provider
      value={{ currentFeed, feedStatus, feedUpdated, setFeedUpdated }}
    >
      {children}
    </CurrentFeedContext.Provider>
  );
};
