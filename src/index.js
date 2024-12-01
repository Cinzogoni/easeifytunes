import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GlobalStyles from "./components/GlobalStyles";
import GridSystem from "./components/GridSystem";
import styles from "~/components/GridSystem/GridSystem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const root = ReactDOM.createRoot(document.getElementById("root"));

const gridClass = cx("grid");
const wideClass = cx("wide");

root.render(
  <GlobalStyles>
    <GridSystem gridClass={gridClass} wideClass={wideClass}>
      <App />
    </GridSystem>
  </GlobalStyles>
);

reportWebVitals();
