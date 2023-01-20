import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import GlobalStyles from "./components/GlobalStyles";

import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import TweetDetails from "./components/TweetDetails";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<HomeFeed />} />
          <Route path={"/notifications"} element={<Notifications />} />
          <Route path={"/bookmarks"} element={<Bookmarks />} />
          <Route path={"/tweet/:tweetId"} element={<TweetDetails />} />
          <Route path={"/:profileId"} element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
