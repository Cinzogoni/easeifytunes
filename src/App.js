import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";
import { publicRouter } from "./router";
import LocationHandler from "./LocationHandler";

import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "./components/LanguageProvider";
import { UserProvider } from "./components/UserProvider";
import { PopUpProvider } from "./components/PopUpProvider";
import { TrackInfoProvider } from "./components/TrackInfoProvider";
import { AudioPlayerProvider } from "./components/AudioPlayerProvider";
import { SearchFocusProvider } from "./components/SearchFocusProvider/SearchFocusProvider";
import { YourPlaylistProvider } from "./components/YourPlaylistProvider";

import { baseName } from "./bassName";

function AppProviders({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <UserProvider>
          <PopUpProvider>
            <TrackInfoProvider>
              <AudioPlayerProvider>
                <SearchFocusProvider>
                  <YourPlaylistProvider>{children}</YourPlaylistProvider>
                </SearchFocusProvider>
              </AudioPlayerProvider>
            </TrackInfoProvider>
          </PopUpProvider>
        </UserProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

function App() {
  // console.log("ENV:", process.env.NODE_ENV);
  // console.log("DEV ENV:", process.env.REACT_APP_DEV_ENV);
  // console.log("PRO ENV:", process.env.REACT_APP_PRO_ENV);
  // console.log("Base name:", baseName);
  // console.log("publicRouter:", publicRouter);

  return (
    <Router basename={baseName}>
      <AppProviders>
        <div className={cx("app-message")}>
          App under development for mobile!
        </div>

        <div className={cx("app")}>
          <Routes>
            {publicRouter.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : MainLayout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Fragment>
                      <LocationHandler />
                      <Layout>
                        <Page />
                      </Layout>
                    </Fragment>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;
