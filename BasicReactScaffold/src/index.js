import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import("./App"));

import "./index.scss";

const title = "Basic React Scaffold";
// When building for production, include an h1 tag in your JSX that states that the app is currently running in production
// When compiling in development mode, the same h1 tag should read "This app is running in development mode"
const content = `The App is running in ${process.env.NODE_ENV} mode.`;

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App title={title} content={content} />
  </Suspense>,
  document.getElementById("root")
);
