import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import("./App"));

import "./index.scss";

const title = "Basic React Scaffold";
const content = `The App is running in ${process.env.NODE_ENV} mode.`;

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App title={title} content={content} />
  </Suspense>,
  document.getElementById("root")
);
