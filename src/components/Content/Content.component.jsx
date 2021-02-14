import React from "react";

import "./Content.styles.scss";

export const Content = (props) => (
  <section className="content">{props.children}</section>
);
