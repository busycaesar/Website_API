import React from "react";
import { Button } from "react-bootstrap";

export default function _Button(props) {
  return (
    <Button
      type={props.type}
      className={`my-3 ${props.className}`}
      variant="light"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
