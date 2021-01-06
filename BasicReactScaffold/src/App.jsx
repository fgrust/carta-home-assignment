import React from "react";

import "./app.scss";

const App = ({ title, content }) => {
  let res = false;

  try {
    // polyfill your favorite JS features
    res = "TestTestTest".includes("Test");
  } catch (e) {
    res = false;
  }

  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <h1 className="content">{content}</h1>
      <p>
        {res
          ? "String.prototype.includes() method supported"
          : "String.prototype.includes() method not supported"}
      </p>
      <p className="autoprefix">
        This app using stage 3 features of autoprefixer
      </p>
    </div>
  );
};

export default App;
